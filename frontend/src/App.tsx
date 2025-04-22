import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import { Builder } from './pages/Builder';
import { parseXml } from './steps';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/builder" element={<Builder />} /> {/* Changed from /build to /builder to match navigation */}
      </Routes>
    </Router>
  );
}

export default App;