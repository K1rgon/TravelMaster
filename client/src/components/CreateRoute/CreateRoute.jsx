import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import Maps from '../Maps/Maps';
import style from './CreateRoute.module.css';

export default function CreateRoute(props) {
  const inputHandler = () => {
    console.log(123);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Creating new route
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <div className={style.box}> */}
        <Form className="w-30 align-items-center m-auto pt-5">

          <div className={style.map}><Maps  /></div>

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
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>

  );
}
