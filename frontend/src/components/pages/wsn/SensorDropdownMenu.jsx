import React from "react";
import { useAppContext } from "../../../context/AppContext";

function SensorDropdownMenu() {
  const {
    wirelessSensorList,
    selectedWirelessSensor,
    setSelectedWirelessSensor,
  } = useAppContext();

  const handleDropdownChange = (e) => {
    const selectedSensorId = e.target.value;
    // Find the selected sensor from the list
    const selectedSensor = wirelessSensorList.find(
      (sensor) => sensor.externalSensorId === selectedSensorId
    );
    // Update the selectedWirelessSensor in the context
    setSelectedWirelessSensor(selectedSensor);
  };

  return (
    <div className="dropdown-wsn">
      {/* Dropdown to select wireless sensor */}
      <select
        className="dropdown-menu-wsn"
        onChange={handleDropdownChange}
        value={selectedWirelessSensor?.externalSensorId || ""}
      >
        {wirelessSensorList.length === 0 ? (
          <option value="" disabled>
            No sensors available
          </option>
        ) : (
          wirelessSensorList.map((sensor) => (
            <option
              key={sensor.externalSensorId}
              value={sensor.externalSensorId}
            >
              {sensor.label || sensor.externalSensorId}
            </option>
          ))
        )}
      </select>
    </div>
  );
}

export default SensorDropdownMenu;
