import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/logo/Logo.svg";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate(); // useNavigate hook for navigation
  const { login, loading, error, accessToken } = useAuth(); // Destructure the login function and accessToken from useAuth
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    // Attempt to login using the useAuth hook
    await login(username, password);

    // Show error as alert popup if it exists
    if (error) {
      window.alert(error);
    }
  };

  // Use useEffect to navigate to the home page only when the accessToken is available and no error
  useEffect(() => {
    if (accessToken && !error) {
      navigate("/home"); // Navigate to the homepage on successful login
    }
  }, [accessToken, error, navigate]);

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={Logo} alt="Logo" className="logo-svg" />
        <div className="login-inner-box">
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Enter Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Update username state
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Enter Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
                required
              />
            </div>
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
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
