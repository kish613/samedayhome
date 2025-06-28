import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage.jsx'
import LondonLandingPage from './components/LondonLandingPage.jsx'
import ManchesterLandingPage from './components/ManchesterLandingPage.jsx'
import BirminghamLandingPage from './components/BirminghamLandingPage.jsx'
import LiverpoolLandingPage from './components/LiverpoolLandingPage.jsx'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/london" element={<LondonLandingPage />} />
      <Route path="/manchester" element={<ManchesterLandingPage />} />
      <Route path="/birmingham" element={<BirminghamLandingPage />} />
      <Route path="/liverpool" element={<LiverpoolLandingPage />} />
    </Routes>
  )
}

export default App

