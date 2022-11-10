/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { routesInit } from '../../store/route/actions';
import MyModal from '../MyModal/MyModal';
import OneRoute from '../OneRoute/OneRoute';
import './userRoutes.css';

export default function UserRoutes() {
  const [modalActive, setModalActive] = useState(false);
  const dispatch = useDispatch();
  const routes = useSelector((store) => store.route);

  useEffect(() => {
    dispatch(routesInit());
  }, []);

  return (
    <>
      <div className="create-btn">
        <button className="btn" type="submit" onClick={() => setModalActive(true)}><span>Добавить маршрут</span></button>
      </div>
      <MyModal active={modalActive} onHide={() => setModalActive(false)} />
      <div className="card-list">
        {
        routes.length > 0
          ? routes.map((el) => (
            <OneRoute key={el.id} route={el} />
          ))
          : 'Здесь будут ваши маршруты'
            }
      </div>
    </>
  );
}
