import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage.jsx'
import ValuationPage from './components/ValuationPage.jsx'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/valuation/:postcode" element={<ValuationPage />} />
    </Routes>
  )
}

export default App

