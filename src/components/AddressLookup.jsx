import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { Loader2, Search, MapPin, CheckCircle, AlertCircle } from 'lucide-react'
import { postcodeService } from '../services/postcodeService.js'

function AddressLookup({ postcode, onAddressChange, doorNumber, onDoorNumberChange }) {
  const [streets, setStreets] = useState([])
  const [selectedStreet, setSelectedStreet] = useState('')
  const [houseNumbers, setHouseNumbers] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasLooked, setHasLooked] = useState(false)
  const [error, setError] = useState('')

  // Auto-lookup when component mounts if postcode is provided
  useEffect(() => {
    if (postcode && postcodeService.isValidPostcode(postcode)) {
      handleLookupStreets()
    }
  }, [postcode])

  const handleLookupStreets = async () => {
    if (!postcode) return

    setIsLoading(true)
    setError('')
    setHasLooked(false)
    setStreets([])
    setSelectedStreet('')
    setHouseNumbers([])
    setSelectedAddress(null)

    try {
      const streetData = await postcodeService.getStreetsByPostcode(postcode)
      
      if (streetData.length === 0) {
        setError('No addresses found for this postcode. Please check and try again.')
        return
      }

      setStreets(streetData)
      setHasLooked(true)

      // If only one street, auto-select it
      if (streetData.length === 1) {
        handleStreetSelect(streetData[0].street)
      }

    } catch (err) {
      setError(err.message || 'Failed to lookup addresses. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleStreetSelect = async (streetName) => {
    setSelectedStreet(streetName)
    setIsLoading(true)
    setError('')
    setHouseNumbers([])
    setSelectedAddress(null)

    try {
      const numbers = await postcodeService.getHouseNumbersByStreet(postcode, streetName)
      setHouseNumbers(numbers)

      // If user already entered a door number, try to find matching address
      if (doorNumber && numbers.length > 0) {
        const matchingAddress = numbers.find(addr => 
          addr.number?.toString().toLowerCase() === doorNumber.toLowerCase()
        )
        if (matchingAddress) {
          setSelectedAddress(matchingAddress)
          onAddressChange(matchingAddress.fullAddress)
        }
      }

    } catch (err) {
      setError(err.message || 'Failed to load house numbers.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDoorNumberChange = (value) => {
    onDoorNumberChange(value)
    
    // Try to find matching address in current house numbers
    if (selectedStreet && houseNumbers.length > 0) {
      const matchingAddress = houseNumbers.find(addr => 
        addr.number?.toString().toLowerCase() === value.toLowerCase()
      )
      
      if (matchingAddress) {
        setSelectedAddress(matchingAddress)
        onAddressChange(matchingAddress.fullAddress)
      } else {
        setSelectedAddress(null)
        // Construct address manually if no exact match
        const manualAddress = `${value} ${selectedStreet}, ${houseNumbers[0]?.postTown || ''}, ${houseNumbers[0]?.postcode || postcode}`
        onAddressChange(manualAddress)
      }
    }
  }

  const handleAddressSelect = (address) => {
    setSelectedAddress(address)
    onDoorNumberChange(address.number)
    onAddressChange(address.fullAddress)
  }

  return (
    <div className="space-y-6">
      {/* Postcode Display and Lookup */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Label className="text-slate-800 font-semibold text-base">Postcode *</Label>
            <Input
              type="text"
              value={postcode}
              className="h-14 border-2 border-slate-600 bg-slate-200/80 backdrop-blur-sm text-slate-900 font-medium"
              readOnly
            />
          </div>
          <Button
            type="button"
            onClick={handleLookupStreets}
            disabled={isLoading || !postcodeService.isValidPostcode(postcode)}
            className="mt-6 h-14 bg-blue-600 hover:bg-blue-700 text-white px-6 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Search className="h-4 w-4 mr-2" />
            )}
            {isLoading ? 'Looking up...' : 'Find Streets'}
          </Button>
        </div>

        {/* Error Display */}
        {error && (
          <Alert className="border-red-300 bg-red-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {/* Success Message */}
        {hasLooked && streets.length > 0 && !error && (
          <Alert className="border-green-300 bg-green-50">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription className="text-green-800">
              Found {streets.length} street{streets.length > 1 ? 's' : ''} for {postcode}
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Street Selection */}
      {streets.length > 0 && (
        <div className="space-y-2">
          <Label className="text-slate-800 font-semibold text-base">
            Select Your Street * 
            <span className="text-slate-600 font-normal ml-2">
              ({streets.length} option{streets.length > 1 ? 's' : ''} found)
            </span>
          </Label>
          <Select value={selectedStreet} onValueChange={handleStreetSelect}>
            <SelectTrigger className="h-14 border-2 border-slate-600 bg-white/90 backdrop-blur-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 font-medium hover:border-blue-400 hover:shadow-lg hover:bg-white/95 transition-all duration-300 ease-in-out transform hover:scale-[1.02]">
              <SelectValue placeholder="Choose your street..." />
            </SelectTrigger>
            <SelectContent className="bg-white/95 backdrop-blur-md border-2 border-slate-300 max-h-60">
              {streets.map((streetData) => (
                <SelectItem 
                  key={streetData.street} 
                  value={streetData.street}
                  className="hover:bg-blue-50"
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{streetData.street}</span>
                    <span className="text-xs text-slate-500 ml-2">
                      ({streetData.addresses.length} properties)
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* House Number Input */}
      {selectedStreet && (
        <div className="space-y-2">
          <Label className="text-slate-800 font-semibold text-base">
            Property Number/Name *
            {houseNumbers.length > 0 && (
              <span className="text-slate-600 font-normal ml-2">
                ({houseNumbers.length} properties on this street)
              </span>
            )}
          </Label>
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="e.g. 42, 42A, Flat 1, The Cottage"
              value={doorNumber}
              onChange={(e) => handleDoorNumberChange(e.target.value)}
              className="h-14 border-2 border-slate-600 bg-white/90 backdrop-blur-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-slate-900 placeholder:text-slate-500 font-medium hover:border-orange-400 hover:shadow-lg hover:bg-white/95 transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
              required
            />
            {isLoading && selectedStreet && (
              <div className="flex items-center justify-center w-14">
                <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* House Number Suggestions */}
      {houseNumbers.length > 0 && doorNumber && (
        <div className="space-y-2">
          <Label className="text-slate-800 font-semibold text-base text-sm">
            Did you mean one of these?
          </Label>
          <div className="max-h-48 overflow-y-auto border border-slate-300 rounded-lg bg-white/90">
            {houseNumbers
              .filter(addr => 
                addr.number?.toString().toLowerCase().includes(doorNumber.toLowerCase())
              )
              .slice(0, 10)
              .map((address, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleAddressSelect(address)}
                  className={`w-full text-left p-3 hover:bg-blue-50 border-b border-slate-200 last:border-b-0 transition-colors ${
                    selectedAddress?.number === address.number ? 'bg-blue-100 border-blue-300' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900">{address.number} {selectedStreet}</div>
                      <div className="text-sm text-slate-600">{address.postTown}, {address.postcode}</div>
                    </div>
                    {selectedAddress?.number === address.number && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Full Address Display */}
      {selectedAddress && (
        <div className="p-4 bg-green-50 border border-green-300 rounded-lg">
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <div className="font-medium text-green-900">Selected Address:</div>
              <div className="text-green-800">{selectedAddress.fullAddress}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddressLookup 