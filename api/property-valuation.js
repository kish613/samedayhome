// Vercel API route for property valuation
import { PropertyValuationService } from '../src/services/propertyValuation.js'

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

    // Create service instance with server-side API keys
    const valuationService = new PropertyValuationService()
    
    // Process the property offer
    const result = await valuationService.processPropertyOffer(formData)

    res.status(200).json(result)

  } catch (error) {
    console.error('API route error:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    })
  }
} 