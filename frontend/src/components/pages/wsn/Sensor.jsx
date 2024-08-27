import React from "react";
import "../../../styles/Realtime.css";
import "../../../styles/WSN.css";
import SensorDiagram from "../../../assets/diagrams/Wireless-Sensors-v4.svg";

function Sensor() {
  return (
    <>
      {/* LEFT COLUMN SENSOR DATA */}
      <div className="grid-item sensor-twenty-five-width">
        <div className="sensor-page-data-box">
          <div className="sensor-data-value-boxes-container">
            <div className="grid-item sensor-data-value-boxes">
              <div className="sensor-data-text-container">
                <div className="sensor-left-column">
                  <p>Temperature:</p>
                  <p>Humidity:</p>
                  <p>Illumination (lux):</p>
                  <p>Sensor Status:</p>
                </div>
                <div className="sensor-right-column">
                  <p>68.7 F</p>
                  <p>12%</p>
                  <p>19 kPa</p>
                  <p>Operational</p>
                </div>
              </div>
            </div>
            <div className="grid-item sensor-data-value-boxes">
              <div className="sensor-data-text-container">
                <div className="sensor-left-column">
                  <p>Soil Moisture:</p>
                  <p>Soil Temp:</p>
                  <p>Soil Salinity:</p>
                  <p>Sensor Status:</p>
                </div>
                <div className="sensor-right-column">
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

      {/* DROPDOWN AND SVG */}
      <div className="wireless-sensor-img-grid-container">
        <div className="wireless-sensor-svg-container">
          <img src={SensorDiagram} alt="sensor" className="wsn-sensor-svg" />
        </div>
        <div className="dropdown-wsn">
          {/* Dropdown to select wireless sensor */}
          <select
            className="dropdown-menu-wsn"
            onChange={(e) => handleDropdownChange(e)}
          >
            <option value="" disabled selected>
              Select Wireless Sensor...
            </option>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </div>
      </div>

      {/* RIGHT COLUMN GPS-RENAMING SENSOR */}
      <div className="grid-item sensor-twenty-five-width">
        <div className="sensor-page-data-box">
          <div className="sensor-data-value-boxes-container">
            <div className="grid-item sensor-data-value-boxes">
              <div className="sensor-gps-coordinates-box">
                <div className="sensor-gps-text">GPS</div>
                <div className="sensor-gps-coordinates">
                  38°39'34.7"N 90°19'58.9"W
                </div>
                <div className="sensor-gps-text">Battery</div>
                <div className="sensor-gps-coordinates">95%</div>
              </div>
            </div>

            <div className="grid-item sensor-data-value-boxes">
              <div className="sensor-rename-container">
                <div className="id-top-box">
                  <div className="text-column">
                    <p className="rename-title">Rename this sensor:</p>
                    <p className="device-id">WS-AB:62:EB:09:90:32</p>
                  </div>
                </div>
                <div className="rename-bottom-box">
                  <div className="placeholder-box"></div>
                  <button className="rename-button">Rename</button>
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
