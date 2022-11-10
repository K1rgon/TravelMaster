/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../store/user/actions';
import './login.css';

export default function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleStateUser = (e) => {
    setUser((preMy) => ({ ...preMy, [e.target.name]: e.target.value }));
  };

  const handlerBtn = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        }),
        credentials: 'include',
      });
      const toJson = await res.json();
      dispatch(signIn(toJson));
      navigate('/myroutes');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="block">
      <div className="input_group">
        <input onChange={(e) => handleStateUser(e)} type="email" name="email" required />
        <label>Ваш email</label>
      </div>
      <div className="input_group">
        <input onChange={(e) => handleStateUser(e)} type="password" name="password" required />
        <label>Ваш пароль</label>
      </div>
      <div className="input_group">
        <button className="btn" onClick={(e) => handlerBtn(e)} type="submit"><span>Войти</span></button>
        <button className="btn" onClick={() => navigate('/register')} type="submit"><span>Регистрация</span></button>
      </div>
    </div>
  );
}
