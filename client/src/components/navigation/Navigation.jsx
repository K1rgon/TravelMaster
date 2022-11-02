import React from 'react';
import { Link } from 'react-router-dom';
import style from './Navigation.module.css';

export default function Navigation() {
  const login = false;
  return (
    <div className={style.navigation}>
      <div className={style.logo}>
        TRAVELMASTER
      </div>
      <div>
        {login === true
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
                <Link className={style.link} to="/logout">Выйти</Link>
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
