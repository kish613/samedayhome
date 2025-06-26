// Enhanced property valuation service integrating PropertyData API, OpenAI O3, and 10 accuracy factors

import { enhancedDataService } from './enhancedDataServices.js'

const PROPERTYDATA_API_BASE = 'https://api.propertydata.co.uk/v1'
const OPENAI_API_BASE = 'https://api.openai.com/v1'

// Environment variables for API keys (should be set in production)
const PROPERTYDATA_API_KEY = process.env.REACT_APP_PROPERTYDATA_API_KEY
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY

export class PropertyValuationService {
  
  /**
   * Get enhanced property valuation with all accuracy factors
   * @param {Object} propertyData - Property details from form
   * @returns {Promise<Object>} Comprehensive property valuation data
   */
  async getPropertyValuation(propertyData) {
    try {
      const { postcode, propertyType, bedrooms, condition } = propertyData
      
      console.log('Starting enhanced property valuation...')
      
      // Step 1: Get PropertyData API valuation and comparables
      const propertyDataResults = await this.getPropertyDataValuation(postcode)
      
      // Step 2: Gather all enhanced data factors
      const enhancedData = await enhancedDataService.gatherComprehensiveData(propertyData)
      
      // Step 3: Calculate composite impact from all factors
      const compositeImpact = enhancedDataService.calculateCompositeImpact(enhancedData)
      
      console.log(`Composite impact factor: ${compositeImpact}`)
      
      return {
        valuation: propertyDataResults.valuation,
        comparables: propertyDataResults.comparables,
        propertyDetails: propertyData,
        enhancedData: enhancedData,
        compositeImpact: compositeImpact,
        accuracyFactors: this.summarizeAccuracyFactors(enhancedData)
      }

    } catch (error) {
      console.error('Error getting enhanced property valuation:', error)
      throw error
    }
  }

  /**
   * Get basic PropertyData valuation and comparables
   * @param {string} postcode 
   * @returns {Promise<Object>}
   */
  async getPropertyDataValuation(postcode) {
    try {
      // PropertyData API requires specific format
      const params = new URLSearchParams({
        postcode: postcode,
        api_key: PROPERTYDATA_API_KEY
      })

      const response = await fetch(`${PROPERTYDATA_API_BASE}/valuation-sale?${params}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`PropertyData API error: ${response.status}`)
      }

      const valuationData = await response.json()
      
      // Also get comparable sales data
      const comparablesResponse = await fetch(`${PROPERTYDATA_API_BASE}/sold-prices?${params}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      const comparablesData = comparablesResponse.ok ? await comparablesResponse.json() : null

      return {
        valuation: valuationData,
        comparables: comparablesData
      }

    } catch (error) {
      console.error('Error getting PropertyData valuation:', error)
      // Return fallback data structure
      return {
        valuation: { estimated_value: 300000, confidence: 'medium' },
        comparables: null
      }
    }
  }

  /**
   * Summarize accuracy factors for analysis
   * @param {Object} enhancedData 
   * @returns {Object}
   */
  summarizeAccuracyFactors(enhancedData) {
    return {
      energyEfficiency: {
        rating: enhancedData.epc.rating,
        impact: enhancedData.epc.impact,
        description: `EPC rating ${enhancedData.epc.rating} with ${enhancedData.epc.efficiency}% efficiency`
      },
      locationSafety: {
        crimeRate: enhancedData.crime.crime_rate,
        safetyScore: enhancedData.crime.safety_score,
        impact: enhancedData.crime.impact,
        description: `${enhancedData.crime.crime_rate} crime area with safety score ${enhancedData.crime.safety_score}/10`
      },
      educationAccess: {
        nearbySchools: enhancedData.schools.nearby_schools,
        outstandingSchools: enhancedData.schools.outstanding_schools,
        impact: enhancedData.schools.school_impact,
        description: `${enhancedData.schools.nearby_schools} schools nearby, ${enhancedData.schools.outstanding_schools} outstanding`
      },
      transportLinks: {
        score: enhancedData.transport.transport_score,
        impact: enhancedData.transport.impact,
        description: `Transport score ${enhancedData.transport.transport_score}/10`
      },
      developmentRisk: {
        riskScore: enhancedData.planning.risk_score,
        impact: enhancedData.planning.impact,
        description: `Development risk score ${enhancedData.planning.risk_score}/10`
      },
      propertyFeatures: {
        impact: enhancedData.satellite.impact,
        description: `Property features analysis from satellite imagery`
      },
      localAmenities: {
        score: enhancedData.amenities.amenity_score,
        walkability: enhancedData.amenities.walkability_score,
        impact: enhancedData.amenities.impact,
        description: `Amenity score ${enhancedData.amenities.amenity_score}/10, walkability ${enhancedData.amenities.walkability_score}/10`
      },
      environmentalFactors: {
        floodRisk: enhancedData.environmental.flood_risk,
        impact: enhancedData.environmental.environmental_impact,
        description: `${enhancedData.environmental.flood_risk} flood risk, ${enhancedData.environmental.air_quality} air quality`
      },
      marketMomentum: {
        trend: enhancedData.market.price_trend,
        momentum: enhancedData.market.momentum_score,
        impact: enhancedData.market.market_impact,
        description: `Market trend: ${enhancedData.market.price_trend}, momentum score ${enhancedData.market.momentum_score}/10`
      },
      demographics: {
        affluenceScore: enhancedData.demographics.affluence_score,
        averageIncome: enhancedData.demographics.average_income,
        impact: enhancedData.demographics.demographic_impact,
        description: `Affluence score ${enhancedData.demographics.affluence_score}/10, avg income £${enhancedData.demographics.average_income.toLocaleString()}`
      }
    }
  }

  /**
   * Calculate cash offer using enhanced OpenAI O3 analysis
   * @param {Object} propertyData - Combined property and valuation data
   * @returns {Promise<Object>} Calculated cash offer
   */
  async calculateCashOffer(propertyData) {
    try {
      const { valuation, comparables, propertyDetails, enhancedData, accuracyFactors, compositeImpact } = propertyData

      // Prepare enhanced prompt for OpenAI O3
      const prompt = this.buildValuationPrompt(valuation, comparables, propertyDetails, enhancedData, accuracyFactors, compositeImpact)

      const response = await fetch(`${OPENAI_API_BASE}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'o3-mini', // Using o3-mini for cost efficiency
          messages: [
            {
              role: 'system',
              content: 'You are a professional property valuation expert specializing in cash offers for UK properties. You analyze market data, property conditions, and comparable sales to provide accurate cash offer calculations.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          functions: [
            {
              name: 'calculate_cash_offer',
              description: 'Calculate cash offer for property based on market data',
              parameters: {
                type: 'object',
                properties: {
                  market_value: {
                    type: 'number',
                    description: 'Estimated market value of the property'
                  },
                  cash_offer: {
                    type: 'number',
                    description: 'Calculated cash offer (10-15% below market value)'
                  },
                  discount_percentage: {
                    type: 'number',
                    description: 'Percentage discount applied'
                  },
                  reasoning: {
                    type: 'string',
                    description: 'Detailed reasoning for the valuation and offer'
                  },
                  risk_factors: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Identified risk factors affecting the offer'
                  },
                  comparable_analysis: {
                    type: 'string',
                    description: 'Analysis of comparable properties'
                  }
                },
                required: ['market_value', 'cash_offer', 'discount_percentage', 'reasoning']
              }
            }
          ],
          function_call: { name: 'calculate_cash_offer' },
          temperature: 0.3, // Lower temperature for more consistent results
          max_tokens: 1000
        })
      })

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`)
      }

      const result = await response.json()
      
      // Parse the function call result
      const functionCall = result.choices?.[0]?.message?.function_call
      if (!functionCall || functionCall.name !== 'calculate_cash_offer') {
        throw new Error('Invalid response from OpenAI API')
      }

      const offerData = JSON.parse(functionCall.arguments)
      
      return {
        success: true,
        offer: offerData,
        timestamp: new Date().toISOString(),
        propertyDetails: propertyDetails
      }

    } catch (error) {
      console.error('Error calculating cash offer:', error)
      throw error
    }
  }

  /**
   * Build comprehensive enhanced prompt for OpenAI analysis
   * @param {Object} valuation - PropertyData valuation
   * @param {Object} comparables - Comparable sales data
   * @param {Object} propertyDetails - Property details from form
   * @param {Object} enhancedData - All 10 accuracy factors data
   * @param {Object} accuracyFactors - Summarized accuracy factors
   * @param {number} compositeImpact - Composite impact score
   * @returns {string} Formatted prompt
   */
  buildValuationPrompt(valuation, comparables, propertyDetails, enhancedData, accuracyFactors, compositeImpact) {
    return `
You are a leading UK property valuation expert with access to comprehensive market data and location intelligence. Analyze this property using advanced multi-factor analysis to calculate a precise cash offer 10-15% below true market value.

PROPERTY DETAILS:
- Address: ${propertyDetails.doorNumber} ${propertyDetails.fullAddress}, ${propertyDetails.postcode}
- Type: ${propertyDetails.propertyType}
- Bedrooms: ${propertyDetails.bedrooms}
- Condition: ${propertyDetails.condition}

MARKET VALUATION DATA:
${JSON.stringify(valuation, null, 2)}

COMPARABLE SALES DATA:
${comparables ? JSON.stringify(comparables, null, 2) : 'No comparable data available'}

ENHANCED LOCATION & PROPERTY ANALYSIS:

1. ENERGY EFFICIENCY (Impact: ${accuracyFactors.energyEfficiency.impact}):
${accuracyFactors.energyEfficiency.description}

2. LOCATION SAFETY (Impact: ${accuracyFactors.locationSafety.impact}):
${accuracyFactors.locationSafety.description}

3. EDUCATION ACCESS (Impact: ${accuracyFactors.educationAccess.impact}):
${accuracyFactors.educationAccess.description}

4. TRANSPORT LINKS (Impact: ${accuracyFactors.transportLinks.impact}):
${accuracyFactors.transportLinks.description}

5. DEVELOPMENT RISK (Impact: ${accuracyFactors.developmentRisk.impact}):
${accuracyFactors.developmentRisk.description}

6. PROPERTY FEATURES (Impact: ${accuracyFactors.propertyFeatures.impact}):
${accuracyFactors.propertyFeatures.description}

7. LOCAL AMENITIES (Impact: ${accuracyFactors.localAmenities.impact}):
${accuracyFactors.localAmenities.description}

8. ENVIRONMENTAL FACTORS (Impact: ${accuracyFactors.environmentalFactors.impact}):
${accuracyFactors.environmentalFactors.description}

9. MARKET MOMENTUM (Impact: ${accuracyFactors.marketMomentum.impact}):
${accuracyFactors.marketMomentum.description}

10. DEMOGRAPHICS (Impact: ${accuracyFactors.demographics.impact}):
${accuracyFactors.demographics.description}

COMPOSITE IMPACT FACTOR: ${compositeImpact}
This represents the combined effect of all location and property factors on market value.

DETAILED ENHANCED DATA:
${JSON.stringify(enhancedData, null, 2)}

COMPREHENSIVE ANALYSIS REQUIREMENTS:
1. Start with base PropertyData valuation and comparable sales
2. Apply the composite impact factor (${compositeImpact}) to adjust for all location factors
3. Consider each of the 10 accuracy factors individually for risk assessment
4. Factor in property condition impact
5. Apply appropriate cash purchase discount (10-15%) based on:
   - Property condition
   - Market momentum  
   - Location desirability
   - Risk factors identified

ENHANCED DISCOUNT CALCULATION GUIDELINES:
Base Property Condition Discounts:
- Excellent condition: 10-12% discount
- Good condition: 12-13% discount  
- Fair condition: 13-14% discount
- Requires work: 14-15% discount

Additional Adjustments Based on Enhanced Factors:
- High crime area: +1-2% additional discount
- Poor transport links: +1% additional discount
- Flood risk: +2-5% additional discount
- Outstanding schools nearby: -0.5% discount (less discount needed)
- Excellent amenities: -0.5% discount
- Strong market momentum: -0.5% discount
- High affluence area: -1% discount

Calculate the most accurate market value using all available data, then apply the appropriate cash offer discount. Provide detailed reasoning for each factor's influence on your valuation.
    `.trim()
  }

  /**
   * Complete property valuation and offer calculation workflow
   * @param {Object} formData - Property data from form submission
   * @returns {Promise<Object>} Complete valuation and offer result
   */
  async processPropertyOffer(formData) {
    try {
      // Step 1: Get property valuation from PropertyData
      console.log('Getting property valuation...')
      const valuationData = await this.getPropertyValuation(formData)
      
      // Step 2: Calculate cash offer using OpenAI
      console.log('Calculating cash offer...')
      const offerResult = await this.calculateCashOffer(valuationData)
      
      return {
        success: true,
        data: offerResult,
        message: 'Property valuation and cash offer calculated successfully'
      }

    } catch (error) {
      console.error('Error processing property offer:', error)
      
      // Try to get enhanced data even if main APIs fail
      let enhancedDataForFallback = null
      try {
        enhancedDataForFallback = await enhancedDataService.gatherComprehensiveData(formData)
        console.log('Enhanced data gathered for fallback calculation')
      } catch (enhancedError) {
        console.log('Enhanced data also unavailable, using basic fallback')
      }
      
      // Enhanced fallback calculation
      const fallbackOffer = this.calculateFallbackOffer(formData, enhancedDataForFallback)
      
      return {
        success: false,
        error: error.message,
        fallback: fallbackOffer,
        message: enhancedDataForFallback 
          ? 'PropertyData/OpenAI APIs unavailable. Using enhanced fallback calculation with location data.'
          : 'API services unavailable. Using basic fallback calculation.'
      }
    }
  }

  /**
   * Enhanced fallback offer calculation when APIs are unavailable
   * @param {Object} formData - Property data
   * @param {Object} enhancedData - Enhanced data if available
   * @returns {Object} Enhanced fallback calculation
   */
  calculateFallbackOffer(formData, enhancedData = null) {
    // Basic estimation based on property type and condition
    const baseEstimates = {
      'terraced': { 1: 180000, 2: 220000, 3: 280000, 4: 350000, '5+': 420000 },
      'semi-detached': { 1: 200000, 2: 250000, 3: 320000, 4: 400000, '5+': 480000 },
      'detached': { 1: 250000, 2: 300000, 3: 400000, 4: 500000, '5+': 600000 }
    }

    const conditionMultipliers = {
      'excellent': 1.0,
      'good': 0.95,
      'fair': 0.85,
      'requires-work': 0.75
    }

    let baseValue = baseEstimates[formData.propertyType]?.[formData.bedrooms] || 250000
    
    // Apply enhanced data adjustments if available
    if (enhancedData) {
      const compositeImpact = enhancedDataService.calculateCompositeImpact(enhancedData)
      baseValue *= compositeImpact
      console.log(`Applied enhanced composite impact: ${compositeImpact}`)
    }
    
    const conditionValue = baseValue * (conditionMultipliers[formData.condition] || 0.85)
    
    // Enhanced discount calculation
    let discountPercent = 13 // Base discount
    
    if (enhancedData) {
      // Adjust discount based on enhanced factors
      if (enhancedData.crime.crime_rate === 'high') discountPercent += 2
      if (enhancedData.transport.transport_score < 5) discountPercent += 1
      if (enhancedData.environmental.flood_risk === 'high') discountPercent += 3
      if (enhancedData.schools.outstanding_schools > 0) discountPercent -= 0.5
      if (enhancedData.amenities.amenity_score > 8) discountPercent -= 0.5
      if (enhancedData.market.price_trend === 'rising') discountPercent -= 0.5
      if (enhancedData.demographics.affluence_score > 8) discountPercent -= 1
    }
    
    discountPercent = Math.max(10, Math.min(18, discountPercent)) // Keep within reasonable bounds
    const cashOffer = Math.round(conditionValue * (1 - discountPercent / 100))

    const riskFactors = ['Fallback calculation mode']
    if (enhancedData) {
      if (enhancedData.crime.crime_rate === 'high') riskFactors.push('High crime area')
      if (enhancedData.environmental.flood_risk !== 'very low') riskFactors.push(`${enhancedData.environmental.flood_risk} flood risk`)
      if (enhancedData.transport.transport_score < 5) riskFactors.push('Limited transport links')
    } else {
      riskFactors.push('Limited market data available', 'No enhanced location analysis')
    }

    return {
      market_value: Math.round(conditionValue),
      cash_offer: cashOffer,
      discount_percentage: Math.round(discountPercent * 10) / 10,
      reasoning: enhancedData 
        ? `Enhanced fallback calculation using property characteristics and available location data. Applied ${discountPercent}% discount based on condition and location factors.`
        : 'Basic fallback calculation based on property type, bedrooms, and condition. This is an estimate - actual valuation requires comprehensive market data.',
      risk_factors: riskFactors,
      comparable_analysis: enhancedData && enhancedData.market.price_trend 
        ? `Market trend: ${enhancedData.market.price_trend}. Limited comparable data in fallback mode.`
        : 'No comparable data available in fallback mode'
    }
  }
}

// Export singleton instance
export const propertyValuationService = new PropertyValuationService()