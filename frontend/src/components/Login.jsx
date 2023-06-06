import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../../config';
import { useNavigate } from 'react-router';

const Login = () => {
  const [login, setLogin] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLogin((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}/users/login`, login)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.username);
        alert('Login successful');
        navigate('/home');
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert('An error occurred during login.');
        }
      });
  };

  return (
    <div className="containerLogin">
      <h2>Login</h2>
      <form id="login-form" onSubmit={handleSubmit}>
        <label htmlFor="login-username">Username</label>
        <input type="text" id="username" name="login-username" required onChange={handleChange} />
        <label htmlFor="login-password">Password:</label>
        <input type="password" id="password" name="login-password" required onChange={handleChange} />
        <input type="submit" value="Login" />

      </form>
      <div className="switch-form">
        <p>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;