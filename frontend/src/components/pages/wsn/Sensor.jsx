import React from "react";
import "../../../styles/Realtime.css";
import "../../../styles/WSN.css";
import { useAppContext } from "../../../context/AppContext";
import { useWirelessSensor } from "../../../services/swrHooks";
import { convertCelsiusToFahrenheit } from "../../../utils/temperatureUtils";
import { convertToDMS } from "../../../utils/coordinateUtils";
import SensorDiagram from "../../../assets/diagrams/Wireless-Sensors-v4.svg";
import SensorDropdownMenu from "./SensorDropdownMenu";

function Sensor() {
  const { selectedWirelessSensor } = useAppContext();

  // Extract externalSensorId from selectedWirelessSensor
  const selectedSensorId = selectedWirelessSensor?.externalSensorId;

  const { sensorData, sensorLoading, sensorError } =
    useWirelessSensor(selectedSensorId);

  if (sensorLoading) return <div>Loading sensor data...</div>;
  if (sensorError) return <div>Error: {sensorError.message}</div>;
  if (!sensorData) return <div>No data available for this sensor.</div>;

  // Destructure sensor properties from sensorData.sensor
  const { gasSensor, soilSensors, battery, lux, location, externalSensorId } =
    sensorData.sensor;

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
                    {gasSensor?.temperature !== undefined
                      ? `${convertCelsiusToFahrenheit(
                          gasSensor.temperature
                        ).toFixed(2)} °F`
                      : "N/A"}
                  </p>
                  <p>
                    {gasSensor?.humidity !== undefined
                      ? `${gasSensor.humidity}%`
                      : "N/A"}
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
                    {soilSensors && soilSensors[0]?.soilMoisture !== undefined
                      ? `${soilSensors[0].soilMoisture}`
                      : "N/A"}
                  </p>
                  <p>
                    {soilSensors &&
                    soilSensors[0]?.soilTemperature !== undefined
                      ? `${convertCelsiusToFahrenheit(
                          soilSensors[0].soilTemperature
                        ).toFixed(2)} °F`
                      : "N/A"}
                  </p>
                  <p>
                    {soilSensors &&
                    soilSensors[0]?.electricalConductivity !== undefined
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
                  {location?.latitude !== undefined
                    ? convertToDMS(location.latitude, true)
                    : "N/A"}
                  , <br></br>
                  {location?.longitude !== undefined
                    ? convertToDMS(location.longitude, true)
                    : "N/A"}
                </div>
                <div className="sensor-gps-text">Battery</div>
                <div className="sensor-gps-coordinates">
                  {battery?.batteryPercent !== undefined
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
                    <p className="device-id">{externalSensorId}</p>
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
