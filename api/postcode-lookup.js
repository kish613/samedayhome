// Secure backend proxy for Postcoder API
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
    const apiKey = process.env.POSTCODER_API_KEY
    
    if (!apiKey) {
      console.error('POSTCODER_API_KEY not configured')
      return res.status(500).json({ error: 'Postcode lookup service not configured' })
    }

    // Make request to Postcoder API from backend
    const postcoderApiUrl = `https://ws.postcoder.com/pcw/${apiKey}/address/UK/${encodeURIComponent(cleanPostcode)}`
    
    const response = await fetch(postcoderApiUrl)
    
    if (!response.ok) {
      console.error('Postcoder API error:', response.status, response.statusText)
      
      if (response.status === 401) {
        return res.status(500).json({ error: 'API authentication failed' })
      } else if (response.status === 404) {
        return res.status(404).json({ error: 'No addresses found for this postcode' })
      } else {
        return res.status(500).json({ error: 'Address lookup service temporarily unavailable' })
      }
    }

    const data = await response.json()
    
    // Handle Postcoder response format
    let addresses = []
    
    if (data && Array.isArray(data)) {
      addresses = data.map(addr => {
        // Extract components from Postcoder response
        const organisation = addr.organisation || ''
        const number = addr.number || addr.premise || ''
        const buildingName = addr.buildingname || ''
        const street = addr.street || ''
        const locality = addr.locality || addr.dependentlocality || ''
        const postTown = addr.posttown || ''
        const county = addr.county || ''
        const postcode = addr.postcode || cleanPostcode
        
        // Build address line 1 - typically number and street
        const addressLine1Parts = []
        if (number) addressLine1Parts.push(number)
        if (buildingName && buildingName !== number) addressLine1Parts.push(buildingName)
        if (street) addressLine1Parts.push(street)
        
        const addressLine1 = addressLine1Parts.join(' ').trim()
        const addressLine2 = locality
        
        return {
          id: addr.udprn || '',
          street: street,
          number: number,
          organisation: organisation,
          addressLine1: addressLine1,
          addressLine2: addressLine2,
          postTown: postTown,
          county: county,
          postcode: postcode,
          fullAddress: addr.summaryline || [organisation, addressLine1, addressLine2, postTown, postcode].filter(Boolean).join(', ')
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