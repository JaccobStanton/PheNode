import React from "react";

function SensorDropdownMenu() {
  return (
    <div className="dropdown-wsn">
      {/* Dropdown to select wireless sensor */}
      <select
        className="dropdown-menu-wsn"
        onChange={(e) => handleDropdownChange(e)}
      >
        <option value="" disabled selected>
          Select Wireless Sensor...
        </option>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </select>
    </div>
  );
}

export default SensorDropdownMenu;
