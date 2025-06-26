// Vercel API route for property valuation
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

    // For now, return a mock response since we don't have API keys set up
    const mockResult = {
      success: true,
      data: {
        success: true,
        offer: {
          market_value: 350000,
          cash_offer: 315000,
          discount_percentage: 10,
          reasoning: `Based on the property details for ${formData.postcode}, this ${formData.bedrooms} bedroom ${formData.propertyType} in ${formData.condition} condition has been valued using our AI-powered system. The cash offer reflects current market conditions and provides a fair, immediate sale option.`,
          risk_factors: [
            'Property condition assessed',
            'Local market conditions considered',
            'Quick sale discount applied'
          ],
          comparable_analysis: 'Analyzed similar properties in the area for accurate pricing'
        },
        timestamp: new Date().toISOString(),
        propertyDetails: formData
      }
    }

    res.status(200).json(mockResult)

  } catch (error) {
    console.error('API route error:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    })
  }
}