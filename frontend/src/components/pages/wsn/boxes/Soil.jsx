import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { convertCelsiusToFahrenheit } from "../../../../utils/temperatureUtils";

function SoilBox({ soilSensors }) {
  const [selectedOption, setSelectedOption] = useState("0");

  const handleToggleChange = (event, newOption) => {
    if (newOption !== null) {
      setSelectedOption(newOption);
      console.log(
        `Toggle button clicked: ${newOption === "0" ? "1 foot" : "2 feet"}`
      );
    }
  };

  const selectedSensorIndex = parseInt(selectedOption, 10);
  const selectedSoilSensor = soilSensors && soilSensors[selectedSensorIndex];

  console.log(`Selected Option Index: ${selectedSensorIndex}`);
  console.log("Selected Soil Sensor Data:", selectedSoilSensor);

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
          <ToggleButton
            value="0"
            sx={{
              fontSize: "0.70rem",
              padding: "2px 8px",
              color: "var(--dark-blue)",
              borderColor: "var(--reflected-light)",
              backgroundColor: "transparent",
              "&.Mui-selected": {
                backgroundColor: "rgba(18, 88, 170, 0.6)",
                color: "var(--green)",
              },
              "&.Mui-selected:focus": {
                outline: "none",
                boxShadow: "none",
              },
              "&:hover": {
                borderColor: "var(--green)",
              },
            }}
          >
            1 foot
          </ToggleButton>
          <ToggleButton
            value="1"
            sx={{
              fontSize: "0.70rem",
              padding: "2px 8px",
              color: "var(--dark-blue)",
              borderColor: "var(--reflected-light)",
              backgroundColor: "transparent",
              "&.Mui-selected": {
                backgroundColor: "rgba(18, 88, 170, 0.6)",
                color: "var(--green)",
              },
              "&.Mui-selected:focus": {
                outline: "none",
                boxShadow: "none",
              },
              "&:hover": {
                borderColor: "var(--green)",
              },
            }}
          >
            2 feet
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="sensor-data-text-container">
        <div className="sensor-left-column">
          <p>Soil Temp:</p>
          <p>Soil Moisture:</p>
          <p>Soil Salinity:</p>
          <p>VWC:</p>
        </div>
        <div className="sensor-right-column">
          <p>
            {selectedSoilSensor?.soilTemperature !== undefined &&
            selectedSoilSensor.soilTemperature !== null
              ? `${convertCelsiusToFahrenheit(
                  selectedSoilSensor.soilTemperature
                ).toFixed(2)} °F`
              : "N/A"}
          </p>
          <p>
            {selectedSoilSensor?.soilMoisture !== undefined &&
            selectedSoilSensor.soilMoisture !== null
              ? `${selectedSoilSensor.soilMoisture.toFixed(2)} %`
              : "N/A"}
          </p>
          <p>
            {selectedSoilSensor?.electricalConductivity !== undefined &&
            selectedSoilSensor.electricalConductivity !== null
              ? `${selectedSoilSensor.electricalConductivity.toFixed()} ds/m`
              : "N/A"}
          </p>
          <p>
            {selectedSoilSensor?.vwc !== undefined &&
            selectedSoilSensor.vwc !== null
              ? `${selectedSoilSensor.vwc.toFixed(2)} %`
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SoilBox;
