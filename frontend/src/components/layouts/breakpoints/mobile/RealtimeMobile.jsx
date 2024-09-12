import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../../styles/Realtime.css";
import PheNodeSvg from "../../../../assets/diagrams/Phenode-Diagram.svg";
import SensorSvg from "../../../../assets/diagrams/Wireless-Sensors.svg";
import ImageInactive from "../../../../assets/toggle_buttons/Imaging-Settings-Icon-Inactive.svg";
import ImageActive from "../../../../assets/toggle_buttons/Imaging_Icon_Active.svg";

function RealtimeMobile() {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/imaging");
  };

  return (
    <div className="realtime-column2">
      {/* First row - phenode-svg */}
      <div className="phenode-svg-row2">
        <div className="phenode-svg-container2">
          <img src={PheNodeSvg} alt="Phenode SVG" className="phenode-svg2" />
        </div>
      </div>

      {/* Second row - 3 columns */}
      <div className="three-column-row2">
        {/* First column - data column */}
        <div className="column data-column2">
          <div className="grid-item data-value-boxes2">
            <div className="data-text-container2">
              <div className="left-column2">
                <p>Temperature:</p>
                <p>Humidity:</p>
                <p>Air Pressure:</p>
                <p>Sensor Status:</p>
              </div>
              <div className="right-column2">
                <p>68.7 F</p>
                <p>12%</p>
                <p>19 kPa</p>
                <p>Operational</p>
              </div>
            </div>
          </div>
          <div className="grid-item data-value-boxes2">
            <div className="data-text-container2">
              <div className="left-column2">
                <p>Temperature:</p>
                <p>Humidity:</p>
                <p>Air Pressure:</p>
                <p>Sensor Status:</p>
              </div>
              <div className="right-column2">
                <p>68.7 F</p>
                <p>12%</p>
                <p>19 kPa</p>
                <p>Operational</p>
              </div>
            </div>
          </div>

          <div className="bottom-gps-box2">
            <div className="gps-battery-box2">
              <span className="gps-text2">GPS:</span>
              <span className="gps-coordinates2">38°39'34.7"N</span>
              <span className="gps-coordinates2">90°19'58.9"W</span>
            </div>
            <div className="gps-battery-box2">
              <span className="battery-text2">Battery:</span>
              <span className="battery-percentage2">94.87%</span>
            </div>
          </div>
        </div>

        {/* Second column - wireless sensor count box */}
        <div className="column sensor-count-column2">
          <div className="wireless-sensor-count-box2">
            <div className="top-box2">
              <div className="top-box-content2">
                <span className="sensor-count2">9</span>
                <span className="sensor-text2">Wireless Sensors connected</span>
              </div>
            </div>
            <div className="bottom-box-svg-container2">
              <img src={SensorSvg} alt="Sensor SVG" className="sensor-svg2" />
            </div>
          </div>
        </div>

        {/* Third column - data column */}
        <div className="column data-column22">
          <div className="grid-item data-value-boxes2">
            <div className="data-text-container2">
              <div className="left-column2">
                <p>Temperature:</p>
                <p>Humidity:</p>
                <p>Air Pressure:</p>
                <p>Sensor Status:</p>
              </div>
              <div className="right-column2">
                <p>68.7 F</p>
                <p>12%</p>
                <p>19 kPa</p>
                <p>Operational</p>
              </div>
            </div>
          </div>
          <div className="grid-item data-value-boxes2">
            <div className="data-text-container2">
              <div className="left-column2">
                <p>Temperature:</p>
                <p>Humidity:</p>
                <p>Air Pressure:</p>
                <p>Sensor Status:</p>
              </div>
              <div className="right-column2">
                <p>68.7 F</p>
                <p>12%</p>
                <p>19 kPa</p>
                <p>Operational</p>
              </div>
            </div>
          </div>

          <div className="text-box2">
            <div className="image-sensor-box2">
              <div
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
              <span className="image-sensor-text2">See Images</span>
            </div>

            <div className="sensor-status-box2">
              <span className="sensor-status-top-box2">Sensor Status:</span>
              <span className="sensor-text-operation2">Operational</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RealtimeMobile;
