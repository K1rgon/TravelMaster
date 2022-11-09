/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import MapsToCard from '../Maps/MapsToCard';
import './routerItem.css';

export default function RouterItem({ id }) {
  const [points, setPoints] = useState([]);
  const [oneRoute, setOneRoute] = useState({
    title: '', description: '', start_x: '', finish_x: '', done: false, foto: '', date_start: '', date_finish: '', private: false, rating: null,
  });

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
      <div className="input_group">
        <p>
          Название маршрута:
        </p>
        <input type="text" name="title" value={oneRoute.title} onChange={inputHandler} />
        <p>
          Описание маршрута:
        </p>
        <input type="text" name="description" value={oneRoute.description} onChange={inputHandler} />
        <div className="box">
          <p>Можно ли другим пользователям видеть ваш маршрут?</p>
          <input type="checkbox" name="private" onChange={inputHandler} />
        </div>
        <div>
          <p>Дата начала поездки:</p>
          <input type="date" name="date_start" value={oneRoute.date_start} onChange={inputHandler} />
        </div>
        <div className="box">
          <p>Ваша поездка завершена?</p>
          <input type="checkbox" name="done" onChange={inputHandler} />
        </div>
        <div>
          <p>Установите дату окончания поездки</p>
          <input type="date" name="date_finish" onChange={inputHandler} />
        </div>
        <button onClick={() => clickHandler(oneRoute.id)} type="submit">Подтвердить изменения</button>
        <div>
          <p>Поделитесь впечатлениями и оставьте комментарий к поездке!</p>
          <input type="text" />
        </div>
      </div>
    </div>
  );
}
