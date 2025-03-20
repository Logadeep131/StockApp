import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../pagesCss/ForgotPassword.css"; // Import the new CSS file

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    username: "",
    dob: "",
    newPassword: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      const response = await axios.post("http://localhost:8080/auth/forgot-password", {
        username: formData.username,
        dob: formData.dob,
      });
 
      if (response.data.password) {
        setMessage(`Your password is: ${response.data.password}`);
      } else {
        setMessage("Password shown successfully!");
      }
 
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      // If the response contains an error object, extract its message
      setMessage(error.response?.data?.error || "Error displaying password.");
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h2>Get Your Password</h2>
        {message && <p className="forgot-message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username:</label>
            <input type="text" name="username" onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Date of Birth:</label>
            <input type="date" name="dob" onChange={handleChange} required />
          </div>
          
          <button type="submit" className="forgot-button">Show Password</button>
        </form>
        <p className="back-to-login">
          Remember your password?{" "}
          <button onClick={() => navigate("/login")} className="login-button">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
