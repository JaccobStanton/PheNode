// Loading.jsx
import React from "react";
import PheNodeLogo from "../../../assets/logo/Logo.svg";

const Loading = ({ loadingText }) => {
  return (
    <div className="loading-container">
      <div className="loading-logo-container">
        <img src={PheNodeLogo} alt="Logo" className="loading-logo" />
      </div>
      <div className="loading-text">
        {loadingText}
        <span className="dot dot1">.</span>
        <span className="dot dot2">.</span>
        <span className="dot dot3">.</span>
      </div>
    </div>
  );
};

export default Loading;
