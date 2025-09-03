import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { Loader2, Search, MapPin, CheckCircle, AlertCircle } from 'lucide-react'
import { postcodeService } from '../services/postcodeService.js'

function AddressLookup({ postcode, onAddressChange, doorNumber, onDoorNumberChange }) {
  const [allAddresses, setAllAddresses] = useState([])
  const [filteredAddresses, setFilteredAddresses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasLooked, setHasLooked] = useState(false)
  const [error, setError] = useState('')

  // Auto-lookup when component mounts if postcode is provided
  useEffect(() => {
    if (postcode && postcodeService.isValidPostcode(postcode)) {
      handleLookupAddresses()
    }
  }, [postcode])

  // Filter addresses based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredAddresses(allAddresses)
    } else {
      const filtered = allAddresses.filter(address =>
        address.fullAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        address.number?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        address.street?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredAddresses(filtered)
      
      // Auto-select if only one result and user is actively searching
      if (filtered.length === 1 && searchTerm.length >= 2) {
        setTimeout(() => {
          handleAddressSelect(filtered[0])
        }, 500) // Small delay to allow user to see the single result
      }
    }
    setHighlightedIndex(-1) // Reset highlight when filtering
  }, [searchTerm, allAddresses])

  const handleLookupAddresses = async () => {
    if (!postcode) return

    setIsLoading(true)
    setError('')
    setHasLooked(false)
    setAllAddresses([])
    setFilteredAddresses([])
    setSelectedAddress(null)
    setSearchTerm('')
    setHighlightedIndex(-1)

    try {
      const addresses = await postcodeService.lookupByPostcode(postcode)
      
      if (addresses.length === 0) {
        setError('No addresses found for this postcode. Please check and try again.')
        return
      }

      // Sort addresses by number/name for better UX
      const sortedAddresses = addresses.sort((a, b) => {
        const numA = parseInt(a.number)
        const numB = parseInt(b.number)
        
        if (!isNaN(numA) && !isNaN(numB)) {
          return numA - numB
        }
        
        return (a.number || '').localeCompare(b.number || '')
      })

      setAllAddresses(sortedAddresses)
      setFilteredAddresses(sortedAddresses)
      setHasLooked(true)

      // Auto-select if only one address in the postcode
      if (sortedAddresses.length === 1) {
        setTimeout(() => {
          handleAddressSelect(sortedAddresses[0])
        }, 800) // Longer delay to show the user what happened
      }

      // If user already has a door number, try to find matching address
      if (doorNumber && sortedAddresses.length > 0) {
        const matchingAddress = sortedAddresses.find(addr => 
          addr.number?.toString().toLowerCase() === doorNumber.toLowerCase()
        )
        if (matchingAddress) {
          setSelectedAddress(matchingAddress)
          onAddressChange(matchingAddress.fullAddress)
        }
      }

    } catch (err) {
      setError(err.message || 'Failed to lookup addresses. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddressSelect = (address) => {
    setSelectedAddress(address)
    onDoorNumberChange(address.number || '')
    onAddressChange(address.fullAddress)
    setSearchTerm('') // Clear search after selection
    setHighlightedIndex(-1)
  }

  const handleSearchChange = (value) => {
    setSearchTerm(value)
    
    // Don't clear the selected address if user is just clearing the search field
    // Only clear if they haven't selected an address yet
    if (!value.trim() && !selectedAddress) {
      setSelectedAddress(null)
      onDoorNumberChange('')
      onAddressChange('')
    }
  }

  const handleKeyDown = (e) => {
    if (filteredAddresses.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev < Math.min(filteredAddresses.length - 1, 19) ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && highlightedIndex < filteredAddresses.length) {
          handleAddressSelect(filteredAddresses[highlightedIndex])
        }
        break
      case 'Escape':
        e.preventDefault()
        setHighlightedIndex(-1)
        break
    }
  }

  return (
    <div className="space-y-6">
      {/* Postcode Display and Lookup */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <div className="flex-1">
            <Label className="text-slate-800 font-semibold text-base">Postcode *</Label>
            <Input
              type="text"
              value={postcode}
              className="h-12 sm:h-14 border-2 border-slate-600 bg-slate-200/80 backdrop-blur-sm text-slate-900 font-medium"
              readOnly
            />
          </div>
          <Button
            type="button"
            onClick={handleLookupAddresses}
            disabled={isLoading || !postcodeService.isValidPostcode(postcode)}
            className="mt-3 sm:mt-6 h-12 sm:h-14 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 transition-all duration-300 ease-in-out transform sm:hover:scale-105"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Search className="h-4 w-4 mr-2" />
            )}
            {isLoading ? 'Looking up...' : 'Find Addresses'}
          </Button>
        </div>

        {/* Error Display */}
        {error && (
          <Alert className="border-red-300 bg-red-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-800 flex items-center justify-between">
              <span>{error}</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleLookupAddresses}
                className="ml-4 text-xs"
              >
                Try Again
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Success Message */}
        {hasLooked && allAddresses.length > 0 && !error && (
          <Alert className="border-green-300 bg-green-50">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription className="text-green-800">
              Found {allAddresses.length} address{allAddresses.length > 1 ? 'es' : ''} for {postcode}
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Address Search and Selection */}
      {allAddresses.length > 0 && !selectedAddress && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-slate-800 font-semibold text-base">
              Search for Your Address *
              <span className="text-slate-600 font-normal ml-2">
                ({filteredAddresses.length} of {allAddresses.length} addresses)
              </span>
            </Label>
            <div className="relative">
              <Input
                type="text"
                placeholder={allAddresses.length > 10 ? "Type house number or street name to filter..." : "Click on your address below or start typing to search..."}
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setHighlightedIndex(0)}
                className="h-12 sm:h-14 border-2 border-slate-600 bg-white/90 backdrop-blur-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-slate-900 placeholder:text-slate-500 font-medium hover:border-orange-400 hover:shadow-lg hover:bg-white/95 transition-all duration-300 ease-in-out transform sm:hover:scale-[1.02]"
                required
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            </div>
            {allAddresses.length > 5 && (
              <div className="text-xs text-slate-500 mt-1">
                💡 Use ↑↓ arrow keys to navigate, Enter to select, or click on any address
              </div>
            )}
          </div>

          {/* Address List - Show all addresses initially, or filtered results when searching */}
          {filteredAddresses.length > 0 && (
            <div className="space-y-2">
              <Label className="text-slate-800 font-semibold text-base text-sm">
                {searchTerm ? 'Matching Addresses:' : 'All Addresses:'}
              </Label>
              <div className="max-h-64 sm:max-h-80 overflow-y-auto border-2 border-slate-300 rounded-lg bg-white/90 backdrop-blur-sm">
                {filteredAddresses.slice(0, 20).map((address, index) => (
                  <button
                    key={address.id || index}
                    type="button"
                    onClick={() => handleAddressSelect(address)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onMouseLeave={() => setHighlightedIndex(-1)}
                    className={`w-full text-left p-4 hover:bg-blue-50 border-b border-slate-200 last:border-b-0 transition-all duration-200 ${
                      selectedAddress?.id === address.id ? 'bg-blue-100 border-blue-300' : ''
                    } ${highlightedIndex === index ? 'bg-blue-100 border-blue-300' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-slate-900 text-base mb-1">
                          {address.number} {address.street}
                        </div>
                        <div className="text-sm text-slate-600">
                          {address.postTown}, {address.postcode}
                        </div>
                      </div>
                      {selectedAddress?.id === address.id && (
                        <CheckCircle className="h-5 w-5 text-green-600 ml-3 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
                {filteredAddresses.length > 20 && (
                  <div className="p-3 text-center text-sm text-slate-500 bg-slate-50">
                    Showing first 20 results. Keep typing to narrow down...
                  </div>
                )}
                {allAddresses.length <= 5 && !searchTerm && (
                  <div className="p-3 text-center text-sm text-slate-500 bg-slate-50">
                    💡 Small postcode - all {allAddresses.length} addresses shown
                  </div>
                )}
              </div>
            </div>
          )}

          {/* No Results Message */}
          {searchTerm && filteredAddresses.length === 0 && (
            <Alert className="border-amber-300 bg-amber-50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-amber-800">
                No addresses match "{searchTerm}". Try searching with just the house number or street name.
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}

      {/* Selected Address Confirmation */}
      {selectedAddress && (
        <div className="p-4 bg-green-50 border-2 border-green-300 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <MapPin className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-medium text-green-900 mb-1">Selected Address:</div>
                <div className="text-green-800 text-sm sm:text-base">{selectedAddress.fullAddress}</div>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedAddress(null)
                onDoorNumberChange('')
                onAddressChange('')
                setSearchTerm('')
              }}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-2"
            >
              Change
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddressLookup 