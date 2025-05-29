import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NgoDetail from "./pages/NgoDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ngo/:id" element={<NgoDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
