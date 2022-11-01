import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/newrout" element={<Profile />} />
      <Route path="/routes" element={<Profile />} />
    </Routes>
  );
}

export default App;
