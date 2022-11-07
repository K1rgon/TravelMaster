import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import Video from './components/Video/Video';
import Main from './pages/main/Main';
import Profile from './pages/profile/Profile';
import LoginPage from './pages/login/Login';
import RegisterPage from './pages/register/Register';
import Routers from './pages/routes/Routes';
import PersonalRoutes from './pages/routes/PersonalRoutes';
import Maps from './components/Maps/Maps';
import { check } from './store/user/actions';

function App() {
  const login = true;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    (async function getUser() {
      const res = await fetch('http://localhost:3001/user/check', {
        method: 'GET',
        credentials: 'include',
      });
      const toJson = await res.json();
      dispatch(check(toJson));
    }());
  }, []);

  return (
    <div>
      {user.login
        ? (
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/newrout" element={<Profile />} />
            <Route path="/routes" element={<Routers />} />
            <Route path="/map" element={<Maps />} />
            <Route path="/myroutes" element={<PersonalRoutes />} />
            <Route path="*" element={<Main />} />
          </Routes>
        )
        : (
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/routes" element={<Routers />} />
            <Route path="/map" element={<Maps />} />
            <Route path="*" element={<Main />} />
          </Routes>
        )}
    </div>
  );
}

export default App;
