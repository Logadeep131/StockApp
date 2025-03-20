import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Watchlist from "./Watchlist";
import Holding from "./Holding";
import Balance from "./Balance";

const userId = 2; // Simulating logged-in user

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPortfolio, setShowPortfolio] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch(`http://localhost:5050/users/${userId}`);
        if (!userRes.ok) throw new Error("Failed to fetch user data");
        const user = await userRes.json();

        const holdingsRes = await fetch(`http://localhost:5050/holdings?user_id=${userId}`);
        if (!holdingsRes.ok) throw new Error("Failed to fetch holdings");
        const holdingsData = await holdingsRes.json();

        const watchlistRes = await fetch(`http://localhost:5050/watchlist?user_id=${userId}`);
        if (!watchlistRes.ok) throw new Error("Failed to fetch watchlist");
        const watchlistData = await watchlistRes.json();

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
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px", textAlign: "center" }}>
      <h2>Welcome, {userData?.name || "User"}!</h2>
      <p>Your account balance: <strong>${userData?.balance?.toLocaleString()}</strong></p>

      {/* Buttons Section */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
        <button onClick={() => setShowPortfolio(!showPortfolio)} className="dashboard-btn">
          📂 {showPortfolio ? "Hide Portfolio" : "View Portfolio"}
        </button>
        <button onClick={() => navigate("/change-password")} className="dashboard-btn">
          🔒 Change Password
        </button>
      </div>

      {/* Portfolio Section */}
      {showPortfolio && (
        <div style={{ marginTop: "20px" }}>
          <nav className="navigation">
            <button className="nav-link" onClick={() => setShowPortfolio("watchlist")}>📌 Watchlist</button>
            <button className="nav-link" onClick={() => setShowPortfolio("holding")}>📊 Holdings</button>
            <button className="nav-link" onClick={() => setShowPortfolio("balance")}>💰 Balance</button>
          </nav>

          <div className="content">
            {showPortfolio === "watchlist" && <Watchlist watchlist={watchlist} />}
            {showPortfolio === "holding" && <Holding holdings={holdings} />}
            {showPortfolio === "balance" && <Balance balance={userData?.balance || 0} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
