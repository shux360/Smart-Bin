import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import AddGarbageDetails from './components/Pages/AddGarbageDetails'

const App = () => {
  

  return (
    <>
      <Routes>
          <Route  path="/add-garbage-details" element={<AddGarbageDetails />} />
      </Routes>
     
    </>

  )
}

export default App
