import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import style from './Personal.module.css';
import image from '../../image/user.png';

export default function Personal() {
  const user = useSelector((store) => store.user);
  const [userInfo, setUser] = useState(user);
  console.log(user);

  const updateUser = async (data) => {
    const res = await fetch('http://localhost:3001/user/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: user.id,
        foto: data,
      }),
      credentials: 'include',
    });
    const toJson = await res.json();
  };

  // mok datas ===========================

  const routes = [{ start: '123', end: '321', id: 34 }, { start: '1234', end: '4321', id: 24 }];
  const cars = [{ mark: 'Audi', year: '2008' }];
  // ======================================

  const trigerInput = () => document.querySelector('#imageFile').click();

  const inputFotoHandler = (e) => {
    const { files } = e.target;
    if (files[0].type.match('image')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUser((preMy) => ({ ...preMy, foto: ev.target.result }));
        updateUser(ev.target.result);
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
          <button type="button">Добавить новую машину</button>
          Ваш гараж
          {cars.map((car, index) => (
            <div className={style.car} id={index}>{`Марка : ${car.mark} , год выпуска : ${car.year}`}</div>
          ))}
        </div>
      </div>
    </div>

  );
}
