import React from "react";
import { useAppContext } from "../../../../context/AppContext";
import SensorSvg from "../../../../assets/diagrams/Wireless-Sensors.svg";

function SensorCount() {
  const { selectedDevice } = useAppContext();

  // Handle the case where selectedDevice might not be available
  if (!selectedDevice) {
    return (
      <div className="wireless-sensor-count-box">
        <div className="top-box">
          <div className="top-box-content">
            <span>Loading device data...</span>
          </div>
        </div>
        <div className="bottom-box">
          <img src={SensorSvg} alt="Sensor SVG" className="sensor-svg" />
        </div>
      </div>
    );
  }

  const { connectedSensors } = selectedDevice || {};
  const sensorCount = connectedSensors ? connectedSensors.length : 0;

  return (
    <div className="wireless-sensor-count-box">
      <div className="top-box">
        <div className="top-box-content">
          <span className="sensor-count">{sensorCount}</span>
          <span className="sensor-text">
            {sensorCount === 1
              ? "Wireless Sensor Connected"
              : "Wireless Sensors Connected"}
          </span>
        </div>
      </div>
      <div className="bottom-box">
        <img src={SensorSvg} alt="Sensor SVG" className="sensor-svg" />
      </div>
    </div>
  );
}

export default SensorCount;
