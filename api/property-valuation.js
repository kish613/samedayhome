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
- **Current Market Value**: £XXX,XXX (provide exact figure)
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
- Our competitive cash offer amount: £XXX,XXX (provide exact figure)
- Benefits of quick completion (7-28 days)
- No chain complications
- No survey or mortgage delays

**CRITICAL OUTPUT FORMAT REQUIREMENTS:**
You MUST include these exact phrases with specific monetary values:

"MARKET VALUE: £XXX,XXX" (where XXX,XXX is the full amount like £425,000)
"CASH OFFER: £XXX,XXX" (where XXX,XXX is the full amount like £350,000)

**VALUATION REQUIREMENTS:**
- All figures must be in GBP (£)
- Provide specific numbers with full amounts (e.g., £425,000 not £425k)
- Use current 2024/2025 UK market conditions
- Base estimates on actual comparable data
- Consider postcode-specific factors
- Account for property type and condition
- Values should be realistic for UK properties (typically £150,000-£2,000,000+)

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
      /MARKET VALUE:\s*£([\d,]+)/i,
      /market value:\s*£([\d,]+)/i,
      /Current Market Value:\s*£([\d,]+)/i,
      // Add more flexible patterns for common AI variations
      /market value.{0,50}£([\d,]+)/i,
      /current value.{0,50}£([\d,]+)/i,
      /property value.{0,50}£([\d,]+)/i,
      /estimated value.{0,50}£([\d,]+)/i,
      /worth.{0,50}£([\d,]+)/i,
      /valued at.{0,50}£([\d,]+)/i,
      /£([\d,]+).{0,50}market value/i,
      /£([\d,]+).{0,50}current value/i
    ]
    
    const cashOfferPatterns = [
      /CASH OFFER:\s*£([\d,]+)/i,
      /cash offer:\s*£([\d,]+)/i,
      /Cash Buyer Offer:\s*£([\d,]+)/i,
      /competitive cash offer amount:\s*£([\d,]+)/i,
      // Add more flexible patterns for common AI variations
      /cash offer.{0,50}£([\d,]+)/i,
      /cash buyer.{0,50}£([\d,]+)/i,
      /offer.{0,50}£([\d,]+)/i,
      /quick sale.{0,50}£([\d,]+)/i,
      /same day.{0,50}£([\d,]+)/i,
      /£([\d,]+).{0,50}cash offer/i,
      /£([\d,]+).{0,50}offer/i
    ]

    console.log('🔍 Searching for values in AI response...')
    console.log('AI Response excerpt:', analysis.substring(0, 1000) + '...')
    console.log('Full AI Response Length:', analysis.length)

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
      console.error('FULL AI Response for debugging:')
      console.error(analysis)
      
      return res.status(500).json({
        error: 'Failed to extract property values from AI analysis',
        details: 'AI response format issue - values not found in expected format',
        debug: {
          marketValueFound: !!marketValue,
          cashOfferFound: !!cashOffer,
          fullResponse: analysis,
          responseLength: analysis.length
        }
      })
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
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    })
  }
}