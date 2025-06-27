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

  // IMMEDIATE DEBUG: Check environment variables first
  console.log('🔧 Environment Check:')
  console.log('PROPERTYDATA_API_KEY exists:', !!PROPERTYDATA_API_KEY)
  console.log('OPENAI_API_KEY exists:', !!OPENAI_API_KEY)
  if (PROPERTYDATA_API_KEY) {
    console.log('PROPERTYDATA_API_KEY length:', PROPERTYDATA_API_KEY.length)
    console.log('PROPERTYDATA_API_KEY prefix:', PROPERTYDATA_API_KEY.substring(0, 10) + '...')
  }
  if (OPENAI_API_KEY) {
    console.log('OPENAI_API_KEY length:', OPENAI_API_KEY.length)
    console.log('OPENAI_API_KEY prefix:', OPENAI_API_KEY.substring(0, 10) + '...')
  }

  try {
    const { formData } = req.body

    if (!formData || !formData.postcode) {
      console.log('❌ Missing form data:', { formData })
      return res.status(400).json({ error: 'Property data required' })
    }

    console.log('📋 Form Data Received:', formData)

    if (!PROPERTYDATA_API_KEY) {
      console.log('❌ PROPERTYDATA_API_KEY not configured')
      return res.status(500).json({ error: 'PropertyData API key not configured' })
    }

    if (!OPENAI_API_KEY) {
      console.log('❌ OPENAI_API_KEY not configured')
      return res.status(500).json({ error: 'OpenAI API key not configured' })
    }

    const { postcode } = formData

    console.log('📡 Calling PropertyData API for postcode:', postcode)

    // Call PropertyData API for valuation
    const propertyDataUrl = `https://api.propertydata.co.uk/valuation-sale?key=${PROPERTYDATA_API_KEY}&postcode=${encodeURIComponent(postcode)}`
    console.log('🔗 PropertyData URL (masked):', propertyDataUrl.replace(PROPERTYDATA_API_KEY, 'HIDDEN_KEY'))

    const propertyResponse = await fetch(propertyDataUrl)
    
    console.log('📊 PropertyData Response Status:', propertyResponse.status)
    console.log('📊 PropertyData Response Headers:', Object.fromEntries(propertyResponse.headers.entries()))
    
    const propertyResponseText = await propertyResponse.text()
    console.log('📊 PropertyData Raw Response:', propertyResponseText)

    if (!propertyResponse.ok) {
      console.log('❌ PropertyData API failed:', {
        status: propertyResponse.status,
        statusText: propertyResponse.statusText,
        response: propertyResponseText
      })
      return res.status(400).json({ 
        error: 'Property data not found',
        details: `PropertyData API returned ${propertyResponse.status}: ${propertyResponseText}`
      })
    }

    let propertyData
    try {
      propertyData = JSON.parse(propertyResponseText)
      console.log('✅ PropertyData parsed successfully:', propertyData)
    } catch (parseError) {
      console.log('❌ Failed to parse PropertyData response:', parseError)
      return res.status(500).json({ 
        error: 'Invalid response from PropertyData API',
        details: propertyResponseText
      })
    }

    // Also try to get rental data
    let rentalData = null
    try {
      console.log('🏠 Fetching rental data...')
      const rentalUrl = `https://api.propertydata.co.uk/valuation-rental?key=${PROPERTYDATA_API_KEY}&postcode=${encodeURIComponent(postcode)}`
      const rentalResponse = await fetch(rentalUrl)
      
      if (rentalResponse.ok) {
        const rentalText = await rentalResponse.text()
        rentalData = JSON.parse(rentalText)
        console.log('✅ Rental data fetched:', rentalData)
      } else {
        console.log('⚠️ Rental data not available:', rentalResponse.status)
      }
    } catch (rentalError) {
      console.log('⚠️ Rental data fetch failed (non-critical):', rentalError.message)
    }

    console.log('🤖 Calling OpenAI API...')

    // Call OpenAI for analysis
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a professional UK property valuation expert with deep knowledge of the UK property market.'
          },
          {
            role: 'user',
            content: `Based on this UK property data, provide a comprehensive property valuation analysis:

Property Data: ${JSON.stringify(propertyData)}
Rental Data: ${rentalData ? JSON.stringify(rentalData) : 'Not available'}

Property Details from Form:
- Postcode: ${formData.postcode || 'Not specified'}
- Property Type: ${formData.propertyType || 'Not specified'}
- Bedrooms: ${formData.bedrooms || 'Not specified'}
- Bathrooms: ${formData.bathrooms || 'Not specified'}
- Condition: ${formData.condition || 'Not specified'}

Please provide:
1. A realistic market valuation range
2. Key factors affecting the valuation
3. Local market insights
4. Investment potential analysis
5. Quick sale estimate (for cash buyers)

Format the response as a professional property report suitable for homeowners.`
          }
        ],
        max_tokens: 1500,
        temperature: 0.7
      })
    })

    console.log('🤖 OpenAI Response Status:', openaiResponse.status)

    if (!openaiResponse.ok) {
      const openaiError = await openaiResponse.text()
      console.log('❌ OpenAI API failed:', {
        status: openaiResponse.status,
        error: openaiError
      })
      return res.status(500).json({ 
        error: 'AI analysis failed',
        details: `OpenAI API returned ${openaiResponse.status}: ${openaiError}`
      })
    }

    const openaiData = await openaiResponse.json()
    console.log('✅ OpenAI response received successfully')

    const analysis = openaiData.choices[0].message.content

    console.log('🎉 Success! Returning complete analysis')

    return res.status(200).json({
      success: true,
      valuation: {
        propertyData,
        rentalData,
        analysis,
        formData
      }
    })

  } catch (error) {
    console.log('💥 Unexpected error:', error)
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message
    })
  }
}