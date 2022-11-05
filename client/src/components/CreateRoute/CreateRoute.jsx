import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Maps from '../Maps/Maps';
import style from './CreateRoute.module.css';
import { newRoute } from '../../store/route/actions';

export default function CreateRoute(props) {
  const [route, setRoute] = useState({
    title: '', description: '', date_start: '', photo: '',
  });
  const dispatch = useDispatch();

  const inputHandler = (e) => {
    setRoute((preMy) => ({ ...preMy, [e.target.name]: e.target.value }));
  };

  const addRoute = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/api/v1/routes/add', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        title: route.title,
        description: route.description,
        date_start: route.date_start,
        foto: route.photo,
      }),
      credentials: 'include',
    });
    const toJson = await res.json();
    console.log(toJson);
    dispatch(newRoute(toJson));
    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onSubmit={addRoute}
      className={style.box}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Creating new route
        </Modal.Title>

      </Modal.Header>
      <Modal.Body>
        {/* <div className={style.box}> */}
        <Form className="w-30 align-items-center m-auto pt-5">
          {/* <div className={style.map}><Maps /></div> */}

          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control onChange={(e) => inputHandler(e)} type="text" placeholder="Title your route" name="title" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control onChange={(e) => inputHandler(e)} type="text" placeholder="Your description" name="description" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Start route</Form.Label>
            <Form.Control onChange={(e) => inputHandler(e)} type="date" name="date_start" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Photo</Form.Label>
            <Form.Control onChange={(e) => inputHandler(e)} type="file" name="photo" />
          </Form.Group>
        </Form>
        {/* </div> */}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={addRoute} type="submit">Отправить</Button>
      </Modal.Footer>
    </Modal>

  );
}
