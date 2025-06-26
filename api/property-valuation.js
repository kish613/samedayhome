// Vercel API route for property valuation
const PROPERTYDATA_API_BASE = 'https://api.propertydata.co.uk/v1'
const OPENAI_API_BASE = 'https://api.openai.com/v1'

// Environment variables (server-side only)
const PROPERTYDATA_API_KEY = process.env.PROPERTYDATA_API_KEY
const OPENAI_API_KEY = process.env.OPENAI_API_KEY

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { formData } = req.body

    if (!formData || !formData.postcode) {
      return res.status(400).json({ error: 'Property data required' })
    }

    // Validate API keys
    if (!PROPERTYDATA_API_KEY || !OPENAI_API_KEY) {
      return res.status(500).json({ error: 'API keys not configured' })
    }

    // Get PropertyData valuation
    const params = new URLSearchParams({
      postcode: formData.postcode,
      api_key: PROPERTYDATA_API_KEY
    })

    const response = await fetch(`${PROPERTYDATA_API_BASE}/valuation-sale?${params}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`PropertyData API error: ${response.status}`)
    }

    const valuationData = await response.json()
    
    // Calculate cash offer using OpenAI
    const offerResponse = await fetch(`${OPENAI_API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a property expert. Calculate a fair cash offer based on market value, considering 10% discount for quick sale, and estimate savings vs traditional sale.'
          },
          {
            role: 'user',
            content: `Property in ${formData.postcode}, ${formData.bedrooms} bed ${formData.propertyType}. Estimated value: £${valuationData.estimated_value || 300000}. Calculate cash offer and savings.`
          }
        ],
        functions: [
          {
            name: 'calculate_cash_offer',
            description: 'Calculate cash offer and savings breakdown',
            parameters: {
              type: 'object',
              properties: {
                propertyValue: { type: 'number' },
                cashOffer: { type: 'number' },
                savings: { type: 'number' },
                breakdown: {
                  type: 'object',
                  properties: {
                    agentFees: { type: 'number' },
                    legalFees: { type: 'number' },
                    surveyFees: { type: 'number' },
                    stampDuty: { type: 'number' }
                  }
                }
              },
              required: ['propertyValue', 'cashOffer', 'savings', 'breakdown']
            }
          }
        ],
        function_call: { name: 'calculate_cash_offer' }
      })
    })

    const aiResponse = await offerResponse.json()
    const offerData = JSON.parse(aiResponse.choices[0].message.function_call.arguments)

    const result = {
      success: true,
      propertyValue: offerData.propertyValue,
      cashOffer: offerData.cashOffer,
      savings: offerData.savings,
      details: {
        address: `Property in ${formData.postcode}`,
        bedrooms: formData.bedrooms || 3,
        bathrooms: formData.bathrooms || 2,
        propertyType: formData.propertyType || 'House'
      },
      breakdown: offerData.breakdown
    }

    res.status(200).json(result)

  } catch (error) {
    console.error('API route error:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    })
  }
} 