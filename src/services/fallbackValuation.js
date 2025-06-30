// Client-side fallback valuation service
export class FallbackValuationService {
  
  static calculatePropertyValuation(formData) {
    console.log('🔄 Using client-side fallback valuation calculation')
    
    // Base values by property type (UK averages)
    const baseValuesByType = {
      'detached-house': 450000,
      'semi-detached-house': 350000,
      'terraced-house': 275000,
      'flat-apartment': 225000,
      'bungalow': 320000,
      'maisonette': 240000,
      'cottage': 380000,
      'other': 300000
    }
    
    // Bedroom multipliers
    const bedroomMultipliers = {
      'studio': 0.6,
      '1': 0.7,
      '2': 0.85,
      '3': 1.0,
      '4': 1.25,
      '5': 1.5,
      '6+': 1.8
    }
    
    // Condition multipliers
    const conditionMultipliers = {
      'excellent': 1.1,
      'good': 1.0,
      'fair': 0.9,
      'poor': 0.75,
      'very-poor': 0.6
    }
    
    // Calculate market value
    const baseValue = baseValuesByType[formData.propertyType] || 300000
    const bedroomMultiplier = bedroomMultipliers[formData.bedrooms] || 1.0
    const conditionMultiplier = conditionMultipliers[formData.condition] || 1.0
    
    const marketValue = Math.round(baseValue * bedroomMultiplier * conditionMultiplier)
    
    // Calculate cash offer discount based on condition
    const discountPercentage = formData.condition === 'excellent' ? 10 : 
                             formData.condition === 'good' ? 12 : 
                             formData.condition === 'fair' ? 13 : 15
    
    const cashOffer = Math.round(marketValue * (100 - discountPercentage) / 100)
    
    return {
      success: true,
      data: {
        offer: {
          market_value: marketValue,
          cash_offer: cashOffer,
          discount_percentage: discountPercentage,
          reasoning: `Property valuation for ${formData.propertyType} with ${formData.bedrooms} bedrooms in ${formData.condition} condition located at ${formData.postcode}. This estimate is based on general market averages for similar properties. Market value calculated using property type baseline of £${baseValue.toLocaleString()}, adjusted for ${formData.bedrooms} bedrooms (${Math.round(bedroomMultiplier * 100)}% of base) and ${formData.condition} condition (${Math.round(conditionMultiplier * 100)}% of adjusted value). Cash offer provides ${discountPercentage}% discount for quick completion.`,
          risk_factors: [
            'Estimated valuation based on property averages',
            'Local market conditions not considered',
            'Professional survey recommended for accuracy'
          ],
          comparable_analysis: `Based on UK market averages for ${formData.propertyType} properties with ${formData.bedrooms} bedrooms in ${formData.condition} condition`
        },
        propertyDetails: formData,
        generatedAt: new Date().toISOString(),
        source: 'Client-side Fallback Calculation',
        methodology: 'Property type baseline with bedroom and condition adjustments'
      }
    }
  }
  
  // Regional multipliers for more accurate estimates (optional enhancement)
  static getRegionalMultiplier(postcode) {
    const regionMultipliers = {
      // London postcodes
      'SW': 1.8, 'SE': 1.4, 'NW': 1.6, 'N': 1.3, 'E': 1.2, 'W': 1.9, 'WC': 2.0, 'EC': 1.7,
      // Major cities
      'M': 0.8,   // Manchester
      'B': 0.7,   // Birmingham  
      'LS': 0.9,  // Leeds
      'L': 0.8,   // Liverpool
      'S': 0.7,   // Sheffield
      'NE': 0.8,  // Newcastle
      'G': 0.9,   // Glasgow
      'EH': 1.1,  // Edinburgh
      // General areas
      'BR': 1.2,  // Bromley (Greater London)
      'CR': 1.1,  // Croydon
      'KT': 1.3,  // Kingston upon Thames
      'TW': 1.2,  // Twickenham
    }
    
    const prefix = postcode.replace(/\d.*/, '').toUpperCase()
    return regionMultipliers[prefix] || 1.0
  }
  
  // Enhanced calculation with regional adjustment
  static calculateEnhancedValuation(formData) {
    const basicValuation = this.calculatePropertyValuation(formData)
    const regionalMultiplier = this.getRegionalMultiplier(formData.postcode)
    
    if (regionalMultiplier !== 1.0) {
      const adjustedMarketValue = Math.round(basicValuation.data.offer.market_value * regionalMultiplier)
      const adjustedCashOffer = Math.round(adjustedMarketValue * (100 - basicValuation.data.offer.discount_percentage) / 100)
      
      basicValuation.data.offer.market_value = adjustedMarketValue
      basicValuation.data.offer.cash_offer = adjustedCashOffer
      basicValuation.data.offer.reasoning += ` Regional adjustment applied for ${formData.postcode} area (${Math.round(regionalMultiplier * 100)}% of base rate).`
      basicValuation.data.methodology += ' with regional market adjustment'
    }
    
    return basicValuation
  }
}