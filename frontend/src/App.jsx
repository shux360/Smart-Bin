import { useState } from 'react'
import React from 'react';
<<<<<<< Updated upstream
import { Routes, Route, Navigate } from 'react-router-dom';
import Map2 from './components/Pages/Map-test'
import Signin from './components/Pages/Signin';
import Signup from './components/Pages/Signup';
import AddGarbageDetails from './components/Pages/AddGarbageDetails';
import HomeLanding from './components/Pages/HomeLanding';
import Dashboard from './components/Pages/Dashboard';
=======
import { Routes, Route } from 'react-router-dom';
import AddGarbageDetails from '@/components/Pages/AddGarbageDetails';
import Map2 from '@/components/Pages/Map-test'
import Signin from '@/components/Pages/Signin';
import Signup from '@/components/Pages/Signup';
import HomeLanding from '@/components/Pages/HomeLanding';
>>>>>>> Stashed changes

const App = () => {
  return (
    <div>
      <Routes>
        <Route  path="/test/map" element={<Map2 />} />
        <Route path="/" element={<HomeLanding />} />
<<<<<<< Updated upstream
        <Route path="/signin/:role"  element={<Signin />} />
=======
        <Route path="/signin" element={<Signin />} />
>>>>>>> Stashed changes
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-garbage-details" element={<AddGarbageDetails />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
