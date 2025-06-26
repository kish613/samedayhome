// Simple development server for API routes
import express from 'express'
import cors from 'cors'

const app = express()
const port = 3001

app.use(cors())
app.use(express.json())

// Property valuation endpoint
app.post('/api/property-valuation', (req, res) => {
  const { formData } = req.body

  if (!formData || !formData.postcode) {
    return res.status(400).json({ error: 'Property data required' })
  }

  // Mock response for development
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

  res.json(mockResult)
})

app.listen(port, () => {
  console.log(`Development API server running on http://localhost:${port}`)
})