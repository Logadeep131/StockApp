import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../pagesCss/Register.css"; 

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    dob: "",
    deposit: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseInt(formData.deposit) > 100000) {
      setMessage("Deposit amount cannot exceed ₹1,00,000");
      return;
    }
 
    const userData = {
        username: formData.username,
        password: formData.password,
        dob: formData.dob,
        deposit: parseFloat(formData.deposit) || 0 
    };
 
    try {
        const response = await axios.post("http://localhost:8080/auth/register", userData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
 
        if (response.status === 201) {
            setMessage("Registration successful! Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);
        }
    } catch (error) {
        setMessage("Error registering user.");
    }
};

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Welcome to WealthBuilder</h2>
        {message && <p className="register-message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username:</label>
            <input type="text" name="username" onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input type="password" name="password" onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Date of Birth:</label>
            <input type="date" name="dob" onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Initial Deposit:</label>
            <input type="number" name="deposit" onChange={handleChange} required />
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
        <p className="login-link">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="login-button">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
