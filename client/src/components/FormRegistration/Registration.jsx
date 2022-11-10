/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signIn } from '../../store/user/actions';
import './registr.css';

export default function Registration() {
  const [user, setUser] = useState({
    email: '', password: '', login: '', name: '', surname: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleStateUser = (e) => {
    setUser((preMy) => ({ ...preMy, [e.target.name]: e.target.value }));
  };

  const handlerBtn = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: user.login,
        email: user.email,
        password: user.password,
        name: user.name,
        surname: user.surname,
      }),
      credentials: 'include',
    });
    const toJson = await res.json();
    dispatch(signIn(toJson));
    navigate('/profile');
  };

  return (
    <div className="block">
      <div className="input_group">
        <input onChange={(e) => handleStateUser(e)} type="email" name="email" required />
        <label>Введите email</label>
      </div>
      <div className="input_group">
        <input onChange={(e) => handleStateUser(e)} type="text" name="login" required />
        <label>Введите login</label>
      </div>
      <div className="input_group">
        <input onChange={(e) => handleStateUser(e)} type="text" name="name" required />
        <label>Введите Ваше имя</label>
      </div>
      <div className="input_group">
        <input onChange={(e) => handleStateUser(e)} type="text" name="surname" required />
        <label>Введите Вашу фамилию</label>
      </div>
      <div className="input_group">
        <input onChange={(e) => handleStateUser(e)} type="password" name="password" required />
        <label>Ваш пароль</label>
      </div>
      <div className="input_group">
        <button className="btn" onClick={(e) => handlerBtn(e)} type="submit"><span>Зарегистрироваться</span></button>
        <button className="btn" onClick={() => navigate('/login')} type="submit"><span>Войти</span></button>
      </div>
    </div>
  );
}
