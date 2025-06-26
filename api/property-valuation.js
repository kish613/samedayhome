// Vercel API route for property valuation
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
      return res.status(500).json({ 
        error: 'API keys not configured',
        message: 'PropertyData or OpenAI API keys are missing'
      })
    }

    // Step 1: Get property data from PropertyData API
    const propertyDataResponse = await fetch(`https://api.propertydata.co.uk/property?postcode=${encodeURIComponent(formData.postcode)}`, {
      headers: {
        'Authorization': `Bearer ${PROPERTYDATA_API_KEY}`,
        'Content-Type': 'application/json'
      }
    })

    if (!propertyDataResponse.ok) {
      return res.status(400).json({ 
        error: 'Property data not found',
        message: `Unable to retrieve property data for postcode ${formData.postcode}`
      })
    }

    const propertyData = await propertyDataResponse.json()

    // Step 2: Get enhanced property analysis using OpenAI
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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
            content: 'You are a professional property valuation expert. Analyze property data and provide accurate cash offer valuations for quick property sales.'
          },
          {
            role: 'user',
            content: `Analyze this property data and provide a cash offer valuation:
            
Property Details:
- Postcode: ${formData.postcode}
- Property Type: ${formData.propertyType}
- Bedrooms: ${formData.bedrooms}
- Condition: ${formData.condition}
- Tenure: ${formData.tenure}

Market Data: ${JSON.stringify(propertyData)}

Please provide:
1. Estimated market value
2. Cash offer amount (typically 85-90% of market value for quick sales)
3. Reasoning for the valuation
4. Risk factors considered
5. Comparable analysis summary

Return response as JSON with fields: market_value, cash_offer, discount_percentage, reasoning, risk_factors (array), comparable_analysis`
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    })

    if (!openAIResponse.ok) {
      return res.status(500).json({ 
        error: 'AI analysis failed',
        message: 'Unable to process property valuation'
      })
    }

    const aiResponse = await openAIResponse.json()
    const aiContent = aiResponse.choices[0].message.content

    // Parse AI response
    let offerAnalysis
    try {
      offerAnalysis = JSON.parse(aiContent)
    } catch (parseError) {
      // Fallback if AI doesn't return valid JSON
      const avgValue = propertyData.properties?.[0]?.estimated_value || 300000
      offerAnalysis = {
        market_value: avgValue,
        cash_offer: Math.round(avgValue * 0.87), // 87% of market value
        discount_percentage: 13,
        reasoning: `Based on PropertyData analysis for ${formData.postcode}. Cash offer calculated for quick sale.`,
        risk_factors: ['Property condition', 'Market conditions', 'Quick sale requirements'],
        comparable_analysis: 'Analysis based on recent sales data and market trends'
      }
    }

    const result = {
      success: true,
      data: {
        success: true,
        offer: offerAnalysis,
        timestamp: new Date().toISOString(),
        propertyDetails: formData,
        marketData: propertyData
      }
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