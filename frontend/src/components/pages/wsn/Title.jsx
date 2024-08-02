import React from "react";

function WSNTitle() {
  return (
    <>
      <div className="grid-item page-title">Wireless Sensor Network</div>
      <div className="grid-item cell-wifi-last-measurements">
        <div className="box">
          <div className="last-measurement">
            <span className="last-measurement-text">
              Last measurements taken:
            </span>
            <span className="measurement-date">October 31, 2022, 12:34pm</span>
          </div>
          <div className="bottom-box">
            <div className="wifi-container">
              <span className="wifi-text">WiFi: </span>
              <div className="signal-blocks">
                <div className="signal-block"></div>
                <div className="signal-block"></div>
                <div className="signal-block"></div>
                <div className="signal-block"></div>
              </div>
            </div>
            <div className="cellular-container">
              <span className="cellular-text">Cellular: </span>
              <div className="signal-blocks">
                <div className="signal-block"></div>
                <div className="signal-block"></div>
                <div className="signal-block"></div>
                <div className="signal-block"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WSNTitle;
