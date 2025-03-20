import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/Admindashboard";

import Watchlist from "./pages/Watchlist";
import Holding from "./pages/Holding";
import Balance from "./pages/Balance";

const userId = 2;

const App = () => {
  const [userData, setUserData] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userRes = await fetch(`http://localhost:5050/users/${userId}`);
        if (!userRes.ok) throw new Error("Failed to fetch user data");
        const user = await userRes.json();

        // Fetch holdings
        const holdingsRes = await fetch(`http://localhost:5050/holdings?user_id=${userId}`);
        if (!holdingsRes.ok) throw new Error("Failed to fetch holdings");
        const holdingsData = await holdingsRes.json();

        // Fetch watchlist
        const watchlistRes = await fetch(`http://localhost:5050/watchlist?user_id=${userId}`);
        if (!watchlistRes.ok) throw new Error("Failed to fetch watchlist");
        const watchlistData = await watchlistRes.json();

        // Set state
        setUserData(user);
        setHoldings(holdingsData);
        setWatchlist(watchlistData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Router>
   

      {/* Authentication & Dashboard Routes */}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>

      {/* Navigation */}
      <nav className="navigation">
        <Link to="/watchlist" className="nav-link">Watchlist</Link>
        <Link to="/holding" className="nav-link">Holding</Link>
        <Link to="/balance" className="nav-link">Balance</Link>
      </nav>

      {/* Main Content */}
      <div className="content">
        <Routes>
          <Route path="/watchlist" element={<Watchlist watchlist={watchlist} />} />
          <Route path="/holding" element={<Holding holdings={holdings} />} />
          <Route path="/balance" element={<Balance balance={userData?.balance || 0} />} />
        </Routes>
      </div>

   
    </Router>
  );
};

export default App;
