/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { routeDelete } from '../../store/route/actions';
import './oneroute.css';

function RoutePublic({ route }) {
  return (
    <div className="card">
      <img src={route.foto || './img/alt.jpg'} alt="Ждем фото" width="300px" height="200px" />
      <h1>{route.title}</h1>
      <p className="date">Дата начала поездки:</p>
      <p className="date">
        {route?.date_start || 'дата не указана'}
      </p>
      <p>{route.description || 'описания нет'}</p>
      <p><Link to={`/publicroutes/${route.id}`}><button className="setting" type="submit">Посмотреть подробнее</button></Link></p>
    </div>
  );
}

export default RoutePublic;
