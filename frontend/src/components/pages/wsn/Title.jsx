import React from "react";
import { useAppContext } from "../../../context/AppContext";

function WSNTitle() {
  const { sensorData } = useAppContext();

  // Check if sensorData is available
  if (!sensorData || !sensorData.sensor) {
    return <div>Loading last measurement...</div>;
  }

  // Extract lastMeasurement from sensorData.sensor
  const { lastMeasurement } = sensorData.sensor;

  // Format the last measurement date
  const formattedDate = lastMeasurement
    ? new Date(lastMeasurement).toLocaleString()
    : "N/A";

  return (
    <>
      <div className="grid-item page-title">Wireless Sensor Network</div>
      <div className="grid-item cell-wifi-last-measurements">
        <div className="imaging-measurements-box">
          <div className="imaging-last-photo">
            <span className="imaging-last-photo-text">
              Last measurements taken:
            </span>
            <span className="last-photo-date">{formattedDate}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default WSNTitle;
