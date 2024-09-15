import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OtpAuth from './OtpAuth';
import Welcome from './Welcome';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OtpAuth />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  );
};

export default App;