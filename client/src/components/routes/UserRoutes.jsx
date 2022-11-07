/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { routesInit } from '../../store/route/actions';
import MyModal from '../MyModal/MyModal';

export default function UserRoutes() {
  const [modalActive, setModalActive] = useState(false);
  const dispatch = useDispatch();
  const routes = useSelector((store) => store.route);

  useEffect(() => {
    dispatch(routesInit());
  }, []);
  return (
    <>
      <button className="open-btn" type="submit" onClick={() => setModalActive(true)}>Моя модалочка</button>
      <MyModal active={modalActive} onHide={() => setModalActive(false)} />
    </>
  );
}
