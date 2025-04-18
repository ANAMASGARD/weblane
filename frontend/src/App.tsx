import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // Import the updated LandingPage
import { Builder } from './pages/Builder';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Set LandingPage as the root */} 
        <Route path="/build" element={<Builder />} /> {/* Keep Builder route */} 
      </Routes>
    </Router>
  );
}

export default App;