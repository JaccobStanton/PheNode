import React, { useState } from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { SensorToggleButton } from "../../../common/Button"; // Ensure the import path is correct
import { convertToDMS } from "../../../../utils/coordinateUtils";

function StatsBox({
  location,
  battery,
  externalSensorId,
  soilProbesConnected,
}) {
  const [selectedOption, setSelectedOption] = useState("0");

  // Calculate the number of connected soil probes
  const soilProbesConnectedCount = soilProbesConnected
    ? Object.values(soilProbesConnected).filter(Boolean).length
    : 0;

  const handleToggleChange = (event, newOption) => {
    if (newOption !== null) {
      setSelectedOption(newOption);
    }
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
            <p>{soilProbesConnectedCount}</p>
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
          <SensorToggleButton value="0" label="Connect" shortLabel="Conn." />
          <SensorToggleButton value="1" label="Battery" shortLabel="Bat." />
          <SensorToggleButton value="2" label="GPS" shortLabel="GPS" />
        </ToggleButtonGroup>
      </div>
      {renderContent()}
    </div>
  );
}

export default StatsBox;
