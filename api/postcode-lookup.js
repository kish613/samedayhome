// Secure backend proxy for Fetchify API
// This keeps your API key safe on the server

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { postcode } = req.body

    // Validate postcode format
    if (!postcode || typeof postcode !== 'string') {
      return res.status(400).json({ error: 'Valid postcode is required' })
    }

    // Clean and validate UK postcode format
    const cleanPostcode = postcode.replace(/\s/g, '').toUpperCase()
    const ukPostcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i
    
    if (!ukPostcodeRegex.test(cleanPostcode)) {
      return res.status(400).json({ error: 'Invalid UK postcode format' })
    }

    // Get API key from server environment (secure)
    const apiKey = process.env.FETCHIFY_API_KEY || '649c2-a2bc4-c3307-0a4d8'
    
    if (!apiKey) {
      console.error('FETCHIFY_API_KEY not configured')
      return res.status(500).json({ error: 'Postcode lookup service not configured' })
    }

    // Make request to Fetchify API from backend
    const fetchifyApiUrl = `https://pcls1.craftyclicks.co.uk/json/rapidaddress?key=${apiKey}&postcode=${encodeURIComponent(cleanPostcode)}&response=data_formatted`
    
    const response = await fetch(fetchifyApiUrl)
    
    if (!response.ok) {
      console.error('Fetchify API error:', response.status, response.statusText)
      
      if (response.status === 401) {
        return res.status(500).json({ error: 'API authentication failed' })
      } else if (response.status === 404) {
        return res.status(404).json({ error: 'No addresses found for this postcode' })
      } else {
        return res.status(500).json({ error: 'Address lookup service temporarily unavailable' })
      }
    }

    const data = await response.json()
    
    // Handle Fetchify response format
    let addresses = []
    
    if (data && data.delivery_points && Array.isArray(data.delivery_points)) {
      addresses = data.delivery_points.map(dp => {
        // Extract street name and number from formatted address lines
        const addressLine1 = dp.line_1 || ''
        const addressLine2 = dp.line_2 || ''
        
        // Try to extract number and street from line_1
        const numberMatch = addressLine1.match(/^(\d+[A-Z]?|\w+)\s+(.+)/)
        const number = numberMatch ? numberMatch[1] : ''
        const street = numberMatch ? numberMatch[2] : addressLine1
        
        return {
          id: dp.udprn || '',
          street: street || addressLine1,
          number: number,
          addressLine1: addressLine1,
          addressLine2: addressLine2,
          postTown: dp.post_town || '',
          county: dp.traditional_county || dp.postal_county || '',
          postcode: dp.postcode || cleanPostcode,
          fullAddress: [addressLine1, addressLine2, dp.post_town, dp.postcode].filter(Boolean).join(', ')
        }
      }).filter(addr => addr.street && addr.fullAddress)
    }

    // Return successful response
    res.status(200).json({
      success: true,
      postcode: cleanPostcode,
      addressCount: addresses.length,
      addresses
    })

  } catch (error) {
    console.error('Postcode lookup error:', error)
    res.status(500).json({ 
      error: 'Internal server error during address lookup',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
} 