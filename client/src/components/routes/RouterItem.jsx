/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MapsToCard from '../Maps/MapsToCard';

export default function RouterItem({ id }) {
  const routes = useSelector((store) => store.route);
  const [points, setPoints] = useState([]);

  const getRoute = async () => {
    const res = await fetch(`http://localhost:3001/api/v1/routes/route/${id}`);
    const toJson = await res.json();
    setPoints([toJson.start_x, toJson.finish_x]);
  };

  useEffect(() => {
    getRoute();
  }, []);

  const sizeMap = {
    widthMap: '85vw',
    heightMap: '55vh',
    widthInput: '85vw',
    heightInput: '55vh',
  };
  return (
    <MapsToCard sizeMap={sizeMap} points={points} />

  );
}
