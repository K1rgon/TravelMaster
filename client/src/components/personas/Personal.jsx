import React from 'react';
import style from './Personal.module.css';
import image from '../../image/user.png';

export default function Personal() {
  const user = {
    login: 'user',
    email: 'user@mail.ru',
    password: '123',
    name: 'name',
    surname: 'surname',
    token: 'token',
    foto: image,
  };

  const routes = [{ start: '123', end: '321' }, { start: '1234', end: '4321' }];
  const cars = [{ mark: 'audi', year: '2008' }];

  return (
    <div className={style.block}>
      <div className={style.blockleft}>
        <img src={user.foto} width="200px" height="200px" alt="Фото не удалось загрузить" />
        <div className={style.userphoto} />
        <div className={style.username}>{`${user.name} ${user.surname}`}</div>
        <div className={style.username}>{`${user.email}`}</div>
      </div>
      <div className={style.blockright}>
        <div className={style.routes}>
          Ваши маршруты
          {routes.map((rout, index) => (
            <div id={index}>{`Начало маршрута :${rout.start} , конец маршрута : ${rout.end}`}</div>
          ))}
        </div>
        <div className={style.cars}>
          Ваш гараж
          {cars.map((car, index) => (
            <div id={index}>{`Марка :${car.mark} , год выпуска : ${car.year}`}</div>
          ))}
        </div>
      </div>
    </div>

  );
}
