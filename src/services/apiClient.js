// Frontend API client for Vercel backend
export class ApiClient {
  
  constructor() {
    // Use relative URLs for both development and production
    this.baseUrl = '/api'
  }

  async processPropertyOffer(formData) {
    try {
      const response = await fetch(`${this.baseUrl}/property-valuation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`API error: ${response.status} - ${errorData.error || 'Unknown error'}`)
      }

      return await response.json()

    } catch (error) {
      console.error('API client error:', error)
      throw error
    }
  }

  // Alias for processPropertyOffer to match form expectations
  async submitPropertyValuation(submissionData) {
    return this.processPropertyOffer(submissionData)
  }

  async getEnhancedData(propertyData) {
    try {
      const response = await fetch(`${this.baseUrl}/enhanced-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ propertyData })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Enhanced data API error: ${response.status} - ${errorData.error || 'Unknown error'}`)
      }

      return await response.json()

    } catch (error) {
      console.error('Enhanced data client error:', error)
      throw error
    }
  }
}

export const apiClient = new ApiClient() 