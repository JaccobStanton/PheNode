import React from "react";
import { useConnectedSensorCount } from "../../../services/swrHooks";
import SensorSvg from "../../../assets/diagrams/Wireless-Sensors.svg";

function SensorCount({ deviceId }) {
  // Fetch the sensor count using the provided deviceId
  const {
    sensorCount,
    loading: sensorLoading,
    error: sensorError,
  } = useConnectedSensorCount(deviceId);

  return (
    <div className="wireless-sensor-count-box">
      <div className="top-box">
        <div className="top-box-content">
          {sensorLoading ? (
            <span>Loading sensors...</span>
          ) : sensorError ? (
            <span>Error loading sensors</span>
          ) : (
            <>
              <span className="sensor-count">
                {sensorCount !== null ? sensorCount : ""}
              </span>
              <span className="sensor-text">
                {sensorCount === 1
                  ? "Wireless Sensor Connected"
                  : "Wireless Sensors Connected"}
              </span>
            </>
          )}
        </div>
      </div>
      <div className="bottom-box">
        <img src={SensorSvg} alt="Sensor SVG" className="sensor-svg" />
      </div>
    </div>
  );
}

export default SensorCount;
