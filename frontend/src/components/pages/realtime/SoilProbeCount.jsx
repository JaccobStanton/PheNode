import React from "react";
import { useConnectedSensorCount } from "../../../services/swrHooks";
import SoilProbeSvg from "../../../assets/diagrams/Soil-Probe.svg";

function SoilProbeCount({ deviceId }) {
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
                  ? "Soil Probe in Sensor Network"
                  : "Soil Probes in Sensor Network"}
              </span>
            </>
          )}
        </div>
      </div>
      <div className="bottom-box">
        <img src={SoilProbeSvg} alt="Soil Probe SVG" className="sensor-svg" />
      </div>
    </div>
  );
}

export default SoilProbeCount;
