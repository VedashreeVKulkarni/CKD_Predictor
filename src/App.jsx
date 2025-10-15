import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AuthPage from "./components/Authpage";
import Dashboard from "./components/dashboard";
import "./App.css";
import Data from "./components/Data";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authpage" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/data" element={<Data />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
