import React from "react";

function Wireless() {
  return (
    <div className="download-grid-item">
      <div className="title-container">
        <span className="title-text">Download Wireless Sensor Data</span>
      </div>
      <div className="start-end-button-container">
        <input type="text" className="start-end-box" placeholder="Start Date" />
        <input type="text" className="start-end-box" placeholder="End Date" />
        <button className="download-button">Download</button>
      </div>
    </div>
  );
}

export default Wireless;
