import React from "react";
import "./styles.css";

const Watchlist = ({ watchlist }) => {
  return (
    <div className="container">
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
    </div>
  );
};

export default Watchlist;
