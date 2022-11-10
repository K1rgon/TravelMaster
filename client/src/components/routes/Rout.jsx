import React, { useEffect, useState } from 'react';
import RoutePublic from '../OneRoute/OneRoutPublic';
import style from './Routes.module.css';

export default function Rout() {
  const [routes, setRoutes] = useState([]);

  const getAllRoutes = async () => {
    const res = await fetch('http://localhost:3001/api/v1/routes');
    const json = await res.json();
    setRoutes(json);
  };

  useEffect(() => {
    getAllRoutes();
  }, []);

  return (
    <div className={style.routesBlock} id="routmap">
      {routes.map((rout) => (
        <RoutePublic key={rout.id} route={rout} />
      ))}
    </div>
  );
}
