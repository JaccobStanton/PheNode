// The component sets the clicked device in the global context using setSelectedDevice.
// The application navigates to the PheNode.jsx component.
// The <PheNode.jsx /> component will use the selected device from the context to display the relevant data.
// This new behavior works in conjunction with the existing logic. -> If the user navigates to the PheNode
// component without selecting a device (either from a card or the navbar), the component will show the first device by default.
//! change the above if END UP GRAYING OUT TOGGLE BUTTONS, BECAUSE THEN ABOVE WILL BE UNUSED CODE

import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/Home.css";
import useFleetData from "../../../hooks/useFleetData";
import { useAuth } from "../../../context/AuthContext";
import { useSelectedDevice } from "../../../context/SelectedDeviceContext"; // Import the context
import { convertCelsiusToFahrenheit } from "../../../utils/temperatureUtils";

function FleetOverview() {
  const { accessToken, loading: authLoading, error: authError } = useAuth();
  const { data, loading, error } = useFleetData(accessToken);
  const { setSelectedDevice } = useSelectedDevice(); // Get the setter function from the context
  const navigate = useNavigate();

  // If authentication is still loading, show a loading spinner
  if (authLoading) {
    return <div>Authenticating...</div>;
  }

  // If there's an error during authentication, display it
  if (authError) {
    return <div>Error: {authError}</div>;
  }

  // Don't render fleet data until accessToken is available
  if (!accessToken) {
    return <div>No access token available. Please log in.</div>;
  }

  if (loading) {
    return <div>Loading fleet data...</div>;
  }

  if (error) {
    return <div>Error fetching fleet data: {error}</div>;
  }

  // Handle card click
  const handleCardClick = (device) => {
    setSelectedDevice(device); // Set the selected device in the context
    navigate("/realtime"); // Navigate to the PheNode component
  };

  return (
    <div className="fleet-overview-box">
      <div className="fleet-cards-container">
        {data.map((item) => (
          <div
            key={item._id ? item._id : "unknown"}
            className="fleet-card"
            onClick={() => handleCardClick(item)} // Add the onClick handler
          >
            <div className="fleet-card-content">
              {/* Device Label */}
              <div className="fleet-card-content-section fleet-card-content-title-section">
                <div className="fleet-card-content-title">{item.label}</div>
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
