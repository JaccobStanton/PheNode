import React from "react";

function WSNTitle() {
  return (
    <>
      <div className="grid-item page-title">Wireless Sensor Network</div>
      <div className="grid-item cell-wifi-last-measurements">
        <div className="imaging-measurements-box">
          <div className="imaging-last-photo">
            <span className="imaging-last-photo-text">
              Last measurements taken:
            </span>
            <span className="last-photo-date">October 31, 2022, 12:34pm</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default WSNTitle;
