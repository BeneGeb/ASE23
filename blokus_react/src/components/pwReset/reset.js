import React, { useState } from 'react';
import '../../styles/pwReset/reset.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function PasswordResetRequest() {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/password-reset-request', {
        email: email
      });
      console.log('Password reset request successful:', response.data);
    } catch (error) {
      console.error('Password reset request error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="reset-page">
      <div className="reset-container">
        <h2>PASSWORD RESET</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input className="reset-input" type="email" id="email" name="email" placeholder="EMAIL" value={email} onChange={handleChange} required />
          </div>
          <div className="submit-button-container">
                <button className="submit-button" type="submit">SEND RESET LINK</button>
          </div>
        </form>
        <br /><br />
        <Link to="/">Back to Login</Link>
      </div>
    </div>
  );
}

export default PasswordResetRequest;
