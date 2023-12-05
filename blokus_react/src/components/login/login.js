import React, { useState } from 'react';
import '../../styles/login/login.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
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
      const response = await axios.post('http://localhost:8000/api/login', {
        email: credentials.email,
        password: credentials.password
      });
      console.log('Login successful:', response.data);
      navigate('/gamepage');
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
            <input className="login-input" type="email" id="email" name="email" placeholder="EMAIL" value={credentials.email} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <input className="login-input" type="password" id="password" name="password" placeholder="PASSWORD" value={credentials.password} onChange={handleChange} required />
          </div>
          <div className="submit-button-container">
                <button className="submit-button" type="submit">LOGIN</button>
          </div>
        </form>
        <br /><br />
        <Link to="/register">Noch nicht registriert?</Link>
      </div>
    </div>
  );
}

export default Login;