import React from "react";
import { NavLink } from "react-router-dom";

const SucessOrder = () => {
  return (
    <>
      <div classNameName="container">
        <div className="funds-success-message-container">
          <div className="funds-checkmark-text-container">
            <div className="funds-checkmark-container">
              <svg
                className="funds-checkmark"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
              >
                <circle
                  className="funds-checkmark-circle"
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />
                <path
                  className="funds-checkmark-check"
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>

              <div className="funds-display-on-ie">
                <svg
                  className="funds-ie-checkmark"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                >
                  <circle
                    className="funds-ie-checkmark-circle"
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                  />
                  <path
                    className="funds-ie-checkmark-check"
                    fill="none"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  />
                </svg>
              </div>
            </div>

            <h1 className="funds-success-done-text">
              Your Order has been successfully placed!
            </h1>
          </div>

          <div className="funds-success-message">
            <p>
              <NavLink to="/orders">View Order</NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SucessOrder;
