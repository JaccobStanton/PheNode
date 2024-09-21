import React from "react";
import Logo from "../assets/logo/Logo.svg";
import "../styles/Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <img src={Logo} alt="Logo" className="logo-svg" />
        <div className="login-inner-box">
          <form className="login-form">
            <div className="form-group">
              <label htmlFor="username">Enter Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Enter Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
        <div className="login-footer-text">
          <p>©2024 Donald Danforth Plant Science Center</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
