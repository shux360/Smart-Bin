import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import AddGarbageDetails from './components/Pages/AddGarbageDetails'
import React from 'react'
import Homepage from './components/Pages/Homepage'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/add-garbage-details" element={<AddGarbageDetails />} />
    </Routes>

  
  )
}

export default App