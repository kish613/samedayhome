import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PropertyDetailsForm from './PropertyDetailsForm.jsx'

function ValuationPage() {
  const { postcode } = useParams()
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/')
  }

  return (
    <PropertyDetailsForm 
      postcode={decodeURIComponent(postcode)} 
      onBack={handleBack} 
    />
  )
}

export default ValuationPage 