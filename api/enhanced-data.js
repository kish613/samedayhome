// Vercel API route for enhanced data gathering
import { enhancedDataService } from '../src/services/enhancedDataServices.js'

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
    const { propertyData } = req.body

    if (!propertyData || !propertyData.postcode) {
      return res.status(400).json({ error: 'Property data required' })
    }

    // Gather enhanced data
    const enhancedData = await enhancedDataService.gatherComprehensiveData(propertyData)
    const compositeImpact = enhancedDataService.calculateCompositeImpact(enhancedData)

    res.status(200).json({
      success: true,
      enhancedData,
      compositeImpact
    })

  } catch (error) {
    console.error('Enhanced data API error:', error)
    res.status(500).json({ 
      error: 'Enhanced data unavailable',
      message: error.message 
    })
  }
} 