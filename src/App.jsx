import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AuthPage from './components/Authpage';
import './App.css';
import Dashboard from './components/dashboard';
import ClinicalData from './components/clinicaldata';

function App() {
  return (
    <BrowserRouter>     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authpage" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/clinicaldata" element={<ClinicalData />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;