import React from "react";
import "./styles.css";

const Holding = ({ holdings }) => {
  return (
    <div className="container">
      <div className="card">
        <div className="card-content">
          <h2 className="card-title">💼 Stock Holdings</h2>
          {holdings.length > 0 ? (
            <ul className="holdings-list">
              {holdings.map((stock, index) => (
                <li key={index} className="holding-item">
                  <span className="holding-symbol">{stock.symbol}</span>
                  <span className="holding-details">
                    {stock.shares} shares @ ${stock.price}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-holdings">No holdings found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Holding;
