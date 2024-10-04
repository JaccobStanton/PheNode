import React, { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";

const FleetDropdownMenu = () => {
  const { devices, selectedDevice, setSelectedDevice } = useAppContext(); // Access devices and selectedDevice from AppContext

  // Automatically set the initial device if selectedDevice is not already set
  useEffect(() => {
    if (!selectedDevice && devices.length > 0) {
      setSelectedDevice(devices[0]); // Set the first device by default
    }
  }, [devices, selectedDevice, setSelectedDevice]);

  // Update the context with the selected device when the user selects an option from the dropdown
  const handleDropdownChange = (e) => {
    const selectedLabel = e.target.value;
    const selectedDeviceData = devices.find(
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
        {devices.length === 0 && <option>Loading...</option>}
        {devices.map((item) => (
          <option key={item._id} value={item.label || "No Label"}>
            {item.label || "No Label"}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FleetDropdownMenu;
