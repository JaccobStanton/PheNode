import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../../../styles/Realtime.css";
import { useAppContext } from "../../../../../context/AppContext"; // Import useAppContext
import { convertToDMS } from "../../../../../utils/coordinateUtils";
import { convertCelsiusToFahrenheit } from "../../../../../utils/temperatureUtils";
import { convertDegreesToDirection } from "../../../../../utils/windDirectionUtils";
import SensorSvg from "../../../../../assets/diagrams/Wireless-Sensors.svg";
import ImageInactive from "../../../../../assets/toggle_buttons/Imaging-Settings-Icon-Inactive.svg";
import ImageActive from "../../../../../assets/toggle_buttons/Imaging_Icon_Active.svg";

function RealtimeMobileSmall() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { selectedDevice } = useAppContext(); // Use useAppContext to get selectedDevice

  // If no selected device, render a message
  if (!selectedDevice) {
    return (
      <div>
        No device selected. Please select a device to view its sensor data.
      </div>
    );
  }

  // Destructure necessary values from the selected device
  const {
    airSensor,
    rainfallSensor,
    atmos41Sensor,
    soilSensors,
    windSensor,
    battery,
    gps,
    connectedSensors,
    camera,
  } = selectedDevice;

  const handleNavigate = () => {
    navigate("/imaging");
  };

  return (
    <div className="mobile-grid-container">
      {/* First 4 boxes with data */}
      <div className="grid-item data-value-boxes2">
        <div className="data-text-container2">
          <div className="left-column2">
            <p>Temperature:</p>
            <p>Humidity:</p>
            <p>Air Pressure:</p>
            <p>Sensor Status:</p>
          </div>
          <div className="right-column2">
            <p>
              {airSensor?.temperature
                ? `${convertCelsiusToFahrenheit(airSensor.temperature).toFixed(
                    2
                  )} °F`
                : "N/A"}
            </p>
            <p>{airSensor?.humidity ? `${airSensor.humidity}%` : "N/A"}</p>
            <p>
              {airSensor?.airPressure ? `${airSensor.airPressure} kPa` : "N/A"}
            </p>
            <p
              style={{
                color:
                  airSensor?.sensorHealth === "Offline"
                    ? "orange"
                    : airSensor?.sensorHealth === "Check"
                    ? "magenta"
                    : "#8955e2",
              }}
            >
              {airSensor?.sensorHealth || "Unknown"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid-item data-value-boxes2">
        <div className="data-text-container2">
          <div className="left-column2">
            <p>Wind Speed:</p>
            <p>Wind Gust:</p>
            <p>Wind Direction:</p>
            <p>Sensor Status:</p>
          </div>
          <div className="right-column2">
            <p>
              {windSensor?.windSpeed ? `${windSensor.windSpeed} mph` : "N/A"}
            </p>
            <p>
              {windSensor?.windGustSpeed
                ? `${windSensor.windGustSpeed} mph`
                : "N/A"}
            </p>
            <p>
              {windSensor?.windDirection !== undefined
                ? convertDegreesToDirection(windSensor.windDirection)
                : "N/A"}
            </p>
            <p
              style={{
                color:
                  windSensor?.sensorHealth === "Offline"
                    ? "orange"
                    : windSensor?.sensorHealth === "Check"
                    ? "magenta"
                    : "#8955e2",
              }}
            >
              {windSensor?.sensorHealth || "Unknown"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid-item data-value-boxes2">
        <div className="data-text-container2">
          <div className="left-column2">
            <p>Hourly Rainfall:</p>
            <p>Today's Rainfall:</p>
            <p>Solar Radiation:</p>
            <p>Sensor Status:</p>
          </div>
          <div className="right-column2">
            <p>
              {rainfallSensor?.hourlyRainfall
                ? `${rainfallSensor.hourlyRainfall} mm`
                : "N/A"}
            </p>
            <p>
              {rainfallSensor?.hourlyRainfall
                ? `${rainfallSensor.hourlyRainfall} mm`
                : "N/A"}
            </p>
            <p>
              {atmos41Sensor?.solar ? `${atmos41Sensor.solar} W/m²` : "N/A"}
            </p>
            <p
              style={{
                color:
                  rainfallSensor?.sensorHealth === "Offline"
                    ? "orange"
                    : rainfallSensor?.sensorHealth === "Check"
                    ? "magenta"
                    : "#8955e2",
              }}
            >
              {rainfallSensor?.sensorHealth || "Unknown"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid-item data-value-boxes2">
        <div className="data-text-container2">
          <div className="left-column2">
            <p>Soil Moisture:</p>
            <p>Soil Temp:</p>
            <p>Soil Salinity:</p>
            <p>Sensor Status:</p>
          </div>
          <div className="right-column2">
            <p>
              {soilSensors && soilSensors[0]?.vwc
                ? `${soilSensors[0].vwc}%`
                : "N/A"}
            </p>
            <p>
              {soilSensors && soilSensors[0]?.soilTemperature
                ? `${convertCelsiusToFahrenheit(
                    soilSensors[0].soilTemperature
                  ).toFixed(2)} °F`
                : "N/A"}
            </p>
            <p>
              {soilSensors && soilSensors[0]?.electricalConductivity
                ? `${soilSensors[0].electricalConductivity} ds/m`
                : "N/A"}
            </p>
            <p
              style={{
                color:
                  soilSensors && soilSensors[0]?.sensorHealth === "Offline"
                    ? "orange"
                    : soilSensors && soilSensors[0]?.sensorHealth === "Check"
                    ? "magenta"
                    : "#8955e2",
              }}
            >
              {(soilSensors && soilSensors[0]?.sensorHealth) || "Unknown"}
            </p>
          </div>
        </div>
      </div>

      {/* Last two boxes (empty) */}
      <div className="wireless-sensor-count-box2">
        <div className="top-box2">
          <div className="top-box-content2">
            <span className="sensor-count2">{connectedSensors ?? "N/A"}</span>
            <span className="sensor-text2">Wireless Sensors connected</span>
          </div>
        </div>
        <div className="bottom-box-svg-container2">
          <img src={SensorSvg} alt="Sensor SVG" className="sensor-svg2" />
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
          <span
            className="sensor-text-operation2"
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

      <div className="bottom-gps-box2">
        <div className="gps-battery-box2">
          <span className="gps-text2">GPS:</span>
          <span className="gps-coordinates2">
            {gps?.latitude !== undefined
              ? convertToDMS(gps.latitude, true)
              : "N/A"}
            ,
          </span>
          <span className="gps-coordinates2">
            {gps?.longitude !== undefined
              ? convertToDMS(gps.longitude, false)
              : "N/A"}
          </span>
        </div>
        <div className="gps-battery-box2">
          <span className="battery-text2">Battery:</span>
          <span className="battery-percentage2">
            {battery?.batteryPercent ? `${battery.batteryPercent}%` : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default RealtimeMobileSmall;
