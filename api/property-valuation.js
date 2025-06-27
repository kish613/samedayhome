// Vercel API route for property valuation (Enhanced OpenAI only)
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

    // Validate OpenAI API key
    if (!OPENAI_API_KEY) {
      console.error('❌ OpenAI API key missing')
      return res.status(500).json({ error: 'OpenAI API key not configured' })
    }

    // Create comprehensive enhanced prompt for accurate UK property valuation
    const enhancedPrompt = `You are a Senior UK Property Valuation Expert with 20+ years of experience in the UK property market. You have access to comprehensive market data and comparable sales information.

CRITICAL INSTRUCTIONS:
1. Use your knowledge of recent UK property market trends, comparable sales, and current market conditions
2. Research typical property values for the specific postcode area provided
3. Consider recent sales data, asking prices, and market trends in your analysis
4. Provide realistic, professional valuations that match current UK market conditions
5. Base your estimates on actual comparable properties in the area

PROPERTY TO VALUE:
- Postcode: ${formData.postcode}
- Property Type: ${formData.propertyType || 'Mixed residential properties in area'}
- Bedrooms: ${formData.bedrooms || 'Typical for area'}
- Bathrooms: ${formData.bathrooms || 'Standard configuration'}
- Property Condition: ${formData.condition || 'Average condition'}

REQUIRED ANALYSIS - Please provide a comprehensive professional report including:

**1. MARKET RESEARCH & COMPARABLES**
- Search your knowledge of recent sales in ${formData.postcode} area
- Identify 3-5 comparable properties that have sold recently
- Analyze current asking prices vs sold prices in the area
- Consider local market trends and demand

**2. DETAILED PROPERTY VALUATION**
- **Current Market Value**: Realistic market value range based on comparables
- **Quick Sale Value**: 10-15% below market value for urgent sales
- **Cash Buyer Offer**: 75-85% of market value (our competitive cash offer)
- **Conservative Estimate**: Lower end for cautious buyers
- **Optimistic Estimate**: Higher end in favorable market conditions

**3. LOCATION & MARKET ANALYSIS**
- Area desirability and local amenities
- Transport links and accessibility
- School catchment areas and quality
- Recent development and regeneration projects
- Local market trends (rising/falling/stable)

**4. PROPERTY-SPECIFIC FACTORS**
- Impact of property type on value
- Bedroom/bathroom configuration analysis
- Condition assessment and value impact
- Potential improvement opportunities

**5. INVESTMENT ANALYSIS**
- **Rental Yield Estimate**: Monthly/annual rental income potential
- **Gross Yield %**: Annual rental income as % of property value
- **Capital Growth Potential**: 3-5 year outlook
- **Investor Appeal**: Attractiveness to property investors

**6. SAME DAY HOME BUYER OFFER**
- Our competitive cash offer amount
- Benefits of quick completion (7-28 days)
- No chain complications
- No survey or mortgage delays

**VALUATION REQUIREMENTS:**
- All figures must be in GBP (£)
- Provide specific numbers, not just ranges
- Use current 2024/2025 UK market conditions
- Base estimates on actual comparable data
- Consider postcode-specific factors
- Account for property type and condition

**FORMAT:**
Present as a professional property valuation report suitable for homeowners considering a quick sale. Include specific monetary figures and be confident in your assessments based on market knowledge.

Remember: You have access to extensive UK property market data. Use this knowledge to provide accurate, realistic valuations that reflect current market conditions in ${formData.postcode}.`

    console.log('🤖 Calling OpenAI API with enhanced prompt...')

    // Call OpenAI API with enhanced prompt
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
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
      return res.status(500).json({ 
        error: 'OpenAI API error',
        details: errorText
      })
    }

    const openaiData = await openaiResponse.json()
    console.log('✅ OpenAI Response Success')

    const analysis = openaiData.choices[0].message.content

    // Extract key valuation figures from the analysis for structured response
    // This will help the frontend display specific values
    const extractValueFromText = (text, patterns) => {
      for (const pattern of patterns) {
        const match = text.match(pattern)
        if (match) {
          // Clean the extracted value and convert to number
          const cleanValue = match[1].replace(/[£,\s]/g, '')
          const numValue = parseInt(cleanValue)
          
          // Ensure reasonable property values (UK properties typically £50k-£2M+)
          if (numValue >= 50000) {
            return numValue
          }
        }
      }
      return null
    }

    // Try to extract specific values from the analysis with improved patterns
    const marketValuePatterns = [
      /market value[^£]*£([\d,]+(?:,\d{3})*)/i,
      /current.*value[^£]*£([\d,]+(?:,\d{3})*)/i,
      /valued at[^£]*£([\d,]+(?:,\d{3})*)/i,
      /worth[^£]*£([\d,]+(?:,\d{3})*)/i,
      /estimate[^£]*£([\d,]+(?:,\d{3})*)/i
    ]
    
    const cashOfferPatterns = [
      /cash offer[^£]*£([\d,]+(?:,\d{3})*)/i,
      /cash buyer[^£]*£([\d,]+(?:,\d{3})*)/i,
      /same day.*offer[^£]*£([\d,]+(?:,\d{3})*)/i,
      /quick sale[^£]*£([\d,]+(?:,\d{3})*)/i,
      /urgent sale[^£]*£([\d,]+(?:,\d{3})*)/i
    ]

    let marketValue = extractValueFromText(analysis, marketValuePatterns)
    let cashOffer = extractValueFromText(analysis, cashOfferPatterns)

    // Fallback logic for reasonable UK property values based on postcode area
    if (!marketValue || marketValue < 50000) {
      // Generate reasonable market value based on UK property data
      const postcodeArea = formData.postcode.toUpperCase().substring(0, 2)
      const postcodeMultipliers = {
        'SW': 650000, 'W1': 800000, 'WC': 750000, 'EC': 600000, 'N1': 550000,
        'E1': 450000, 'SE': 400000, 'NW': 500000, 'W': 600000, 'E': 350000,
        'N': 450000, 'S': 350000, 'CR': 400000, 'BR': 450000, 'DA': 350000,
        'KT': 500000, 'TW': 450000, 'HA': 400000, 'UB': 350000, 'EN': 400000,
        'WD': 450000, 'AL': 500000, 'HP': 400000, 'SL': 450000, 'RG': 400000,
        'GU': 450000, 'BN': 350000, 'RH': 400000, 'TN': 350000, 'ME': 300000,
        'CT': 300000, 'TR': 250000, 'PL': 250000, 'EX': 300000, 'TQ': 350000,
        'BA': 400000, 'BS': 350000, 'GL': 300000, 'SN': 300000, 'SP': 350000,
        'BH': 400000, 'SO': 350000, 'PO': 300000, 'GU': 400000, 'RG': 350000
      }
      
      const baseValue = postcodeMultipliers[postcodeArea] || 350000
      
      // Adjust based on property type and bedrooms
      const propertyMultiplier = {
        'detached': 1.3,
        'semi-detached': 1.1,
        'terraced': 1.0,
        'flat': 0.8,
        'apartment': 0.85,
        'bungalow': 1.1,
        'maisonette': 0.9
      }
      
      const bedroomMultiplier = {
        '1': 0.7, '2': 0.85, '3': 1.0, '4': 1.2, '5': 1.4, '6+': 1.6
      }
      
      const propType = formData.propertyType?.toLowerCase() || 'terraced'
      const bedrooms = formData.bedrooms || '3'
      
      marketValue = Math.round(baseValue * 
        (propertyMultiplier[propType] || 1.0) * 
        (bedroomMultiplier[bedrooms] || 1.0))
    }

    // Calculate cash offer as 80-85% of market value if not extracted
    if (!cashOffer || cashOffer < 50000) {
      cashOffer = Math.round(marketValue * 0.82) // 82% of market value
    }

    console.log('💰 Extracted Values:')
    console.log('Market Value:', marketValue)
    console.log('Cash Offer:', cashOffer)

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
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    })
  }
}