import React from "react";
import "../../../styles/Realtime.css";
import "../../../styles/WSN.css";
import { useAppContext } from "../../../context/AppContext";
import SensorDiagram from "../../../assets/diagrams/Wireless-Sensors-v4.svg";
import SensorDropdownMenu from "./SensorDropdownMenu";

function Sensor() {
  const { selectedWirelessSensor, sensorsLoading, sensorsError } =
    useAppContext(); // Get selectedWirelessSensor from AppContext

  console.log(
    "Rendering Sensor component. Selected Sensor:",
    selectedWirelessSensor
  );

  // Show loading or error states if necessary
  if (sensorsLoading) {
    return <div>Loading sensor data...</div>;
  }

  if (sensorsError) {
    return <div>Error loading sensors: {sensorsError.message}</div>;
  }

  if (!selectedWirelessSensor) {
    return (
      <div>No sensor selected. Please select a sensor to view its data.</div>
    );
  }

  // Destructure necessary values from the selected sensor
  const { gasSensor, soilSensors, battery, lux, location } =
    selectedWirelessSensor;

  return (
    <>
      {/* LEFT COLUMN SENSOR DATA */}
      <div className="grid-item sensor-twenty-five-width">
        <div className="sensor-page-data-box">
          <div className="sensor-data-value-boxes-container">
            <div className="grid-item sensor-data-value-boxes">
              <div className="sensor-data-text-container">
                <div className="sensor-left-column">
                  <p>Temperature:</p>
                  <p>Humidity:</p>
                  <p>Illumination (lux):</p>
                  <p>Sensor Status:</p>
                </div>
                <div className="sensor-right-column">
                  <p>
                    {gasSensor?.temperature
                      ? `${convertCelsiusToFahrenheit(
                          gasSensor.temperature
                        ).toFixed(2)} °F`
                      : "N/A"}
                  </p>
                  <p>
                    {gasSensor?.humidity ? `${gasSensor.humidity}%` : "N/A"}
                  </p>
                  <p>{lux !== undefined ? `${lux}` : "N/A"}</p>
                  <p>Operational</p>
                </div>
              </div>
            </div>
            <div className="grid-item sensor-data-value-boxes">
              <div className="sensor-data-text-container">
                <div className="sensor-left-column">
                  <p>Soil Moisture:</p>
                  <p>Soil Temp:</p>
                  <p>Soil Salinity:</p>
                  <p>Sensor Status:</p>
                </div>
                <div className="sensor-right-column">
                  <p>
                    {soilSensors && soilSensors[0]?.soilMoisture
                      ? `${soilSensors[0].soilMoisture}`
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
                  <p>Operational</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DROPDOWN AND SVG */}
      <div className="wireless-sensor-img-grid-container">
        <div className="wireless-sensor-svg-container">
          <img src={SensorDiagram} alt="sensor" className="wsn-sensor-svg" />
        </div>
        <SensorDropdownMenu />
      </div>

      {/* RIGHT COLUMN GPS-RENAMING SENSOR */}
      <div className="grid-item sensor-twenty-five-width">
        <div className="sensor-page-data-box">
          <div className="sensor-data-value-boxes-container">
            <div className="grid-item sensor-data-value-boxes">
              <div className="sensor-gps-coordinates-box">
                <div className="sensor-gps-text">GPS</div>
                <div className="sensor-gps-coordinates">
                  {location?.latitude ? `${location.latitude}` : "N/A"}{" "}
                  {location?.longitude ? `${location.longitude}` : "N/A"}
                </div>
                <div className="sensor-gps-text">Battery</div>
                <div className="sensor-gps-coordinates">
                  {battery?.batteryPercent
                    ? `${battery.batteryPercent}%`
                    : "N/A"}
                </div>
              </div>
            </div>

            <div className="grid-item sensor-data-value-boxes">
              <div className="sensor-rename-container">
                <div className="id-top-box">
                  <div className="text-column">
                    <p className="rename-title">Rename this sensor:</p>
                    <p className="device-id">
                      {selectedWirelessSensor.externalSensorId}
                    </p>
                  </div>
                </div>
                <div className="rename-bottom-box">
                  <div className="placeholder-box"></div>
                  <button className="rename-button">Rename</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sensor;
