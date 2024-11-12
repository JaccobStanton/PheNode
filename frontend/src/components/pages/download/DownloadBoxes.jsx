import React from "react";
import EnvData from "./EnvData";

function DownloadBoxes() {
  return (
    <div className="download-grid-container">
      <EnvData />
      <div className="download-grid-item">
        <div className="title-container">
          <span className="title-text">Download PheNode Images</span>
        </div>
        <div className="start-end-button-container">
          <input
            type="text"
            className="start-end-box"
            placeholder="Start Date"
          />
          <input type="text" className="start-end-box" placeholder="End Date" />
          <button className="download-button">Download</button>
        </div>
      </div>
      <div className="download-grid-item">
        <div className="title-container">
          <span className="title-text">Download System Diagnostics Data</span>
        </div>
        <div className="start-end-button-container">
          <input
            type="text"
            className="start-end-box"
            placeholder="Start Date"
          />
          <input type="text" className="start-end-box" placeholder="End Date" />
          <button className="download-button">Download</button>
        </div>
      </div>
      <div className="download-grid-item">
        <div className="title-container">
          <span className="title-text">Download Wireless Sensor Data</span>
        </div>
        <div className="start-end-button-container">
          <input
            type="text"
            className="start-end-box"
            placeholder="Start Date"
          />
          <input type="text" className="start-end-box" placeholder="End Date" />
          <button className="download-button">Download</button>
        </div>
      </div>
      <div className="download-grid-item">
        <div className="title-container">
          <span className="title-text">Download All Data</span>
        </div>
        <div className="start-end-button-container">
          <input
            type="text"
            className="start-end-box"
            placeholder="Start Date"
          />
          <input type="text" className="start-end-box" placeholder="End Date" />
          <button className="download-button">Download</button>
        </div>
      </div>
    </div>
  );
}

export default DownloadBoxes;
