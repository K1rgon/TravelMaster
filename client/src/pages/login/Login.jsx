import React from 'react';
import style from './Login.module.css';

export default function Login() {
  return (
    <div>
      <form className={style.form}>
        <input className={style.input} type="email" placeholder="Почта" required />
        <input className={style.input} type="text" placeholder="пароль" required />
      </form>
    </div>
  );
}
