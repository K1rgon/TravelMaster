/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import MapsToCard from '../Maps/MapsToCard';
import './routerItem.css';

export default function RouterItem({ id }) {
  const [points, setPoints] = useState([]);
  const [oneRoute, setOneRoute] = useState({});
  const getRoute = async () => {
    const res = await fetch(`http://localhost:3001/api/v1/routes/route/${id}`);
    const toJson = await res.json();
    setPoints([toJson.start_x, toJson.finish_x]);
    setOneRoute(toJson);
  };

  useEffect(() => {
    getRoute();
  }, []);

  console.log(oneRoute);

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
        <h1>
          Название маршрута:
          {oneRoute.title}
        </h1>
        <p>
          Описание маршрута:
          {oneRoute.description}
        </p>
        <div>
          <p>Можно ли другим пользователям видеть ваш маршрут?</p>
          <input type="checkbox" />
        </div>
        <div>
          <p>Ваша поездка завершена?</p>
          <input type="checkbox" />
          <input type="date" />
        </div>
        <div>
          <p>Поделитесь впечатлениями и оставьте комментарий к поездке!</p>
          <input type="text" />
        </div>
      </div>
    </div>
  );
}
