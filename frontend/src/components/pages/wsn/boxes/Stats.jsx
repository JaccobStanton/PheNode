import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useMediaQuery } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { convertToDMS } from "../../../../utils/coordinateUtils";

function StatsBox({ location, battery, externalSensorId }) {
  const isLargeScreen = useMediaQuery("(min-width:1440px)");

  const [selectedOption, setSelectedOption] = useState("0");

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
            sm: "0.45em",
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

  const renderContent = () => {
    if (selectedOption === "0") {
      return (
        <div className="sensor-data-text-container">
          <div className="sensor-left-column">
            <p>Sensor ID:</p>
            <p>Soil Probes:</p>
            <p>Connected:</p>
          </div>
          <div className="sensor-right-column">
            <p>{externalSensorId}</p>
            <p>2 available</p>
            <p>0</p>
          </div>
        </div>
      );
    } else if (selectedOption === "1") {
      return (
        <div className="sensor-data-text-container">
          <div className="sensor-left-column">
            <p>Battery Remaining:</p>
            <p>Battery Depleted:</p>
            <p>Battery Voltage:</p>
          </div>
          <div className="sensor-right-column">
            <p>
              {battery?.batteryPercent !== undefined
                ? `${battery.batteryPercent.toFixed(2)}%`
                : "N/A"}
            </p>
            <p>
              {battery?.batteryPercent !== undefined
                ? `${(100 - battery.batteryPercent).toFixed(2)}%`
                : "N/A"}
            </p>

            <p>
              {battery?.batteryVoltage !== undefined
                ? `${battery.batteryVoltage.toFixed(2)} V`
                : "N/A"}
            </p>
          </div>
        </div>
      );
    } else if (selectedOption === "2") {
      return (
        <div className="sensor-data-text-container">
          <div className="sensor-left-column">
            <p>Latitude</p>
            <p>Longitude:</p>
            <p>Altitude:</p>
          </div>
          <div className="sensor-right-column">
            <p>
              {location?.latitude !== undefined
                ? convertToDMS(location.latitude, true)
                : "N/A"}
            </p>
            <p>
              {location?.longitude !== undefined
                ? convertToDMS(location.longitude, true)
                : "N/A"}
            </p>
            <p>
              {location?.altitude !== undefined
                ? `${(location.altitude * 3.28084).toFixed(2)} ft`
                : "N/A"}
            </p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="grid-item sensor-data-value-boxes">
      <div className="sensor-data-title-container">
        <h3 className="sensor-data-title">Stats</h3>
        <ToggleButtonGroup
          value={selectedOption}
          exclusive
          onChange={handleToggleChange}
          size="small"
          style={{ marginLeft: "auto" }}
        >
          {renderButton("0", "Connect", "Conn.")}
          {renderButton("1", "Battery", "Bat.")}
          {renderButton("2", "GPS", "GPS")}
        </ToggleButtonGroup>
      </div>
      {renderContent()}
    </div>
  );
}

export default StatsBox;
