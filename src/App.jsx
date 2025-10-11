
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AuthPage from './components/Authpage';
import './App.css';
import Dashboard from './components/dashboard';

function App() {
  return (
    <BrowserRouter>     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authpage" element={<Authpage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
