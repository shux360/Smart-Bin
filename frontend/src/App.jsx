import { useState } from 'react'
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Map2 from './components/mini-components/Map-test'
import Signin from './components/Pages/Signin';
import Signup from './components/Pages/Signup';
import AddGarbageDetails from './components/Pages/AddGarbageDetails';
import HomeLanding from './components/Pages/HomeLanding';
import Dashboard from './components/Pages/Dashboard';
import User_home from './components/Pages/User-Home';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/test/map" element={<Map2 />} />
        <Route path="/" element={<HomeLanding />} />
        <Route path="/signin/:role"  element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-garbage-details" element={<AddGarbageDetails />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="/user/home" element={<User_home />} />
      </Routes>
    </div>
  );
}

export default App;
