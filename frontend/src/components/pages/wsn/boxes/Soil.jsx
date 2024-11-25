import React, { useState } from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { SensorToggleButton } from "../../../common/Button"; // Adjust the import path if needed
import { convertCelsiusToFahrenheit } from "../../../../utils/temperatureUtils";

function SoilBox({ soilSensors }) {
  const [selectedOption, setSelectedOption] = useState("0");

  const handleToggleChange = (event, newOption) => {
    if (newOption !== null) {
      setSelectedOption(newOption);
    }
  };

  const selectedSensorIndex = parseInt(selectedOption, 10);
  const selectedSoilSensor = soilSensors && soilSensors[selectedSensorIndex];

  return (
    <div className="grid-item sensor-data-value-boxes">
      <div className="sensor-data-title-container">
        <h3 className="sensor-data-title">Soil Data</h3>
        <ToggleButtonGroup
          value={selectedOption}
          exclusive
          onChange={handleToggleChange}
          size="small"
          style={{ marginLeft: "auto" }}
        >
          <SensorToggleButton value="0" label="Probe 1" shortLabel="P1" />
          <SensorToggleButton value="1" label="Probe 2" shortLabel="P2" />
        </ToggleButtonGroup>
      </div>
      <div className="sensor-data-text-container">
        <div className="sensor-left-column">
          <p>Soil Temp:</p>
          <p>Soil Moisture:</p>
          <p>Soil Salinity:</p>
        </div>
        <div className="sensor-right-column">
          <p>
            {selectedSoilSensor?.soilTemperature !== undefined &&
            selectedSoilSensor.soilTemperature !== null
              ? `${Math.max(
                  convertCelsiusToFahrenheit(
                    selectedSoilSensor.soilTemperature
                  ),
                  0
                ).toFixed(2)} °F`
              : "N/A"}
          </p>
          <p>
            {selectedSoilSensor?.soilMoisture !== undefined &&
            selectedSoilSensor.soilMoisture !== null
              ? `${Math.max(selectedSoilSensor.soilMoisture, 0).toFixed(2)} %`
              : "N/A"}
          </p>
          <p>
            {selectedSoilSensor?.electricalConductivity !== undefined &&
            selectedSoilSensor.electricalConductivity !== null
              ? `${Math.max(
                  selectedSoilSensor.electricalConductivity,
                  0
                ).toFixed()} ds/m`
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SoilBox;
