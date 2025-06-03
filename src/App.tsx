import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard';
import EnterPhoneNumber from './pages/PhoneNumber';
import OTPScreen from './pages/otpScreens';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<EnterPhoneNumber />} />
      <Route path="/OTPScreen" element={<OTPScreen />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
  );
}

export default App;
