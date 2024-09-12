import React from "react";
import "../../../../../styles/Realtime.css";
import "../../../../../styles/WSN.css";
import SensorDiagram from "../../../../../assets/diagrams/Wireless-Sensors-v4.svg";

function SensorMobile() {
  return (
    <div className="sensor-mobile-container">
      {/* DROPDOWN FIRST */}
      <div className="dropdown-wsn-mobile">
        <select
          className="dropdown-menu-wsn-mobile"
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

      {/* SVG NEXT */}
      <div className="wireless-sensor-svg-container-mobile">
        <img
          src={SensorDiagram}
          alt="sensor"
          className="wsn-sensor-svg-mobile"
        />
      </div>

      {/* GPS AND BATTERY INFO */}
      <div className="sensor-gps-coordinates-box-mobile">
        <div className="gps-battery-container-mobile">
          <div className="sensor-gps-text-mobile">GPS:</div>
          <div className="sensor-gps-coordinates-mobile">
            38°39'34.7"N 90°19'58.9"W
          </div>
        </div>
        <div className="gps-battery-container-mobile">
          <div className="sensor-gps-text-mobile">Battery:</div>
          <div className="sensor-gps-coordinates-mobile">95%</div>
        </div>
      </div>

      {/* SENSOR DATA BOXES */}
      <div className="sensor-data-boxes-row-mobile1">
        <div className="sensor-data-value-boxes-mobile1">
          <div className="sensor-data-text-container-mobile1">
            <div className="sensor-left-column-mobile1">
              <p>Temperature:</p>
              <p>Humidity:</p>
              <p>Illumination (lux):</p>
              <p>Sensor Status:</p>
            </div>
            <div className="sensor-right-column-mobile1">
              <p>68.7 F</p>
              <p>12%</p>
              <p>19 kPa</p>
              <p>Operational</p>
            </div>
          </div>
        </div>

        <div className="sensor-data-value-boxes-mobile1">
          <div className="sensor-data-text-container-mobile1">
            <div className="sensor-left-column-mobile1">
              <p>Soil Moisture:</p>
              <p>Soil Temp:</p>
              <p>Soil Salinity:</p>
              <p>Sensor Status:</p>
            </div>
            <div className="sensor-right-column-mobile1">
              <p>68.7 F</p>
              <p>12%</p>
              <p>19 kPa</p>
              <p>Operational</p>
            </div>
          </div>
        </div>
      </div>

      {/* RENAME SENSOR */}
      <div className="sensor-rename-container-mobile">
        <div className="id-top-box-mobile">
          <div className="text-column-mobile">
            <p className="rename-title-mobile">Rename this sensor:</p>
            <p className="device-id-mobile">WS-AB:62:EB:09:90:32</p>
          </div>
        </div>
        <div className="rename-bottom-box-mobile">
          <div className="placeholder-box-mobile"></div>
          <button className="rename-button-mobile">Rename</button>
        </div>
      </div>
    </div>
  );
}

export default SensorMobile;
