import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import style from './Personal.module.css';
import image from '../../image/user.png';

export default function Personal() {
  const user = useSelector((store) => store.user);
  const [userInfo, setUser] = useState(user);
  const [isShow, setIsShow] = useState(false);
  const [carInfo, setCarInfo] = useState({
    brand: '', model: '', year: '', fuel: '',
  });
  const [allCars, setAllCars] = useState([]);

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

  const getCars = async () => {
    const res = await fetch('http://localhost:3001/car/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...carInfo, id: user.id }),
    });
    const toJson = await res.json();
    console.log(toJson);
    setAllCars(toJson);
  };

  // mok datas ===========================

  const routes = [{ start: '123', end: '321', id: 34 }, { start: '1234', end: '4321', id: 24 }];
  const cars = [{ mark: 'Audi', year: '2008' }];
  // ======================================

  const trigerInput = () => document.querySelector('#imageFile').click();

  const formNewCarHandler = (e) => {
    setCarInfo((preMy) => ({ ...preMy, [e.target.name]: e.target.value }));
  };

  const formPostHandler = (e) => {
    e.preventDefault();
    getCars();
    setIsShow(false);
    console.log(carInfo);
  };

  useEffect(() => {
    getCars();
  }, []);

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
      // eslint-disable-next-line no-alert
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
          <p>Ваш гараж</p>
          <button type="button" onClick={() => setIsShow(!isShow)}>Добавить новую машину</button>
          {isShow
            ? (
              <form method="POST" id="form">
                <input onChange={(e) => formNewCarHandler(e)} placeholder="Бренд" type="text" id="brand" name="brand" />
                <input onChange={(e) => formNewCarHandler(e)} placeholder="Модель" type="text" id="model" name="model" />
                <input onChange={(e) => formNewCarHandler(e)} placeholder="Год выпуска" type="text" id="year" name="year" />
                <input onChange={(e) => formNewCarHandler(e)} placeholder="Расход топлива" type="text" id="fuel" name="fuel" />
                <button onClick={(e) => formPostHandler(e)} type="submit" form="form">Сохранить новую машину</button>
              </form>
            )
            : (
              <>
                {allCars.map((car, index) => (
                  <div className={style.car} id={index}>{`Марка : ${car.brand} Модель: ${car.model} , год выпуска : ${car.year}`}</div>
                ))}
              </>
            )}

        </div>
      </div>
    </div>

  );
}
