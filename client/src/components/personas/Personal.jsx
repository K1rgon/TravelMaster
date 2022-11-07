import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Personal.module.css';
import image from '../../image/user.png';

export default function Personal() {
  // mok datas ============================
  const user = {
    login: 'user',
    email: 'user@mail.ru',
    password: '123',
    name: 'name',
    surname: 'surname',
    token: 'token',
    foto: image,
  };

  const routes = [{ start: '123', end: '321', id: 34 }, { start: '1234', end: '4321', id: 24 }];
  const cars = [{ mark: 'Audi', year: '2008' }];
  // ======================================

  const [userInfo, setUser] = useState(user);

  const trigerInput = () => document.querySelector('#imageFile').click();

  const inputFotoHandler = (e) => {
    const { files } = e.target;
    if (files[0].type.match('image')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUser((preMy) => ({ ...preMy, foto: ev.target.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      alert('Выбирите файл другово типа');
    }
  };

  return (
    <div className={style.block}>
      <div className={style.blockleft}>
        <img className={style.imageprofile} src={userInfo.foto || image} width="200px" height="200px" alt="Фото не удалось загрузить" />
        <input className={style.btninput} id="imageFile" type="file" accept="image/*" onChange={(e) => inputFotoHandler(e)} />
        <button className={style.btnselect} type="button" onClick={() => trigerInput()}>Загрузить новое Фото</button>
        <div className={style.userphoto} />
        <div className={style.username}>{`${userInfo.name} ${userInfo.surname}`}</div>
        <div className={style.username}>
          {' '}
          Ваша почта:
          {`${user.email}`}
        </div>
      </div>
      <div className={style.blockright}>
        <div className={style.routes}>
          Ваши маршруты
          {routes.map((rout, index) => (
            <Link className={style.rout} to={`/routes/${rout.id}`} id={index}>{`Начало маршрута : ${rout.start} , конец маршрута : ${rout.end}`}</Link>
          ))}
        </div>
        <div className={style.cars}>
          Ваш гараж
          {cars.map((car, index) => (
            <div className={style.car} id={index}>{`Марка : ${car.mark} , год выпуска : ${car.year}`}</div>
          ))}
        </div>
      </div>
    </div>

  );
}
