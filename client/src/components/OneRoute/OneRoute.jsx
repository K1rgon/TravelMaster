/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';
import { routeDelete } from '../../store/route/actions';
import './oneroute.css';

function BasicExample({ route }) {
  const dispatch = useDispatch();

  const deleteRoute = async () => {
    dispatch(routeDelete(route.id));
  };
  return (
    <div className="card">
      <img src={route.foto} alt="Ждем фото" width="100%" />
      <h1>{route.title}</h1>
      <p className="date">Дата начала поездки:</p>
      <p className="date">
        {route?.date_start}
      </p>
      <p>{route.description}</p>
      <p><button className="setting" type="submit">Настроить маршрут</button></p>
      <p><button className="delete" onClick={deleteRoute} type="submit">Удалить маршрут</button></p>
    </div>
  );
}

export default BasicExample;
