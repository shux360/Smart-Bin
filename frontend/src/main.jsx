import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import GarbageDetails from './pages/GarbageDetails';
import App from './App';


  <Routes path = "/" element = {<App/>}>
    <Route  path="add-garbage-details" element={<GarbageDetails />} />
  </Routes>