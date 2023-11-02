import React, { useState } from 'react';
import '../../styles/login/login.css'

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    sessionId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
	//blabla
    console.log('Anmeldedaten:', credentials);
  };

  return (
    <div className="login-container">
      <h2>LOGIN</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input type="text" id="username" name="username" placeholder="USERNAME" value={credentials.username} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <input type="password" id="password" name="password" placeholder="PASSWORD" value={credentials.password} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <input type="text" id="sessionId" name="sessionId" placeholder="SESSIONID" value={credentials.sessionId} onChange={handleChange} required />
        </div>
        <button type="submit">START</button>
      </form>
    </div>
  );
}

export default Login;