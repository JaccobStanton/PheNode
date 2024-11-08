// FleetOverview.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/Home.css";
import { useAppContext } from "../../../context/AppContext";
import { convertCelsiusToFahrenheit } from "../../../utils/temperatureUtils";
import Box from "@mui/material/Box";
import CircularProgressWithLabel from "@mui/material/CircularProgress";

function FleetOverview({ devices, devicesLoading, devicesError }) {
  const { setSelectedDevice } = useAppContext(); // Access setSelectedDevice from context
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  // Show loading or error states if necessary
  if (devicesLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh", // Full height of the viewport to center vertically
          width: "100%", // Ensure full width
        }}
      >
        <CircularProgressWithLabel value={progress} />
      </Box>
    );
  }

  if (devicesError) {
    return <div>Error loading devices data: {devicesError.message}</div>;
  }

  if (!devices || devices.length === 0) {
    return <div>No devices found.</div>;
  }

  // Handle card click
  const handleCardClick = (device) => {
    setSelectedDevice(device);
    navigate("/realtime");
  };

  return (
    <div className="fleet-overview-box">
      <div className="fleet-cards-container">
        {devices.map((item) => (
          <div
            key={item._id ? item._id : "unknown"}
            className="fleet-card"
            onClick={() => handleCardClick(item)}
          >
            <div className="fleet-card-content">
              {/* Device Label */}
              <div className="fleet-card-content-section fleet-card-content-title-section">
                <div className="fleet-card-content-title">
                  {item.label || "No Device Name"}
                </div>
                <div className="fleet-card-content-date-label">
                  Last measurements taken:
                </div>
                <div className="fleet-card-content-date-value">
                  {item.lastMeasurement
                    ? new Date(item.lastMeasurement).toLocaleString()
                    : "No data available"}
                </div>
              </div>

              {/* Device Status */}
              <div className="fleet-card-content-section">
                <div className="fleet-card-content-label">Health Status:</div>
                <div
                  className="fleet-card-content-data"
                  style={{
                    color:
                      item.health === "Offline"
                        ? "orange"
                        : item.health === "Check"
                        ? "magenta"
                        : "#48f7f5",
                  }}
                >
                  {item.health || "Unknown"}
                </div>
              </div>

              {/* Temperature */}
              <div className="fleet-card-content-section">
                <div className="fleet-card-content-label">Temperature:</div>
                <div className="fleet-card-content-data">
                  {item.airSensor?.temperature
                    ? `${convertCelsiusToFahrenheit(
                        item.airSensor.temperature
                      ).toFixed(2)}°F`
                    : "N/A"}
                </div>
              </div>

              {/* Rainfall */}
              <div className="fleet-card-content-section">
                <div className="fleet-card-content-label">
                  Today's Rainfall:
                </div>
                <div className="fleet-card-content-data">
                  {item.rainfallSensor?.hourlyRainfall
                    ? `${item.rainfallSensor.hourlyRainfall}"`
                    : "N/A"}
                </div>
              </div>

              {/* Wind Speed */}
              <div className="fleet-card-content-section">
                <div className="fleet-card-content-label">Wind Speed:</div>
                <div className="fleet-card-content-data">
                  {item.windSensor?.windSpeed !== "-9999.00"
                    ? `${item.windSensor.windSpeed} mph`
                    : "N/A"}
                </div>
              </div>

              {/* Battery */}
              <div className="fleet-card-content-section">
                <div className="fleet-card-content-label">Battery:</div>
                <div className="fleet-card-content-data">
                  {item.battery?.batteryPercent
                    ? `${item.battery.batteryPercent}%`
                    : "N/A"}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FleetOverview;
