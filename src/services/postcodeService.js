// Secure postcode lookup service that calls your backend
class PostcodeService {
  constructor() {
    // Backend API endpoint (secure)
    this.apiEndpoint = '/api/postcode-lookup'
    this.debug = import.meta.env.VITE_DEBUG_POSTCODE === 'true'
    
    if (this.debug) {
      console.log('PostcodeService initialized with backend endpoint:', this.apiEndpoint)
    }
  }

  /**
   * Lookup addresses by postcode
   * @param {string} postcode - UK postcode to lookup
   * @returns {Promise<Array>} Array of address objects
   */
  async lookupByPostcode(postcode) {
    try {
      // Clean and format postcode
      const cleanPostcode = postcode.replace(/\s/g, '').toUpperCase()
      
      if (this.debug) {
        console.log('Looking up postcode via backend:', cleanPostcode)
      }
      
      // Call your secure backend API
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postcode: cleanPostcode })
      })
      
      const data = await response.json()
      
      if (this.debug) {
        console.log('Backend response:', data)
      }
      
      if (!response.ok) {
        throw new Error(data.error || `Backend API error: ${response.status}`)
      }
      
      if (!data.success) {
        throw new Error(data.error || 'Backend API returned unsuccessful response')
      }
      
      return data.addresses || []
      
    } catch (error) {
      console.error('Postcode lookup error:', error)
      
      // Provide user-friendly error messages
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Unable to connect to address lookup service. Please check your internet connection.')
      } else if (error.message.includes('No addresses found')) {
        throw new Error('No addresses found for this postcode. Please check the postcode and try again.')
      } else {
        throw new Error(error.message || 'Unable to lookup addresses. Please try again.')
      }
    }
  }



  /**
   * Get unique streets from a postcode
   * @param {string} postcode - UK postcode to lookup
   * @returns {Promise<Array>} Array of unique street names
   */
  async getStreetsByPostcode(postcode) {
    try {
      const addresses = await this.lookupByPostcode(postcode)
      
      // Extract unique streets
      const streets = [...new Set(addresses.map(addr => addr.street))]
        .filter(street => street && street.length > 0)
        .sort()
      
      return streets.map(street => ({
        street,
        addresses: addresses.filter(addr => addr.street === street)
      }))
      
    } catch (error) {
      throw error
    }
  }

  /**
   * Get house numbers for a specific street and postcode
   * @param {string} postcode - UK postcode
   * @param {string} street - Street name
   * @returns {Promise<Array>} Array of house numbers/names
   */
  async getHouseNumbersByStreet(postcode, street) {
    try {
      const addresses = await this.lookupByPostcode(postcode)
      
      return addresses
        .filter(addr => addr.street === street)
        .map(addr => ({
          number: addr.number,
          fullAddress: addr.fullAddress,
          addressLine1: addr.addressLine1,
          addressLine2: addr.addressLine2,
          postTown: addr.postTown,
          county: addr.county,
          postcode: addr.postcode
        }))
        .sort((a, b) => {
          // Sort numbers numerically where possible
          const numA = parseInt(a.number)
          const numB = parseInt(b.number)
          
          if (!isNaN(numA) && !isNaN(numB)) {
            return numA - numB
          }
          
          // Fallback to string comparison
          return a.number.localeCompare(b.number)
        })
      
    } catch (error) {
      throw error
    }
  }

  /**
   * Validate UK postcode format
   * @param {string} postcode - Postcode to validate
   * @returns {boolean} True if valid format
   */
  isValidPostcode(postcode) {
    const ukPostcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i
    return ukPostcodeRegex.test(postcode?.trim())
  }

  /**
   * Format postcode to standard UK format
   * @param {string} postcode - Raw postcode input
   * @returns {string} Formatted postcode
   */
  formatPostcode(postcode) {
    if (!postcode) return ''
    
    // Remove spaces and convert to uppercase
    const clean = postcode.replace(/\s/g, '').toUpperCase()
    
    // Add space before last 3 characters if not present
    if (clean.length >= 5 && clean.length <= 7) {
      return clean.slice(0, -3) + ' ' + clean.slice(-3)
    }
    
    return clean
  }
}

export const postcodeService = new PostcodeService() 