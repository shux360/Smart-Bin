import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route,Navigate  } from 'react-router-dom';
// import AddGarbageDetails from './components/Pages/AddGarbageDetails.jsx'
import Signin from './components/Pages/Signin.jsx'
import Signup from './components/Pages/Signup.jsx'
import {Button} from './components/ui/button.jsx'
import AddGarbageDetails from './components/Pages/AddGarbageDetails'
import React from 'react'
const App = () => {
  return (
    <>
      {/* <Routes>
          <Route  path="/add-garbage-details" element={<AddGarbageDetails />} />
      </Routes> */}

    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add-garbage-details" element={<AddGarbageDetails />} />
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App