import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/Admindashboard";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Watchlist from "./pages/Watchlist";
import Holding from "./pages/Holding";
import Balance from "./pages/Balance";

const userId = 2;

const App = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5050/users/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user data");
        return res.json();
      })
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>

      <div className="app-container">
        <Header />
        <nav className="navigation">
          <Link to="/watchlist" className="nav-link">Watchlist</Link>
          <Link to="/holding" className="nav-link">Holding</Link>
          <Link to="/balance" className="nav-link">Balance</Link>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/watchlist" element={<Watchlist watchlist={userData?.watchlist || []} />} />
            <Route path="/holding" element={<Holding holdings={userData?.holdings || []} />} />
            <Route path="/balance" element={<Balance balance={userData?.balance || 0} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
