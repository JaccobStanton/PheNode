// SensorBox.jsx
import React, { useState } from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { convertCelsiusToFahrenheit } from "../../../../utils/temperatureUtils";
import { SensorToggleButton } from "../../../common/Button";

function SensorBox({ gasSensor, lux }) {
  const [selectedOption, setSelectedOption] = useState("climate");

  const handleToggleChange = (event, newOption) => {
    if (newOption !== null) {
      setSelectedOption(newOption);
    }
  };

  return (
    <div className="grid-item sensor-data-value-boxes">
      <div className="sensor-data-title-container">
        <h3 className="sensor-data-title">Sensor Data</h3>
        <ToggleButtonGroup
          value={selectedOption}
          exclusive
          onChange={handleToggleChange}
          size="small"
          style={{ marginLeft: "auto" }}
        >
          <SensorToggleButton value="climate" label="Climate" shortLabel="C" />
          <SensorToggleButton
            value="indicators"
            label="Indicators"
            shortLabel="In"
          />
        </ToggleButtonGroup>
      </div>

      {/* Conditionally render Climate data */}
      {selectedOption === "climate" && (
        <div className="sensor-data-text-container">
          <div className="sensor-left-column">
            <p>Temperature:</p>
            <p>Humidity:</p>
            <p>Air Pressure:</p>
          </div>
          <div className="sensor-right-column">
            <p>
              {gasSensor?.temperature !== undefined &&
              gasSensor.temperature !== null
                ? `${convertCelsiusToFahrenheit(gasSensor.temperature).toFixed(
                    2
                  )} °F`
                : "N/A"}
            </p>
            <p>
              {gasSensor?.humidity !== undefined && gasSensor.humidity !== null
                ? `${gasSensor.humidity.toFixed()} %`
                : "N/A"}
            </p>
            <p>
              {gasSensor?.airPressure !== undefined &&
              gasSensor.airPressure !== null
                ? `${gasSensor.airPressure.toFixed()} kPa`
                : "N/A"}
            </p>
          </div>
        </div>
      )}

      {/* Conditionally render Indicators data */}
      {selectedOption === "indicators" && (
        <div className="sensor-data-text-container">
          <div className="sensor-left-column">
            <p>Gas Resistance:</p>
            <p>Air Quality Index:</p>
            <p>Illumination (lux):</p>
          </div>
          <div className="sensor-right-column">
            <p>
              {gasSensor?.gasResistance !== undefined &&
              gasSensor.gasResistance !== null
                ? `${gasSensor.gasResistance.toFixed()} Ω`
                : "N/A"}
            </p>
            <p>
              {gasSensor?.airQualityIndex !== undefined &&
              gasSensor.airQualityIndex !== null
                ? `${gasSensor.airQualityIndex.toFixed(2)}`
                : "N/A"}
            </p>
            <p>
              {lux !== undefined && lux !== null ? `${lux.toFixed()}` : "N/A"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SensorBox;
