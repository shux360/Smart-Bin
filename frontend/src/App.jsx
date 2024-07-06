import { useState } from 'react'
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Map2 from './components/Pages/Map-test'
import Signin from './components/Pages/Signin';
import Signup from './components/Pages/Signup';
import AddGarbageDetails from './components/Pages/AddGarbageDetails';
import Dashboard from './components/Pages/Dashboard';
import LandPage from '@/components/component/land-page';
import SetLocation from './components/Pages/SetLocation';

const App = () => {
  return (
    <div>
      <Routes>
        <Route  path="/test/map" element={<Map2 />} />
        <Route path="/" element={<LandPage/>} />
        <Route path="/signin/:role"  element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-garbage-details" element={<AddGarbageDetails />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="/set-location" element={<SetLocation />} />
      </Routes>
    </div>
  );
}

export default App;