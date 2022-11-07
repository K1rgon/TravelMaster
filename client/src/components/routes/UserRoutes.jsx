/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from 'react';
import MyModal from '../MyModal/MyModal';

export default function UserRoutes() {
  const [modalActive, setModalActive] = useState(false);
  return (
    <>
      <button className="open-btn" type="submit" onClick={() => setModalActive(true)}>Моя модалочка</button>
      <MyModal active={modalActive} onHide={() => setModalActive(false)} />
    </>
  );
}
