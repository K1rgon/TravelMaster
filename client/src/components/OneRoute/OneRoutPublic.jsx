/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { routeDelete } from '../../store/route/actions';
import './oneroute.css';

function RoutePublic({ route }) {
  return (
    <div className="card">
      <img src={route.foto} alt="Ждем фото" width="100%" />
      <h1>{route.title}</h1>
      <p className="date">Дата начала поездки:</p>
      <p className="date">
        {route?.date_start}
      </p>
      <p>{route.description}</p>
      <p><Link to={`/publicroutes/${route.id}`}><button className="setting" type="submit">Посмотреть подробнее</button></Link></p>
    </div>
  );
}

export default RoutePublic;
