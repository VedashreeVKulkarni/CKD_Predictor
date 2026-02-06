import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AuthPage from './components/Authpage';
import './App.css';
import Dashboard from './components/Dashboard';
import ClinicalData from './components/ClinicalData';

function App() {
  return (
    <BrowserRouter>     
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clinicaldata" element={<ClinicalData />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;