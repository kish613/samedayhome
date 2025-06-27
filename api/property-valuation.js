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

    // Validate API keys are configured
    if (!PROPERTYDATA_API_KEY) {
      console.error('❌ PROPERTYDATA_API_KEY not configured')
      return res.status(500).json({ error: 'PropertyData API key not configured' })
    }

    if (!OPENAI_API_KEY) {
      console.error('❌ OPENAI_API_KEY not configured')
      return res.status(500).json({ error: 'OpenAI API key not configured' })
    }

    console.log('🔍 Processing valuation request for:', formData.postcode)

    // Step 1: Get property valuation from PropertyData API
    const propertyDataUrl = `https://api.propertydata.co.uk/valuation-sale?key=${PROPERTYDATA_API_KEY}&postcode=${encodeURIComponent(formData.postcode)}`
    
    console.log('🌐 Calling PropertyData API:', propertyDataUrl.replace(PROPERTYDATA_API_KEY, 'KEY_HIDDEN'))

    const propertyResponse = await fetch(propertyDataUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })

    console.log('📡 PropertyData API Response Status:', propertyResponse.status)

    if (!propertyResponse.ok) {
      const errorText = await propertyResponse.text()
      console.error('❌ PropertyData API Error:', errorText)
      return res.status(400).json({ 
        error: 'PropertyData API failed', 
        details: errorText,
        status: propertyResponse.status 
      })
    }

    const propertyData = await propertyResponse.json()
    console.log('✅ PropertyData API Success:', JSON.stringify(propertyData, null, 2))

    // Step 2: Get rental valuation as well if available
    const rentalDataUrl = `https://api.propertydata.co.uk/valuation-rent?key=${PROPERTYDATA_API_KEY}&postcode=${encodeURIComponent(formData.postcode)}`
    
    let rentalData = null
    try {
      const rentalResponse = await fetch(rentalDataUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      })
      
      if (rentalResponse.ok) {
        rentalData = await rentalResponse.json()
        console.log('✅ Rental Data Success:', JSON.stringify(rentalData, null, 2))
      }
    } catch (error) {
      console.log('⚠️ Rental data not available:', error.message)
    }

    // Step 3: Generate AI analysis with OpenAI
    const prompt = `Based on this UK property data, provide a comprehensive property valuation analysis:

Property Data: ${JSON.stringify(propertyData, null, 2)}
${rentalData ? `Rental Data: ${JSON.stringify(rentalData, null, 2)}` : ''}

Property Details from Form:
- Postcode: ${formData.postcode}
- Property Type: ${formData.propertyType || 'Not specified'}
- Bedrooms: ${formData.bedrooms || 'Not specified'}
- Bathrooms: ${formData.bathrooms || 'Not specified'}
- Condition: ${formData.condition || 'Not specified'}

Please provide:
1. Current market value estimate and range
2. Local market analysis and trends
3. Rental yield potential (if rental data available)
4. Investment potential and recommendations
5. Key factors affecting value
6. Market outlook for this area

Format as a professional property report.`

    console.log('🤖 Calling OpenAI API...')

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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
            content: 'You are a professional UK property valuation expert with deep knowledge of the UK property market.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.7
      })
    })

    console.log('📡 OpenAI API Response Status:', openaiResponse.status)

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text()
      console.error('❌ OpenAI API Error:', errorText)
      return res.status(400).json({ 
        error: 'OpenAI API failed', 
        details: errorText,
        status: openaiResponse.status 
      })
    }

    const aiResponse = await openaiResponse.json()
    console.log('✅ OpenAI API Success')

    const analysis = aiResponse.choices[0].message.content

    // Return successful response
    const result = {
      success: true,
      propertyData,
      rentalData,
      analysis,
      postcode: formData.postcode,
      timestamp: new Date().toISOString()
    }

    console.log('✅ Returning successful valuation result')
    return res.status(200).json(result)

  } catch (error) {
    console.error('❌ Valuation API Error:', error)
    return res.status(500).json({ 
      error: 'Internal server error', 
      details: error.message 
    })
  }
}