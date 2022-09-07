import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import {
  Button, Form, FormControl
} from 'react-bootstrap';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: {
      username: Yup.string()
        .required('username required'),
      password: Yup.string()
        .required('password required'),
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
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
        </Form>
      </div>
    </div>
  )
};

export default Login;