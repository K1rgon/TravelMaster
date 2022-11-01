import React from 'react';
import { Link } from 'react-router-dom';
import style from './Navigation.module.css';

export default function Navigation() {
  return (
    <div className={style.navigation}>
      <div className={style.logo}>
        TRAVELMASTER
      </div>
      <div>
        <ul className={style.links}>
          <li>
            <Link className={style.link} to="/xxxx">Популярные маршруты</Link>
          </li>
          <li>
            <Link className={style.link} to="/xxx">Мои маршруты</Link>
          </li>
          <li>
            <Link className={style.link} to="/xx">Личный кабинет</Link>
          </li>
          <li>
            <Link className={style.link} to="/x">Выйти</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
