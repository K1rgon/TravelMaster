/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import CreateRoute from '../CreateRoute/CreateRoute';
import MyModal from '../MyModal/MyModal';

export default function UserRoutes() {
  const [modalActive, setModalActive] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Button variant="success" onClick={() => setModalShow(true)}>
        New Route
      </Button>

      <button className="open-btn" type="submit" onClick={() => setModalActive(true)}>Моя модалочка</button>

      <MyModal active={modalActive} onHide={() => setModalActive(false)} />

      <CreateRoute
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
