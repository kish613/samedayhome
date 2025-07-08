
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { 
      name, 
      email, 
      phone, 
      address, 
      doorNumber, 
      postcode, 
      propertyType, 
      bedrooms, 
      condition, 
      submittedAt,
      valuationData 
    } = req.body;

    if (!name || !email || !phone || !address) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Format property details
    const propertyDetails = `
      <h2>Property Details</h2>
      <p><strong>Door Number:</strong> ${doorNumber || 'Not provided'}</p>
      <p><strong>Full Address:</strong> ${address}</p>
      <p><strong>Postcode:</strong> ${postcode || 'Not provided'}</p>
      <p><strong>Property Type:</strong> ${propertyType || 'Not provided'}</p>
      <p><strong>Bedrooms:</strong> ${bedrooms || 'Not provided'}</p>
      <p><strong>Condition:</strong> ${condition || 'Not provided'}</p>
    `;

    // Format valuation data if available
    let valuationSection = '';
    if (valuationData) {
      valuationSection = `
        <h2>Valuation Results</h2>
        <p><strong>Market Value:</strong> £${valuationData.offer?.market_value?.toLocaleString() || 'Not available'}</p>
        <p><strong>Cash Offer:</strong> £${valuationData.offer?.cash_offer?.toLocaleString() || 'Not available'}</p>
        <p><strong>Discount:</strong> ${valuationData.offer?.discount_percentage || 'N/A'}% below market value</p>
        <p><strong>Source:</strong> ${valuationData.source || 'Not available'}</p>
        <p><strong>Generated At:</strong> ${valuationData.generatedAt ? new Date(valuationData.generatedAt).toLocaleString() : 'Not available'}</p>
        
        ${valuationData.offer?.reasoning ? `
          <h3>🤖 OpenAI Analysis (Internal - Full Details)</h3>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #007bff;">
            <pre style="white-space: pre-wrap; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.4;">${valuationData.offer.reasoning}</pre>
          </div>
        ` : ''}
        
        ${valuationData.offer?.comparable_analysis ? `
          <h3>📊 Comparable Analysis</h3>
          <div style="background-color: #f0f8ff; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #28a745;">
            <p>${valuationData.offer.comparable_analysis}</p>
          </div>
        ` : ''}
        
        ${valuationData.offer?.risk_factors ? `
          <h3>⚠️ Risk Factors</h3>
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #ffc107;">
            <ul>
              ${valuationData.offer.risk_factors.map(factor => `<li>${factor}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
        
        ${valuationData.methodology ? `
          <h3>🔍 Methodology</h3>
          <div style="background-color: #e9ecef; padding: 15px; border-radius: 8px; margin: 10px 0;">
            <p><strong>Method:</strong> ${valuationData.methodology}</p>
          </div>
        ` : ''}
      `;
    }

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['akiteit4@gmail.com'],
      subject: 'New Property Valuation Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
          <h1 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">New Property Valuation Request</h1>
          
          <h2>Contact Information</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Submitted At:</strong> ${submittedAt ? new Date(submittedAt).toLocaleString() : 'Not provided'}</p>
          
          ${propertyDetails}
          
          ${valuationSection}
          
          <hr style="margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">
            This email was automatically generated from the Same Day Home Buyer valuation system.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    res.status(200).json({ message: 'Email sent successfully', data });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
