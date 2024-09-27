import React, { useEffect } from "react";
import useFleetData from "../../hooks/useFleetData";
import { useSelectedDevice } from "../../context/SelectedDeviceContext";

const FleetDropdownMenu = () => {
  const { data: fleetData, loading, error } = useFleetData();
  const { selectedDevice, setSelectedDevice } = useSelectedDevice();

  // Automatically sets the initial device if selectedDevice is not already set.
  useEffect(() => {
    if (!selectedDevice && fleetData.length > 0) {
      setSelectedDevice(fleetData[0]); // Set the first device by default
    }
  }, [fleetData, selectedDevice, setSelectedDevice]);

  // Updates the context with the selected device when the user selects an option from the dropdown.
  const handleDropdownChange = (e) => {
    const selectedLabel = e.target.value;
    const selectedDeviceData = fleetData.find(
      (device) => device.label === selectedLabel
    );
    setSelectedDevice(selectedDeviceData);
  };

  return (
    <div className="navbar-dropdown">
      <select
        className="navbar-dropdown-menu"
        onChange={handleDropdownChange}
        value={selectedDevice ? selectedDevice.label : ""}
      >
        <option value="" disabled>
          Select PheNode...
        </option>
        {loading && <option>Loading...</option>}
        {error && <option>Error loading data</option>}
        {!loading &&
          !error &&
          fleetData.map((item) => (
            //The dropdown's value is set to selectedDevice.label to reflect the currently selected PheNode.
            <option key={item.id} value={item.label}>
              {item.label}
            </option>
          ))}
      </select>
    </div>
  );
};

export default FleetDropdownMenu;
