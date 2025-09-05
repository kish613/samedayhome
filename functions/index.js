const functions = require('firebase-functions');
const { defineSecret } = require('firebase-functions/params');
const express = require('express');

const POSTCODER_API_KEY = defineSecret('POSTCODER_API_KEY');
const OPENAI_API_KEY = defineSecret('OPENAI_API_KEY');
const RESEND_API_KEY = defineSecret('RESEND_API_KEY');

const app = express();
app.use(express.json());

// Utilities
function validatePostcodeFormat(postcode) {
  const ukPostcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;
  return ukPostcodeRegex.test(postcode?.replace(/\s/g, ''));
}

// POST /api/postcode-lookup
app.post('/api/postcode-lookup', async (req, res) => {
  try {
    const { postcode } = req.body || {};
    if (!postcode || !validatePostcodeFormat(postcode)) {
      return res.status(400).json({ error: 'Invalid UK postcode format' });
    }
    const clean = postcode.replace(/\s/g, '').toUpperCase();
    const apiKey = process.env.POSTCODER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Postcode lookup service not configured' });
    }
    const url = `https://ws.postcoder.com/pcw/${apiKey}/address/UK/${encodeURIComponent(clean)}`;
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) return res.status(404).json({ error: 'No addresses found for this postcode' });
      return res.status(500).json({ error: 'Address lookup service temporarily unavailable' });
    }
    const data = await response.json();
    const addresses = Array.isArray(data) ? data.map(addr => {
      const organisation = addr.organisation || '';
      const number = addr.number || addr.premise || '';
      const buildingName = addr.buildingname || '';
      const street = addr.street || '';
      const locality = addr.locality || addr.dependentlocality || '';
      const postTown = addr.posttown || '';
      const county = addr.county || '';
      const postcode = addr.postcode || clean;
      const addressLine1Parts = [];
      if (number) addressLine1Parts.push(number);
      if (buildingName && buildingName !== number) addressLine1Parts.push(buildingName);
      if (street) addressLine1Parts.push(street);
      const addressLine1 = addressLine1Parts.join(' ').trim();
      const addressLine2 = locality;
      return {
        id: addr.udprn || '',
        street,
        number,
        organisation,
        addressLine1,
        addressLine2,
        postTown,
        county,
        postcode,
        fullAddress: addr.summaryline || [organisation, addressLine1, addressLine2, postTown, postcode].filter(Boolean).join(', ')
      };
    }).filter(a => a.street && a.fullAddress) : [];
    return res.status(200).json({ success: true, postcode: clean, addressCount: addresses.length, addresses });
  } catch (err) {
    console.error('postcode-lookup error', err);
    return res.status(500).json({ error: 'Internal server error during address lookup' });
  }
});

// POST /api/property-valuation (fallback if OPENAI missing)
function fallbackValuation(formData) {
  const baseValuesByType = {
    'detached-house': 580000,
    'semi-detached-house': 420000,
    'terraced-house': 320000,
    'flat-apartment': 280000,
    'bungalow': 380000,
    'maisonette': 300000,
    'cottage': 450000,
    'other': 350000
  };
  const bedroomMultipliers = { 'studio': 0.6, '1': 0.75, '2': 0.9, '3': 1.0, '4': 1.3, '5': 1.6, '6+': 1.9 };
  const conditionMultipliers = { 'excellent': 1.15, 'good': 1.0, 'fair': 0.92, 'poor': 0.8, 'very-poor': 0.65 };
  const baseValue = baseValuesByType[formData.propertyType] || 350000;
  const bedroomMultiplier = bedroomMultipliers[formData.bedrooms] || 1.0;
  const conditionMultiplier = conditionMultipliers[formData.condition] || 1.0;
  const marketValue = Math.round(baseValue * bedroomMultiplier * conditionMultiplier);
  const discountPercentage = formData.condition === 'excellent' ? 10 : formData.condition === 'good' ? 11 : formData.condition === 'fair' ? 11 : 12;
  const cashOffer = Math.round(marketValue * (100 - discountPercentage) / 100);
  return { marketValue, cashOffer, discountPercentage };
}

app.post('/api/property-valuation', async (req, res) => {
  const { formData } = req.body || {};
  if (!formData || !formData.postcode) return res.status(400).json({ error: 'Postcode required for property valuation' });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    const f = fallbackValuation(formData);
    return res.status(200).json({ success: true, data: { offer: { market_value: f.marketValue, cash_offer: f.cashOffer, discount_percentage: f.discountPercentage, reasoning: 'Fallback calculation', risk_factors: [], comparable_analysis: 'Basic model' }, propertyDetails: formData, generatedAt: new Date().toISOString(), source: 'Fallback Calculation System', methodology: 'Basic calculation using property type, size, and condition factors' } });
  }

  try {
    const prompt = `Provide UK property valuation. First two lines must be: \nMARKET_VALUE: £XXX,XXX\nCASH_OFFER: £XXX,XXX\nThen analysis. Postcode: ${formData.postcode}.`;
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'gpt-4o', messages: [ { role: 'system', content: 'You are a UK property valuation expert.' }, { role: 'user', content: prompt } ], max_tokens: 2000, temperature: 0.3 })
    });
    if (!response.ok) {
      const f = fallbackValuation(formData);
      return res.status(200).json({ success: true, data: { offer: { market_value: f.marketValue, cash_offer: f.cashOffer, discount_percentage: f.discountPercentage, reasoning: 'Fallback calculation', risk_factors: [], comparable_analysis: 'Basic model' }, propertyDetails: formData, generatedAt: new Date().toISOString(), source: 'Fallback Calculation System', methodology: 'Basic calculation using property type, size, and condition factors' } });
    }
    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '';
    const mvMatch = text.match(/MARKET_VALUE:\s*£([\d,]+)/i);
    const coMatch = text.match(/CASH_OFFER:\s*£([\d,]+)/i);
    const marketValue = mvMatch ? parseInt(mvMatch[1].replace(/[£,]/g, '')) : undefined;
    const cashOffer = coMatch ? parseInt(coMatch[1].replace(/[£,]/g, '')) : undefined;
    if (!marketValue || !cashOffer) {
      const f = fallbackValuation(formData);
      return res.status(200).json({ success: true, data: { offer: { market_value: f.marketValue, cash_offer: f.cashOffer, discount_percentage: f.discountPercentage, reasoning: 'Fallback calculation', risk_factors: [], comparable_analysis: 'Basic model' }, propertyDetails: formData, generatedAt: new Date().toISOString(), source: 'Fallback Calculation System', methodology: 'Basic calculation using property type, size, and condition factors' } });
    }
    return res.status(200).json({ success: true, data: { offer: { market_value: marketValue, cash_offer: cashOffer, discount_percentage: Math.round(((marketValue - cashOffer)/marketValue)*100), reasoning: text, risk_factors: ['AI-generated valuation'], comparable_analysis: 'Comprehensive market analysis' }, propertyDetails: formData, generatedAt: new Date().toISOString(), source: 'OpenAI GPT-4o', methodology: 'Comparable sales analysis' } });
  } catch (e) {
    console.error('valuation error', e);
    const f = fallbackValuation(formData);
    return res.status(200).json({ success: true, data: { offer: { market_value: f.marketValue, cash_offer: f.cashOffer, discount_percentage: f.discountPercentage, reasoning: 'Fallback calculation', risk_factors: [], comparable_analysis: 'Basic model' }, propertyDetails: formData, generatedAt: new Date().toISOString(), source: 'Fallback Calculation System', methodology: 'Basic calculation using property type, size, and condition factors' } });
  }
});

// POST /api/property-submission
app.post('/api/property-submission', async (req, res) => {
  try {
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, phone, address } = req.body || {};
    if (!name || !email || !phone || !address) return res.status(400).json({ error: 'Missing required fields' });
    const resp = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['info@samedayhomebuyer.co.uk'],
      subject: 'New Property Valuation Request',
      html: `<p>${name} requested a valuation for ${address}. Phone: ${phone}. Email: ${email}</p>`
    });
    if (resp.error) return res.status(500).json({ error: 'Failed to send email' });
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (e) {
    console.error('property-submission error', e);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/referral-submission
app.post('/api/referral-submission', async (req, res) => {
  try {
    const { propertyAddress, contactName, contactPhone, contactEmail, propertyType } = req.body || {};
    if (!propertyAddress || !contactName || !contactPhone || !contactEmail || !propertyType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    return res.status(200).json({ success: true, referralId: `REF-${Date.now()}-${Math.random().toString(36).slice(2,8)}`.toUpperCase(), message: 'Referral submitted successfully.' });
  } catch (e) {
    console.error('referral-submission error', e);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

exports.api = functions
  .region('europe-west2')
  .runWith({ secrets: [POSTCODER_API_KEY, OPENAI_API_KEY, RESEND_API_KEY] })
  .https.onRequest(app);



