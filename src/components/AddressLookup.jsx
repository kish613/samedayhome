import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { Loader2, MapPin, CheckCircle, AlertCircle } from 'lucide-react'
import { postcodeService } from '../services/postcodeService.js'

function AddressLookup({ postcode, onAddressChange, doorNumber, onDoorNumberChange }) {
  const [addresses, setAddresses] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Auto-lookup when postcode changes
  useEffect(() => {
    if (postcode && postcodeService.isValidPostcode(postcode)) {
      handleLookupAddresses()
    } else {
      // Clear addresses if postcode is invalid or empty
      setAddresses([])
      setSelectedAddress(null)
      setError('')
    }
  }, [postcode])

  const handleLookupAddresses = async () => {
    if (!postcode) return

    setIsLoading(true)
    setError('')
    setAddresses([])
    setSelectedAddress(null)

    try {
      const addressList = await postcodeService.lookupByPostcode(postcode)
      
      if (addressList.length === 0) {
        setError('No addresses found for this postcode.')
        return
      }

      // Sort addresses by number for better UX
      const sortedAddresses = addressList.sort((a, b) => {
        const numA = parseInt(a.number)
        const numB = parseInt(b.number)
        
        if (!isNaN(numA) && !isNaN(numB)) {
          return numA - numB
        }
        
        return (a.number || '').localeCompare(b.number || '')
      })

      setAddresses(sortedAddresses)

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
  }

  return (
    <div className="space-y-4">
      {/* Postcode Display */}
      <div>
        <Label className="text-slate-800 font-semibold text-base">Postcode *</Label>
        <Input
          type="text"
          value={postcode}
          className="h-12 sm:h-14 border-2 border-slate-600 bg-slate-200/80 backdrop-blur-sm text-slate-900 font-medium"
          readOnly
        />
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center p-4">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span className="text-slate-600">Loading addresses...</span>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <Alert className="border-red-300 bg-red-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-red-800">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Address List - Simple clickable list */}
      {addresses.length > 0 && (
        <div className="space-y-2">
          <Label className="text-slate-800 font-semibold text-base">
            Select Your Address * ({addresses.length} found)
          </Label>
          <div className="max-h-64 overflow-y-auto border-2 border-slate-300 rounded-lg bg-white">
            {addresses.map((address, index) => (
              <button
                key={address.id || index}
                type="button"
                onClick={() => handleAddressSelect(address)}
                className={`w-full text-left p-3 hover:bg-blue-50 border-b border-slate-200 last:border-b-0 transition-colors ${
                  selectedAddress?.id === address.id ? 'bg-blue-100 border-blue-300' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">
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
          </div>
        </div>
      )}

      {/* Selected Address Confirmation */}
      {selectedAddress && (
        <div className="p-4 bg-green-50 border-2 border-green-300 rounded-lg">
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="font-medium text-green-900 mb-1">Selected Address:</div>
              <div className="text-green-800">{selectedAddress.fullAddress}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddressLookup 