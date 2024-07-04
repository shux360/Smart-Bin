
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signin from './components/Pages/Signin.jsx';
import Signup from './components/Pages/Signup.jsx';
import AddGarbageDetails from './components/Pages/AddGarbageDetails.jsx';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-garbage-details" element={<AddGarbageDetails />} />
      </Routes>
    </div>
  );
}

export default App;
