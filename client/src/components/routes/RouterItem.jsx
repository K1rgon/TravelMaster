/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import MapsToCard from '../Maps/MapsToCard';
import './routerItem.css';

export default function RouterItem({ id }) {
  const [points, setPoints] = useState([]);
  const [oneRoute, setOneRoute] = useState({
    title: '', description: '', start_x: '', finish_x: '', done: false, foto: '', date_start: '', date_finish: '', private: false, rating: null,
  });
  const [edit, setEdit] = useState(false);

  const inputHandler = (e) => {
    setOneRoute((prev) => ({
      ...prev, [e.target.name]: e.target.value,
    }));
  };

  const clickHandler = async () => {
    const responce = await fetch(`http://localhost:3001/api/v1/routes/route/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(oneRoute),
    });
    if (responce.ok) {
      const data = await responce.json();
      setOneRoute(data);
    }
    setEdit(!edit);
  };

  const getRoute = async () => {
    const res = await fetch(`http://localhost:3001/api/v1/routes/route/${id}`);
    const toJson = await res.json();
    setPoints([toJson.start_x, toJson.finish_x]);
    setOneRoute(toJson);
  };

  useEffect(() => {
    getRoute();
  }, []);

  const sizeMap = {
    widthMap: '60vw',
    heightMap: '100vh',
    widthInput: '30vw',
    heightInput: '30vh',
  };
  return (
    <div className="box">
      <MapsToCard sizeMap={sizeMap} points={points} />
      {edit
        ? (
          <div className="container">
            <div className="input_group">
              <p className="title">
                Название маршрута:
              </p>
              <input type="text" className="standart" name="title" value={oneRoute.title} onChange={inputHandler} />
              <p className="title">
                Описание маршрута:
              </p>
              <input type="text" className="standart" name="description" value={oneRoute.description} onChange={inputHandler} />
              <div className="input_group">
                <p className="title">Можно ли другим пользователям видеть ваш маршрут?</p>
                <input type="checkbox" name="private" onChange={inputHandler} />
              </div>
              <div>
                <p className="title">Дата начала поездки:</p>
                <input type="date" name="date_start" value={oneRoute.date_start} onChange={inputHandler} />
              </div>
              {/* <div className="box">
              <p>Ваша поездка завершена?</p>
              <input type="checkbox" name="done" value={oneRoute.done} onChange={inputHandler} />
            </div> */}
              <div>
                <p className="title">Установите дату окончания поездки</p>
                <input type="date" name="date_finish" value={oneRoute.date_finish} onChange={inputHandler} min={oneRoute.date_start} />
              </div>
              <button className="btn" onClick={() => clickHandler(oneRoute.id)} type="submit"><span>Подтвердить изменения</span></button>
            </div>
            <div className="input_group">
              <h1>комментарии</h1>
              <input className="standart" type="text" />
            </div>
          </div>
        ) : (
          <div className="container">
            <button className="btn" type="submit" onClick={() => setEdit(true)}><span>Редактировать</span></button>
            <div className="input_group">
              <h1 className="title">
                Название маршрута:
              </h1>
              <p>{oneRoute.title}</p>
            </div>
            <div className="input_group">
              <h1 className="title">
                Описание маршрута:
              </h1>
              <p>{oneRoute.description}</p>
            </div>
            <div className="input_group">
              <h1 className="title">Можно ли другим пользователям видеть ваш маршрут?</h1>
              <input type="checkbox" name="private" value={oneRoute.private} checked="checked" disabled />
            </div>
            <div className="input_group">
              <h1 className="title">Дата начала поездки:</h1>
              <input type="date" className="bdate" name="date_start" value={oneRoute.date_start} disabled />
            </div>
            {/* <div className="box">
              <h1>Ваша поездка завершена?</h1>
              <input type="checkbox" name="done" value={oneRoute.done} disabled />
            </div> */}
            <div className="input_group">
              <h1 className="title">Дата окончания поездки</h1>
              <input type="date" className="bdate" name="date_finish" value={oneRoute.date_finish} disabled />
            </div>
            <div className="input_group">
              <h1>комментарии</h1>
              <input type="text" />
            </div>
          </div>
        )}
    </div>
  );
}
