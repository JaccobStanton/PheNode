import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles
import { convertToDMS } from "../../../utils/coordinateUtils";
import "../../../styles/Realtime.css";
import PheNodeDiagram from "../../../assets/diagrams/Phenode-Diagram.svg";
import ImageInactive from "../../../assets/toggle_buttons/Imaging-Settings-Icon-Inactive.svg";
import ImageActive from "../../../assets/toggle_buttons/Imaging_Icon_Active.svg";
import SensorCount from "./count/SensorCount";

//!RECEIVES DATA FROM PARENT COMPONENT, <Realtime />

function PheNode({ selectedDevice, loading, error }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Trigger a toast notification if there's an error
  useEffect(() => {
    if (error) {
      toast.error(`Error loading device data: ${error.message}`, {
        position: "bottom-right",
      });
    }
  }, [error]);

  const handleNavigate = () => {
    navigate("/imaging");
  };

  if (loading) {
    return <div>Loading device data...</div>;
  }

  if (!selectedDevice) {
    return <div>No device selected. Please choose a device.</div>;
  }

  const { battery, gps, camera } = selectedDevice || {};

  return (
    <>
      {/* Toast container for notifications */}
      <ToastContainer />

      <div className="grid-item twenty-five-width">
        {/* Sensor count and soil count */}
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
