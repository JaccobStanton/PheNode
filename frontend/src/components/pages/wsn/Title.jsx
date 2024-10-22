import React, { useState, useEffect } from "react";
import { useAppContext } from "../../../context/AppContext";

function WSNTitle() {
  const { sensorData, sensorLoading, sensorError } = useAppContext();

  // State to hold the current title data
  const [currentTitleData, setCurrentTitleData] = useState(null);

  // Update currentTitleData when new data arrives
  useEffect(() => {
    if (sensorData && sensorData.sensor) {
      // Extract the necessary data for the title
      const titleData = {
        lastMeasurement: sensorData.sensor.lastMeasurement,
      };
      setCurrentTitleData(titleData);
    }
  }, [sensorData]);

  // Handle errors
  if (sensorError) {
    return <div>Error: {sensorError.message}</div>;
  }

  // Display loading only if there's no current data and sensor is loading
  if (!currentTitleData && sensorLoading) {
    return <div>Loading last measurement...</div>;
  }

  // Display message if no data is available
  if (!currentTitleData && !sensorLoading) {
    return <div>No data available.</div>;
  }

  // Use currentTitleData to render the component
  const { lastMeasurement } = currentTitleData;

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

// Wrap the component with React.memo to prevent unnecessary re-renders
export default React.memo(WSNTitle);
