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
  const { selectedDevice, setSelectedDevice, devices } = useAppContext(); // Use AppContext
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Handle navigation to imaging
  const handleNavigate = () => {
    navigate("/imaging");
  };

  // Automatically select the first device if none is selected (this helps in fallback scenarios)
  useEffect(() => {
    if (!selectedDevice && devices.length > 0) {
      setSelectedDevice(devices[0]);
    }
  }, [devices, selectedDevice, setSelectedDevice]);

  // Show loading or error states if necessary
  if (!selectedDevice) {
    return <div>Loading device data...</div>;
  }

  return (
    <>
      <div className="grid-item twenty-five-width">
        <div className="wireless-sensor-count-box">
          <div className="top-box">
            <div className="top-box-content">
              <span className="sensor-count">
                {selectedDevice.connectedSensors ?? "N/A"}
              </span>
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
                    selectedDevice.camera?.cameraHealth === "Offline"
                      ? "orange"
                      : selectedDevice.camera?.cameraHealth === "Check"
                      ? "magenta"
                      : "#8955e2",
                }}
              >
                {selectedDevice.camera?.cameraHealth || "Unknown"}
              </span>
            </div>
          </div>
          <div className="bottom-gps-box">
            <div className="gps-battery-box">
              <span className="gps-text">GPS:</span>
              <span className="gps-coordinates">
                {selectedDevice.gps?.latitude !== undefined
                  ? convertToDMS(selectedDevice.gps.latitude, true)
                  : "N/A"}
                ,
              </span>
              <span className="gps-coordinates">
                {selectedDevice.gps?.longitude !== undefined
                  ? convertToDMS(selectedDevice.gps.longitude, false)
                  : "N/A"}
              </span>
            </div>

            <div className="gps-battery-box">
              <span className="battery-text">Battery:</span>
              <span className="battery-percentage">
                {selectedDevice.battery?.batteryPercent !== undefined
                  ? `${selectedDevice.battery.batteryPercent}%`
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PheNode;
