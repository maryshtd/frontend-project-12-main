import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import {
  Button, Form, FormControl
} from 'react-bootstrap';
import { useAuth } from '../contexts/index.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import routes from '../routes';

const Login = () => {
  const [loginError, setLoginError] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);
  
  const auth = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('username required'),
      password: Yup.string()
        .required('password required'),
    }),
    onSubmit: async (values) => {
      try {
        const result = await axios.post(
          routes.loginPath(),
          {
            username: values.username,
            password: values.password,
          }
        );
        auth.authData.logIn(result.data);
        navigate('/');
      } catch (err) {
        setLoginError(err);
        setLoginFailed(true);
        throw err;
      }
    },
  });

  return (
    <div className="container rounded w-50 my-3 p-3 bg-white">
      <div className="row">
        <h3>Login</h3>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Label htmlFor="username">Username</Form.Label>
          <FormControl
            id="username"
            name="username"
            type="text"
            placeholder="Enter username"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <Form.Label htmlFor="password">Password</Form.Label>
          <FormControl
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <Button variant="primary" type="submit">Submit</Button>
          {loginFailed && <div className="invalid-feedback d-block">{loginError.toString()}</div>}
        </Form>
      </div>
    </div>
  )
};

export default Login;