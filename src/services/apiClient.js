// Frontend API client for Vercel backend
import { FallbackValuationService } from './fallbackValuation.js'

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
      console.log('🔄 API unavailable, using client-side fallback calculation')
      
      // Use client-side fallback when API is unavailable
      return FallbackValuationService.calculateEnhancedValuation(formData)
    }
  }

  // Alias method for backward compatibility
  async submitPropertyValuation(formData) {
    try {
      return await this.processPropertyOffer(formData)
    } catch (error) {
      console.error('submitPropertyValuation error:', error)
      console.log('🔄 Using client-side fallback for submitPropertyValuation')
      return FallbackValuationService.calculateEnhancedValuation(formData)
    }
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

  async sendSubmissionEmail(submissionData) {
    try {
      const response = await fetch(`${this.baseUrl}/property-submission`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to send submission email:', errorData.error);
        // Don't throw an error, just log it, as the main valuation was successful
      }
    } catch (error) {
      console.error('Error sending submission email:', error);
    }
  }
}

export const apiClient = new ApiClient() 