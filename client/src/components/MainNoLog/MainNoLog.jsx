import React from 'react';
import { Link } from 'react-router-dom';
import Video from '../Video/Video';
import style from './Main.module.css';

export default function MainNoLog() {
  return (
    <div className={style.main}>
      <div className={style.back}>
        <Video />
      </div>
      <div className={style.buttons}>
        <Link className={style.btn} to="/routes">Популярные маршруты</Link>
        <Link className={style.btn} to="/login">Войти</Link>
      </div>
    </div>
  );
}
