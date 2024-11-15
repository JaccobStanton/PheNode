import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/Home.css";
import { useAppContext } from "../../../context/AppContext";
import { convertCelsiusToFahrenheit } from "../../../utils/temperatureUtils";
import { LoadingProgress } from "../../common/LoadingProgress";

function FleetOverview({ devices, devicesLoading, devicesError }) {
  const { setSelectedDevice } = useAppContext();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (devicesLoading || !devices || devices.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target;
          card.style.opacity = entry.intersectionRatio; // Adjust opacity based on visibility
        });
      },
      { threshold: Array.from({ length: 11 }, (_, i) => i * 0.1) } // Smooth transitions
    );

    // Observe each card
    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, [devices, devicesLoading]);

  if (devicesLoading) {
    return <LoadingProgress value={progress} />;
  }

  if (devicesError) {
    return <div>Error loading devices data: {devicesError.message}</div>;
  }

  if (!devices || devices.length === 0) {
    return <div>No devices found.</div>;
  }

  const handleCardClick = (device) => {
    setSelectedDevice(device);
    navigate("/realtime");
  };

  return (
    <div className="fleet-overview-box">
      <div className="fleet-cards-container">
        {devices.map((item, index) => (
          <div
            key={item._id || index}
            className="fleet-card"
            onClick={() => handleCardClick(item)}
            ref={(el) => (cardRefs.current[index] = el)}
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
