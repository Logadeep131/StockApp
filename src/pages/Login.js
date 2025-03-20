import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../pagesCss/Login.css"; // Import the new CSS file

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
 
    try {
      if (credentials.username === "admin" && credentials.password === "admin") {
        setMessage("Admin login successful!");
        setTimeout(() => navigate("/admin-dashboard"), 1000); // Redirect to Admin Dashboard
        return;
      }

      const response = await axios.post("http://localhost:8080/auth/login", credentials, {
            headers: {
                "Content-Type": "application/json"
            }
        });
 
        if (response.status === 200) {
            setMessage("Login successful!");
            setTimeout(() => navigate("/dashboard"), 1000); // Redirect to Dashboard
        } else {
            setMessage("Invalid username or password.");
        }
    } catch (error) {
        setMessage("Error logging in.");
    }
};
 

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {message && <p className="login-message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>

        <p className="forgot-password">
          Forgot your password?{" "}
          <button onClick={() => navigate("/forgot-password")} className="reset-button">
            Get Password Here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
