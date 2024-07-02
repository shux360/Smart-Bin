import NavBar from "./components/features/NavBar";
import React from 'react';
import './App.css';
import GarbageDetails from './pages/GarbageDetails';


function App() {
  return (
    <div>
      <NavBar/>
      <GarbageDetails/>
    </div>
  )
};

export default App;
