// Vercel API route for property valuation (Enhanced OpenAI only)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY

// Fallback calculation function when OpenAI API is unavailable
function handleFallbackCalculation(formData, res) {
  console.log('🔄 Using fallback property valuation calculation')
  
  // Enhanced valuation logic with updated UK property values (2024/2025)
  const baseValuesByType = {
    'detached-house': 580000,  // Increased from 450k
    'semi-detached-house': 420000,  // Increased from 350k  
    'terraced-house': 320000,  // Increased from 275k
    'flat-apartment': 280000,  // Increased from 225k
    'bungalow': 380000,  // Increased from 320k
    'maisonette': 300000,  // Increased from 240k
    'cottage': 450000,  // Increased from 380k
    'other': 350000  // Increased from 300k
  }
  
  const bedroomMultipliers = {
    'studio': 0.6,
    '1': 0.75,  // Slightly increased
    '2': 0.9,   // Slightly increased
    '3': 1.0,
    '4': 1.3,   // Increased from 1.25
    '5': 1.6,   // Increased from 1.5
    '6+': 1.9   // Increased from 1.8
  }
  
  const conditionMultipliers = {
    'excellent': 1.15,  // Increased from 1.1
    'good': 1.0,
    'fair': 0.92,      // Less penalty (was 0.9)
    'poor': 0.8,       // Less penalty (was 0.75)
    'very-poor': 0.65  // Less penalty (was 0.6)
  }
  
  // Calculate market value
  const baseValue = baseValuesByType[formData.propertyType] || 350000
  const bedroomMultiplier = bedroomMultipliers[formData.bedrooms] || 1.0
  const conditionMultiplier = conditionMultipliers[formData.condition] || 1.0
  
  const marketValue = Math.round(baseValue * bedroomMultiplier * conditionMultiplier)
  
  // Calculate competitive cash offer (5-8% below market value - much more competitive)
  const discountPercentage = formData.condition === 'excellent' ? 5 : 
                           formData.condition === 'good' ? 6 : 
                           formData.condition === 'fair' ? 7 : 8
  
  const cashOffer = Math.round(marketValue * (100 - discountPercentage) / 100)
  
  const fallbackResponse = {
    success: true,
    data: {
      offer: {
        market_value: marketValue,
        cash_offer: cashOffer,
        discount_percentage: discountPercentage,
        reasoning: `Enhanced property valuation for ${formData.propertyType} with ${formData.bedrooms} bedrooms in ${formData.condition} condition at ${formData.fullAddress || formData.postcode}. Market value of £${marketValue.toLocaleString()} calculated using current 2024/2025 UK property values. Our competitive cash offer of £${cashOffer.toLocaleString()} represents ${100-discountPercentage}% of market value, providing quick completion with no fees, chains, or delays.`,
        risk_factors: ['Estimated valuation based on current market data', 'Professional survey recommended for final accuracy', 'Local market conditions may vary'],
        comparable_analysis: `Based on updated UK market averages for ${formData.propertyType} properties with ${formData.bedrooms} bedrooms in ${formData.condition} condition`
      },
      propertyDetails: formData,
      generatedAt: new Date().toISOString(),
      source: 'Fallback Calculation System',
      methodology: 'Basic calculation using property type, size, and condition factors'
    }
  }
  
  console.log('📊 Fallback calculation complete:', fallbackResponse.data.offer)
  return res.status(200).json(fallbackResponse)
}

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

  // DEBUG: Check environment variables
  console.log('🔧 Environment Check:')
  console.log('OPENAI_API_KEY exists:', !!OPENAI_API_KEY)
  console.log('OPENAI_API_KEY length:', OPENAI_API_KEY?.length || 0)

  try {
    const { formData } = req.body

    if (!formData || !formData.postcode) {
      return res.status(400).json({ error: 'Postcode required for property valuation' })
    }

    console.log('📊 Form Data Received:', JSON.stringify(formData, null, 2))

    // Validate OpenAI API key - if missing, use fallback calculation
    if (!OPENAI_API_KEY) {
      console.error('❌ OpenAI API key missing - using fallback calculation')
      return handleFallbackCalculation(formData, res)
    }

    // Create comprehensive enhanced prompt for accurate UK property valuation
    const enhancedPrompt = `CRITICAL FORMATTING INSTRUCTIONS - READ FIRST:

You MUST start your response with these exact two lines in this exact format:
MARKET_VALUE: £XXX,XXX
CASH_OFFER: £XXX,XXX

Example:
MARKET_VALUE: £525,000
CASH_OFFER: £485,000

After these two required lines, provide your detailed analysis.

---

You are a Senior UK Property Valuation Expert with 20+ years of experience in the UK property market and access to comprehensive property databases including Rightmove, Zoopla, and Land Registry data.

PROPERTY TO VALUE:
- Full Address: ${formData.fullAddress || `${formData.doorNumber || ''} [Street], ${formData.postcode}`}
- Postcode: ${formData.postcode}
- Property Type: ${formData.propertyType || 'Standard residential property'}
- Bedrooms: ${formData.bedrooms || '3'}
- Property Condition: ${formData.condition || 'Average condition'}
- Door Number: ${formData.doorNumber || 'Not specified'}

VALUATION REQUIREMENTS:
1. Research current market conditions for this specific address and ${formData.postcode} area
2. Consider recent comparable sales within 0.5 miles of this property
3. Account for local transport links, schools, amenities, and market trends
4. Provide accurate UK property valuations reflecting current 2024/2025 market conditions
5. Consider that UK property values range from £50,000 (rural areas) to £10M+ (prime London)
6. Cash offer should be 90-95% of market value (competitive cash buying rate)

MARKET CONTEXT:
- Use 2024/2025 UK property market data
- Account for location premiums (London, South East command higher prices)
- Consider transport links (proximity to stations, major roads)
- Factor in local amenities (schools, shops, parks)
- Review recent sales in ${formData.postcode} area

RESPONSE FORMAT (MANDATORY):
Start with exactly these two lines:
MARKET_VALUE: £[amount with commas]
CASH_OFFER: £[amount with commas]

Then provide detailed analysis including:
- Recent comparable sales near ${formData.fullAddress || formData.postcode}
- Local market trends and price movements
- Location benefits and transport links
- Investment potential and rental yields
- Property condition impact on value
- Benefits of our competitive 90-95% cash offer

Remember: Your first two lines MUST be the values in the exact format shown above. Be realistic about current UK property values.`

    console.log('🤖 Calling OpenAI API with enhanced prompt...')

    // Call OpenAI API with enhanced prompt
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',  // Using full GPT-4 for better property knowledge
        messages: [
          {
            role: 'system',
            content: 'You are a Senior UK Property Valuation Expert with 20+ years of experience and access to comprehensive UK property market data. You specialize in providing accurate, professional property valuations based on comparable sales, market trends, and location-specific factors. Your valuations are used by property investors, homeowners, and cash buying companies.'
          },
          {
            role: 'user',
            content: enhancedPrompt
          }
        ],
        max_tokens: 3000,
        temperature: 0.3,
      }),
    })

    console.log('📡 OpenAI Response Status:', openaiResponse.status)

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text()
      console.error('❌ OpenAI API Error:', errorText)
      console.log('🔄 OpenAI API failed, falling back to basic calculation')
      return handleFallbackCalculation(formData, res)
    }

    const openaiData = await openaiResponse.json()
    console.log('✅ OpenAI Response Success')

    const analysis = openaiData.choices[0].message.content

    // Extract key valuation figures from the analysis for structured response
    // Look for the exact format phrases specified in the prompt
    const extractValueFromText = (text, patterns) => {
      for (const pattern of patterns) {
        const match = text.match(pattern)
        if (match) {
          // Clean the extracted value and convert to number
          const cleanValue = match[1].replace(/[£,\s]/g, '')
          const numValue = parseInt(cleanValue)
          
          console.log(`🔍 Found match: ${match[0]} -> ${numValue}`)
          
          // Ensure reasonable property values (UK properties typically £50k-£2M+)
          if (numValue >= 50000 && numValue <= 5000000) {
            return numValue
          } else {
            console.log(`⚠️ Value ${numValue} outside reasonable range`)
          }
        }
      }
      return null
    }

    // Look for the exact format phrases we specified in the prompt
    const marketValuePatterns = [
      /MARKET_VALUE:\s*£([\d,]+)/i,
      // Backup patterns in case AI doesn't follow exact format
      /market value:\s*£([\d,]+)/i,
      /market value.{0,50}£([\d,]+)/i
    ]
    
    const cashOfferPatterns = [
      /CASH_OFFER:\s*£([\d,]+)/i,
      // Backup patterns in case AI doesn't follow exact format
      /cash offer:\s*£([\d,]+)/i,
      /cash offer.{0,50}£([\d,]+)/i
    ]

    console.log('🔍 Searching for values in AI response...')
    console.log('AI Response first 200 chars:', analysis.substring(0, 200))
    console.log('Looking for MARKET_VALUE: and CASH_OFFER: patterns...')

    const marketValue = extractValueFromText(analysis, marketValuePatterns)
    const cashOffer = extractValueFromText(analysis, cashOfferPatterns)

    console.log('💰 Extracted Values:')
    console.log('Market Value:', marketValue)
    console.log('Cash Offer:', cashOffer)

    // If we couldn't extract proper values, return an error with full debug info
    if (!marketValue || !cashOffer) {
      console.error('❌ Failed to extract proper values from AI response')
      console.error('Market Value found:', marketValue)
      console.error('Cash Offer found:', cashOffer)
      console.error('First 500 chars of AI response:')
      console.error(analysis.substring(0, 500))
      
      console.log('🔄 AI response parsing failed, falling back to basic calculation')
      return handleFallbackCalculation(formData, res)
    }

    // Return successful response with enhanced analysis
    const response = {
      success: true,
      data: {
        offer: {
          market_value: marketValue,
          cash_offer: cashOffer,
          discount_percentage: Math.round(((marketValue - cashOffer) / marketValue) * 100),
          reasoning: analysis,
          risk_factors: ['AI-generated valuation', 'Based on current market conditions'],
          comparable_analysis: 'Comprehensive market analysis using current UK property data'
        },
        propertyDetails: formData,
        generatedAt: new Date().toISOString(),
        source: 'Enhanced OpenAI GPT-4o-mini Professional Analysis',
        methodology: 'Comparable sales analysis with current market data'
      }
    }

    console.log('🎉 Sending enhanced valuation response')
    return res.status(200).json(response)

  } catch (error) {
    console.error('💥 Unexpected error:', error)
    console.log('🔄 Unexpected error occurred, falling back to basic calculation')
    try {
      return handleFallbackCalculation(formData, res)
    } catch (fallbackError) {
      console.error('💥 Fallback calculation also failed:', fallbackError)
      return res.status(500).json({ 
        error: 'Internal server error',
        details: 'Both primary and fallback calculations failed. Please try again later.' 
      })
    }
  }
}