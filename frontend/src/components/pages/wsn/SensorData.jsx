// SensorPageDataBox.jsx
import React from "react";
import { convertCelsiusToFahrenheit } from "../../../utils/temperatureUtils";

function SensorPageDataBox({ gasSensor, soilSensors, lux }) {
  return (
    <div className="sensor-page-data-box">
      <div className="sensor-data-value-boxes-container">
        <div className="grid-item sensor-data-value-boxes">
          <div className="sensor-data-text-container">
            <div className="sensor-left-column">
              <p>Temperature:</p>
              <p>Humidity:</p>
              <p>Air Pressure:</p>
              <p>Illumination (lux):</p>
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
              <p>
                {gasSensor?.airPressure !== undefined
                  ? `${gasSensor.airPressure} kPa`
                  : "N/A"}
              </p>
              <p>{lux !== undefined ? `${lux}` : "N/A"}</p>
            </div>
          </div>
        </div>
        <div className="grid-item sensor-data-value-boxes">
          <div className="sensor-data-text-container">
            {/* Container for the ToggleButtons, positioned at the top right */}

            <div className="sensor-left-column">
              <p>Soil Moisture:</p>
              <p>Soil Temp:</p>
              <p>Soil Salinity:</p>
              <p>VWC:</p>
            </div>
            <div className="sensor-right-column">
              <p>
                {soilSensors && soilSensors[0]?.soilMoisture !== undefined
                  ? `${soilSensors[0].soilMoisture}`
                  : "N/A"}
              </p>
              <p>
                {soilSensors && soilSensors[0]?.soilTemperature !== undefined
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
              <p>
                {soilSensors && soilSensors[0]?.vwc !== undefined
                  ? `${soilSensors[0].vwc} %`
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SensorPageDataBox;
