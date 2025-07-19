// Simple test endpoint to verify backend setup
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Check if API key is configured
    const apiKey = process.env.FETCHIFY_API_KEY
    
    res.status(200).json({
      success: true,
      message: 'Backend postcode lookup service is configured',
      apiKeyConfigured: !!apiKey,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Backend configuration test failed',
      details: error.message
    })
  }
} 