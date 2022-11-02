import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

export default function Registration() {
  const [user, setUser] = useState({ email: '', password: '', username: '' });
  const navigate = useNavigate();

  const handleStateUser = (e) => {
    setUser((preMy) => ({ ...preMy, [e.target.name]: e.target.value }));
  };

  const handlerBtn = (e) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <div>
      <Form className="w-25 align-items-center m-auto pt-5">

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onChange={(e) => handleStateUser(e)} type="email" placeholder="Enter email" name="email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>User name</Form.Label>
          <Form.Control onChange={(e) => handleStateUser(e)} type="text" placeholder="Enter username" name="username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={(e) => handleStateUser(e)} type="password" placeholder="Password" name="password" />
        </Form.Group>

        <Button onClick={(e) => handlerBtn(e)} variant="primary" type="submit">
          Submit
        </Button>
        <Button className="m-3" onClick={() => navigate('/login')} variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}
