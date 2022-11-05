import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { check } from '../../store/user/actions';

export default function Registration() {
  const [user, setUser] = useState({
    email: '', password: '', login: '', name: '', surname: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleStateUser = (e) => {
    setUser((preMy) => ({ ...preMy, [e.target.name]: e.target.value }));
  };

  const handlerBtn = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: user.login,
        email: user.email,
        password: user.password,
        name: user.name,
        surname: user.surname,
      }),
      credentials: 'include',
    });
    const toJson = await res.json();
    dispatch(check(toJson));
    navigate('/routes');
  };

  return (
    <div>
      <Form className="w-25 align-items-center m-auto pt-5">

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onChange={(e) => handleStateUser(e)} type="email" placeholder="Enter email" name="email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Login</Form.Label>
          <Form.Control onChange={(e) => handleStateUser(e)} type="text" placeholder="Enter username" name="login" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>User name</Form.Label>
          <Form.Control onChange={(e) => handleStateUser(e)} type="text" placeholder="Enter username" name="name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>User surname</Form.Label>
          <Form.Control onChange={(e) => handleStateUser(e)} type="text" placeholder="Enter username" name="surname" />
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
