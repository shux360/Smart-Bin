import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import AddGarbageDetails from './components/Pages/AddGarbageDetails'
import Map2 from './components/Pages/Map-test'

const App = () => {
  

  return (
    <>
      <Routes>
          <Route  path="/add-garbage-details" element={<AddGarbageDetails />} />
          <Route  path="/test/map" element={<Map2 />} />
      </Routes>
     
    </>

  )
}

export default App
