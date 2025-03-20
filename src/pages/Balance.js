import React from "react";
import "./styles.css";

const Balance = ({ balance }) => {
  return (
    <div className="container">
      <div className="card">
        <div className="card-content">
          <h2 className="card-title">💰 Account Balance</h2>
          <div className="balance-amount">${balance.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
