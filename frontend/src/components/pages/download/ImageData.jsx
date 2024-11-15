import React from "react";

function ImageData() {
  return (
    <div className="download-grid-item">
      <div className="title-container">
        <span className="title-text">Download PheNode Images</span>
      </div>
      <div className="start-end-button-container">
        <input type="text" className="start-end-box" placeholder="Start Date" />
        <input type="text" className="start-end-box" placeholder="End Date" />
        <button className="download-button">Download</button>
      </div>
    </div>
  );
}

export default ImageData;
