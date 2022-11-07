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
    const res = await fetch('http://localhost:3001/user/logout', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className={style.navigation}>
      <div className={style.logo}>
        TRAVELMASTER
      </div>
      <div>
        {user.login
          ? (
            <ul className={style.links}>
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
                <Link className={style.link} to="/map">Карта</Link>
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
