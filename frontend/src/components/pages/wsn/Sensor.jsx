import React from "react";
import "../../../styles/Realtime.css";
import SensorDiagram from "../../../assets/diagrams/Wireless-Sensors-v4.svg";

function Sensor() {
  return (
    <>
      <div className="grid-item sensor-twenty-five-width">
        <div className="sensor-page-data-box">
          <div className="sensor-data-value-boxes-container">
            <div className="grid-item sensor-data-value-boxes">
              <div className="sensor-data-text-container">
                <div className="left-column">
                  <p>Temperature:</p>
                  <p>Humidity:</p>
                  <p>Illumination (lux):</p>
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
            <div className="grid-item sensor-data-value-boxes">
              <div className="sensor-data-text-container">
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
          </div>
        </div>
      </div>
      <div className="grid-item wireless-sensor-img-grid-container">
        <div className="wireless-sensor-svg-container">
          <img src={SensorDiagram} alt="sensor" className="sensor-svg" />
        </div>
        <div className="dropdown">
          <button className="dropdown-button">Select Option</button>
          <div className="dropdown-content">
            <a href="#">Option 1</a>
            <a href="#">Option 2</a>
            <a href="#">Option 3</a>
          </div>
        </div>
      </div>

      <div className="grid-item sensor-twenty-five-width">
        <div className="sensor-page-data-box">
          <div className="sensor-data-value-boxes-container">
            <div className="grid-item sensor-data-value-boxes">
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Sensor;
