import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/Realtime.css";
import PheNodeDiagram from "../../../assets/diagrams/Phenode-Diagram.svg";
import SensorSvg from "../../../assets/diagrams/Wireless-Sensors.svg";
import ImageInactive from "../../../assets/toggle_buttons/Imaging-Settings-Icon-Inactive.svg";
import ImageActive from "../../../assets/toggle_buttons/Imaging_Icon_Active.svg";

function PheNode() {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/imaging");
  };
  return (
    <>
      <div className="grid-item twenty-five-width">
        <div className="wireless-sensor-count-box">
          <div className="top-box">
            <div className="top-box-content">
              <span className="sensor-count">9</span>
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
              <span className="sensor-text-operation">Operational</span>
            </div>
          </div>
          <div className="bottom-gps-box">
            <div className="gps-battery-box">
              <span className="gps-text">GPS:</span>
              {/* //!fix coorinates below */}
              <span className="gps-coordinates">38°39'34.7"N</span>
              <span className="gps-coordinates">90°19'58.9"W</span>
            </div>
            <div className="gps-battery-box">
              <span className="battery-text">Battery:</span>
              <span className="battery-percentage">94.87%</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PheNode;
