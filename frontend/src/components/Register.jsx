import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../../config';
import { useNavigate } from 'react-router';

const Register = () => {
  const [register, setRegister] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setRegister((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl }/users/register`, register)
      .then((res) => {
        console.log(res)
        alert('Registration successful');
        navigate('/');
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.error);
        } else {
          alert('An error occurred during registration.');
        }
      });
  };

  return (
    <div className="containerLogin">
      <h2>Sign Up</h2>
      <form id="register-form">
        <label htmlFor="username">Username</label>
        <input onChange={handleChange} type="text" id="username" name="register-username" required />
        <label htmlFor="password">Password:</label>
        <input onChange={handleChange} type="password" id="password" name="register-password" required />
        <input onClick={handleSubmit} type="submit" value="Sign up" />
      </form>
      <div className="switch-form">
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;