/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../store/user/actions';
import style from './Navigation.module.css';

export default function Navigation() {
  // const login = false;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await fetch('http://localhost:3001/user/logout', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch(logout());
    navigate('/');
  };

  function goHome() {
    navigate('/');
  }

  return (
    <div className={style.navigation}>
      <div className={style.logo}>
        <img onClick={() => goHome()} role="button" tabIndex={0} src="/img/logo.png" alt="logo" style={{ height: '120px' }} />
      </div>
      <div>
        {user.login
          ? (
            <ul className={style.links}>
              <li>
                Добро пожаловать,
                {' '}
                {user.login}
              </li>
              <li>
                <Link className={style.link} to="/routes">Популярные маршруты</Link>
              </li>
              <li>
                <Link className={style.link} to="/myroutes">Мои маршруты</Link>
              </li>
              <li>
                <Link className={style.link} to="/profile">Личный кабинет</Link>
              </li>
              <li>
                <Link className={style.link} onClick={handleLogout} to="/logout">Выйти</Link>
              </li>
            </ul>
          )
          : (
            <ul className={style.links}>
              <li>
                <Link className={style.link} to="/routes">Популярные маршруты</Link>
              </li>
              <li>
                <Link className={style.link} to="/login">Войти</Link>
              </li>
            </ul>
          )}

      </div>
    </div>
  );
}
