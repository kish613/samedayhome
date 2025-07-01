// Client-side fallback valuation service
export class FallbackValuationService {
  
  static calculatePropertyValuation(formData) {
    console.log('🔄 Using client-side fallback valuation calculation')
    
    // Enhanced base values by property type (UK averages 2024/2025)
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
    
    // Enhanced bedroom multipliers
    const bedroomMultipliers = {
      'studio': 0.6,
      '1': 0.75,  // Slightly increased
      '2': 0.9,   // Slightly increased
      '3': 1.0,
      '4': 1.3,   // Increased from 1.25
      '5': 1.6,   // Increased from 1.5
      '6+': 1.9   // Increased from 1.8
    }
    
    // Enhanced condition multipliers (less harsh penalties)
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
    
    return {
      success: true,
      data: {
        offer: {
          market_value: marketValue,
          cash_offer: cashOffer,
          discount_percentage: discountPercentage,
          reasoning: `Enhanced property valuation for ${formData.propertyType} with ${formData.bedrooms} bedrooms in ${formData.condition} condition at ${formData.fullAddress || formData.postcode}. Market value of £${marketValue.toLocaleString()} calculated using current 2024/2025 UK property values. Our competitive cash offer of £${cashOffer.toLocaleString()} represents ${100-discountPercentage}% of market value, providing quick completion with no fees, chains, or delays.`,
          risk_factors: [
            'Estimated valuation based on current market data',
            'Professional survey recommended for final accuracy',
            'Local market conditions may vary'
          ],
          comparable_analysis: `Based on updated UK market averages for ${formData.propertyType} properties with ${formData.bedrooms} bedrooms in ${formData.condition} condition`
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