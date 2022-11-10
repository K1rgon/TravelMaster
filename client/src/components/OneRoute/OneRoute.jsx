/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { routeDelete } from '../../store/route/actions';
import './oneroute.css';
// import image from '../../../public/img/alt';

function BasicExample({ route }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteRoute = async () => {
    dispatch(routeDelete(route.id));
  };
  return (
    <div className="card">
      <img src={route.foto || './img/alt.jpg'} alt="Ждем фото" width="300px" height="200px" />
      <h1>{route.title}</h1>
      <p className="date">Дата начала поездки:</p>
      <p className="date">
        {route?.date_start || 'дата не указана'}
      </p>
      <p>{route.description || 'описания нет'}</p>
      <div>
        <p><Link to={`/myroutes/${route.id}`}><button className="setting" type="submit">Настроить маршрут</button></Link></p>
        <p><button className="delete" onClick={deleteRoute} type="submit">Удалить маршрут</button></p>
      </div>
    </div>
  );
}

export default BasicExample;
