import React from "react";
import "../../../styles/Realtime.css";
import { useSelectedDevice } from "../../../context/SelectedDeviceContext";
import { convertCelsiusToFahrenheit } from "../../../utils/temperatureUtils";
import { convertDegreesToDirection } from "../../../utils/windDirectionUtils";

function SensorData() {
  const { selectedDevice } = useSelectedDevice(); // Get the selected device from context

  // If no selected device, render a message
  if (!selectedDevice) {
    return (
      <div>
        No device selected. Please select a device to view its sensor data.
      </div>
    );
  }

  // Destructure necessary values from the selected device
  const { airSensor, rainfallSensor, atmos41Sensor, soilSensors, windSensor } =
    selectedDevice;

  return (
    <>
      <div className="data-value-boxes-container">
        <div className="grid-item data-value-boxes">
          <div className="data-text-container">
            <div className="left-column">
              <p>Temperature:</p>
              <p>Humidity:</p>
              <p>Air Pressure:</p>
              <p>Sensor Health:</p>
            </div>
            <div className="right-column">
              <p>
                {airSensor?.temperature
                  ? `${convertCelsiusToFahrenheit(
                      airSensor.temperature
                    ).toFixed(2)} °F`
                  : "N/A"}
              </p>

              <p>{airSensor?.humidity ? `${airSensor.humidity}%` : "N/A"}</p>
              <p>
                {airSensor?.airPressure
                  ? `${airSensor.airPressure} kPa`
                  : "N/A"}
              </p>
              <p
                style={{
                  color:
                    airSensor.sensorHealth === "Offline"
                      ? "orange"
                      : airSensor.sensorHealth === "Check"
                      ? "magenta"
                      : "#8955e2",
                }}
              >
                {airSensor?.sensorHealth || "Unknown"}
              </p>
            </div>
          </div>
        </div>
        <div className="grid-item data-value-boxes">
          <div className="data-text-container">
            <div className="left-column">
              <p>Hourly Rainfall:</p>
              <p>Today's Rainfall:</p>
              <p>Solar Radiation:</p>
              <p>Sensor Health:</p>
            </div>
            <div className="right-column">
              <p>
                {rainfallSensor?.hourlyRainfall
                  ? `${rainfallSensor.hourlyRainfall} mm`
                  : "N/A"}
              </p>
              {/* //!no function for "today's rainfall" */}
              <p>
                {rainfallSensor?.hourlyRainfall
                  ? `${rainfallSensor.hourlyRainfall} mm`
                  : "N/A"}
              </p>
              <p>
                {atmos41Sensor?.solar ? `${atmos41Sensor?.solar} W/m2` : "N/A"}
              </p>
              <p
                style={{
                  color:
                    rainfallSensor.sensorHealth === "Offline"
                      ? "orange"
                      : rainfallSensor.sensorHealth === "Check"
                      ? "magenta"
                      : "#8955e2",
                }}
              >
                {rainfallSensor?.sensorHealth || "Unknown"}
              </p>
            </div>
          </div>
        </div>
        <div className="grid-item data-value-boxes">
          <div className="data-text-container">
            <div className="left-column">
              <p>Soil Moisture:</p>
              <p>Soil Temp:</p>
              <p>Soil Salinity:</p>
              <p>Sensor Health:</p>
            </div>
            <div className="right-column">
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
        <div className="grid-item data-value-boxes">
          <div className="data-text-container">
            <div className="left-column">
              <p>Wind Speed:</p>
              <p>Wind Gust:</p>
              <p>Wind Direction:</p>
              <p>Sensor Health:</p>
            </div>
            <div className="right-column">
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
                    windSensor.sensorHealth === "Offline"
                      ? "orange"
                      : windSensor.sensorHealth === "Check"
                      ? "magenta"
                      : "#8955e2",
                }}
              >
                {windSensor?.sensorHealth || "Unknown"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SensorData;
