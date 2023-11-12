import React, { useState } from 'react';
import '../../styles/login/login.css';
import axios from 'axios';

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000', { //change later
        username: credentials.username,
        password: credentials.password
      });
      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input className="login-input" type="text" id="username" name="username" placeholder="USERNAME" value={credentials.username} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <input className="login-input" type="password" id="password" name="password" placeholder="PASSWORD" value={credentials.password} onChange={handleChange} required />
          </div>
          <button className="submit-button" type="submit">START</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
