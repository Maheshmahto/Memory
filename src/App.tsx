import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Birthday from './pages/Birthday';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Default route can be / or redirect to /memories */}
        <Route path="/" element={<Navigate to="/memories" />} />
        <Route path="/memories" element={<Home />} />
        <Route path="/birthday" element={<Birthday />} />
        {/* Optional 404 fallback */}
        <Route path="*" element={<div className="p-8 text-center text-xl text-red-600">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
