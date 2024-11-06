import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useMediaQuery } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { convertCelsiusToFahrenheit } from "../../../../utils/temperatureUtils";

function SoilBox({ soilSensors }) {
  // Check if the screen width is at least 1440px
  const isLargeScreen = useMediaQuery("(min-width:1440px)");

  const [selectedOption, setSelectedOption] = useState("0");

  const handleToggleChange = (event, newOption) => {
    if (newOption !== null) {
      setSelectedOption(newOption);
    }
  };

  const selectedSensorIndex = parseInt(selectedOption, 10);
  const selectedSoilSensor = soilSensors && soilSensors[selectedSensorIndex];

  const renderButton = (value, label, shortLabel) => {
    const content = (
      <ToggleButton
        value={value}
        sx={{
          fontSize: {
            xs: "0.70rem",
            sm: "0.45em",
            md: "0.45rem",
            lg: "0.7rem",
            xl: "0.7rem",
          },
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
        {isLargeScreen ? label : shortLabel}
      </ToggleButton>
    );

    return isLargeScreen ? content : <Tooltip title={label}>{content}</Tooltip>;
  };

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
          {renderButton("0", "1 foot", '12"')}
          {renderButton("1", "2 feet", '24"')}
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
        </div>
      </div>
    </div>
  );
}

export default SoilBox;
