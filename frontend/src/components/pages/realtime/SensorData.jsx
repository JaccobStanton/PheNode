import React from "react";
import "../../../styles/Realtime.css";

function SensorData() {
  return (
    <>
      <div className="data-value-boxes-container">
        <div className="grid-item data-value-boxes">
          <div className="data-text-container">
            <div className="left-column">
              <p>Temperature:</p>
              <p>Humidity:</p>
              <p>Air Pressure:</p>
              <p>Sensor Status:</p>
            </div>
            <div className="right-column">
              <p>68.7 F</p>
              <p>12%</p>
              <p>19 kPa</p>
              <p>Operational</p>
            </div>
          </div>
        </div>
        <div className="grid-item data-value-boxes">
          <div className="data-text-container">
            <div className="left-column">
              <p>Hourly Rainfall:</p>
              <p>Today's Rainfall:</p>
              <p>Solar Radiation:</p>
              <p>Sensor Status:</p>
            </div>
            <div className="right-column">
              <p>68.7 F</p>
              <p>12%</p>
              <p>19 kPa</p>
              <p>Operational</p>
            </div>
          </div>
        </div>
        <div className="grid-item data-value-boxes">
          <div className="data-text-container">
            <div className="left-column">
              <p>Soil Moisture:</p>
              <p>Soil Temp:</p>
              <p>Soil Salinity:</p>
              <p>Sensor Status:</p>
            </div>
            <div className="right-column">
              <p>68.7 F</p>
              <p>12%</p>
              <p>19 kPa</p>
              <p>Operational</p>
            </div>
          </div>
        </div>
        <div className="grid-item data-value-boxes">
          <div className="data-text-container">
            <div className="left-column">
              <p>Wind Speed:</p>
              <p>Wind Gust:</p>
              <p>Wind Direction:</p>
              <p>Sensor Status:</p>
            </div>
            <div className="right-column">
              <p>68.7 F</p>
              <p>12%</p>
              <p>19 kPa</p>
              <p>Operational</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SensorData;
