import React, { useState } from "react";
import "../../styles/register/register.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/register/", {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      });
      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (error) {
      console.error(
        "Registration error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>REGISTER</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              className="register-input"
              type="text"
              id="name"
              name="name"
              placeholder="NAME"
              value={credentials.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              className="register-input"
              type="email"
              id="email"
              name="email"
              placeholder="EMAIL"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              className="register-input"
              type="password"
              id="password"
              name="password"
              placeholder="PASSWORD"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="submit-button-container">
            <button className="submit-button" type="submit">
              REGISTER
            </button>
          </div>
        </form>
        <br />
        <br />
        <Link to="/login">Bereits registriert? Zurück zum Login</Link>
      </div>
    </div>
  );
}

export default Register;
