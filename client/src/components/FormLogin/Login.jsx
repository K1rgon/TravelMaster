import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../store/user/actions';

export default function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleStateUser = (e) => {
    setUser((preMy) => ({ ...preMy, [e.target.name]: e.target.value }));
  };

  const handlerBtn = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        }),
        credentials: 'include',
      });
      const toJson = await res.json();
      console.log('iz logina', toJson);
      dispatch(signIn(toJson));
      navigate('/routes');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form className="w-25 align-items-center m-auto pt-5">

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onChange={(e) => handleStateUser(e)} type="email" placeholder="Enter email" name="email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={(e) => handleStateUser(e)} type="password" placeholder="Password" name="password" />
        </Form.Group>

        <Button onClick={(e) => handlerBtn(e)} variant="primary" type="submit">
          Submit
        </Button>
        <Button className="m-3" onClick={() => navigate('/register')} variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}
