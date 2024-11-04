import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext"; // Import useAppContext
import { convertToDMS } from "../../../utils/coordinateUtils";
import "../../../styles/Realtime.css";
import PheNodeDiagram from "../../../assets/diagrams/Phenode-Diagram.svg";
import SensorSvg from "../../../assets/diagrams/Wireless-Sensors.svg";
import ImageInactive from "../../../assets/toggle_buttons/Imaging-Settings-Icon-Inactive.svg";
import ImageActive from "../../../assets/toggle_buttons/Imaging_Icon_Active.svg";

function PheNode() {
  const { selectedDevice, setSelectedDevice, devices, loading, error } =
    useAppContext(); // Updated to include loading and error
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Handle navigation to imaging
  const handleNavigate = () => {
    navigate("/imaging");
  };

  // Automatically select the first device if none is selected (fallback logic)
  useEffect(() => {
    if (!selectedDevice && devices.length > 0) {
      setSelectedDevice(devices[0]);
    }
  }, [devices, selectedDevice, setSelectedDevice]);

  // Show loading or error states if necessary
  if (loading) {
    return <div>Loading device data...</div>; // Loading state
  }

  if (error) {
    return <div>Error loading device data: {error.message}</div>; // Error state
  }

  if (!selectedDevice) {
    return <div>No device selected. Please choose a device.</div>; // Fallback state if no device is selected
  }

  // Safely destructure properties from selectedDevice
  const { battery, gps, connectedSensors, camera } = selectedDevice || {};

  return (
    <>
      <div className="grid-item twenty-five-width">
        <div className="wireless-sensor-count-box">
          <div className="top-box">
            <div className="top-box-content">
              <span className="sensor-count">{connectedSensors ?? "N/A"}</span>
              <span className="sensor-text">Wireless Sensors connected</span>
            </div>
          </div>
          <div className="bottom-box">
            <img src={SensorSvg} alt="Sensor SVG" className="sensor-svg" />
          </div>
        </div>
      </div>
      <div className="grid-item img-grid-container">
        <div className="phenode-svg-container">
          <img src={PheNodeDiagram} alt="phenode" className="phenode-svg" />
        </div>
      </div>
      <div className="image-gps-grid-item twenty-five-width">
        <div className="image-gps-box">
          <div className="top-image-box">
            <div
              className="image-box"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleNavigate}
            >
              <img
                src={isHovered ? ImageActive : ImageInactive}
                alt="Images SVG"
                className="images-svg"
              />
            </div>
            <div className="text-box">
              <span className="image-sensor-text">See Images</span>
              <span className="sensor-status-top-box">Sensor Status:</span>
              <span
                className="sensor-text-operation"
                style={{
                  color:
                    camera?.cameraHealth === "Offline"
                      ? "orange"
                      : camera?.cameraHealth === "Check"
                      ? "magenta"
                      : "#8955e2",
                }}
              >
                {camera?.cameraHealth || "Unknown"}
              </span>
            </div>
          </div>
          <div className="bottom-gps-box">
            <div className="gps-battery-box">
              <span className="gps-text">GPS:</span>
              <span className="gps-coordinates">
                {gps?.latitude !== undefined
                  ? convertToDMS(gps.latitude, true)
                  : "N/A"}
                ,
              </span>
              <span className="gps-coordinates">
                {gps?.longitude !== undefined
                  ? convertToDMS(gps.longitude, false)
                  : "N/A"}
              </span>
            </div>

            <div className="gps-battery-box">
              <span className="battery-text">Battery:</span>
              <span className="battery-percentage">
                {battery?.batteryPercent ? `${battery.batteryPercent}%` : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PheNode;
