import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useMediaQuery } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { convertCelsiusToFahrenheit } from "../../../../utils/temperatureUtils";

function SensorBox({ gasSensor, lux }) {
  const [selectedOption, setSelectedOption] = useState("climate");

  // Check if the screen width is at least 1440px
  const isLargeScreen = useMediaQuery("(min-width:1440px)");

  const handleToggleChange = (event, newOption) => {
    if (newOption !== null) {
      setSelectedOption(newOption);
    }
  };

  const renderButton = (value, label, shortLabel) => {
    const content = (
      <ToggleButton
        value={value}
        sx={{
          fontSize: {
            xs: "0.70rem",
            sm: "0.45rem",
            md: "0.45rem",
            lg: "0.6rem",
            xl: "0.6rem",
            customXL: "0.85rem",
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
        <h3 className="sensor-data-title">Sensor Data</h3>
        <ToggleButtonGroup
          value={selectedOption}
          exclusive
          onChange={handleToggleChange}
          size="small"
          style={{ marginLeft: "auto" }}
        >
          {renderButton("climate", "Climate", "C")}
          {renderButton("indicators", "Indicators", "In")}
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
