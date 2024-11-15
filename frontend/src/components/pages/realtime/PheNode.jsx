import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";
import { convertToDMS } from "../../../utils/coordinateUtils";
import "../../../styles/Realtime.css";
import PheNodeDiagram from "../../../assets/diagrams/Phenode-Diagram.svg";
import ImageInactive from "../../../assets/toggle_buttons/Imaging-Settings-Icon-Inactive.svg";
import ImageActive from "../../../assets/toggle_buttons/Imaging_Icon_Active.svg";
import SensorCount from "./SensorCount"; // Adjust the import path as needed

function PheNode() {
  const { selectedDevice, setSelectedDevice, devices, loading, error } =
    useAppContext();
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Handle navigation to imaging
  const handleNavigate = () => {
    navigate("/imaging");
  };

  // Automatically select the first device if none is selected
  useEffect(() => {
    if (!selectedDevice && devices.length > 0) {
      setSelectedDevice(devices[0]);
    }
  }, [devices, selectedDevice, setSelectedDevice]);

  // Show loading or error states if necessary
  if (loading) {
    return <div>Loading device data...</div>;
  }

  if (error) {
    return <div>Error loading device data: {error.message}</div>;
  }

  if (!selectedDevice) {
    return <div>No device selected. Please choose a device.</div>;
  }

  // Safely destructure properties from selectedDevice
  const { battery, gps, camera } = selectedDevice || {};

  return (
    <>
      <div className="grid-item twenty-five-width">
        <SensorCount deviceId={selectedDevice.deviceId} />
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
