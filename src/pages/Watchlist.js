import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./styles.css";

const Watchlist = ({ watchlist }) => {
  return (
    <div className="container">
      <Header /> {/* Added Header */}
      <div className="card">
        <div className="card-content">
          <h2 className="card-title">📊 Stock Watchlist</h2>
          {watchlist.length > 0 ? (
            <ul className="watchlist">
              {watchlist.map((stock, index) => (
                <li key={index} className="watchlist-item">{stock.symbol}</li>
              ))}
            </ul>
          ) : (
            <p className="no-watchlist">No stocks in watchlist</p>
          )}
        </div>
      </div>
      <Footer /> {/* Added Footer */}
    </div>
  );
};

export default Watchlist;
