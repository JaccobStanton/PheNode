import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/Navbar.css";
import Logo from "../../assets/logo/Logo.svg";
import HomeIconInactive from "../../assets/toggle_buttons/Home_Icon_Inactive.svg";
import RealTimeIconInactive from "../../assets/toggle_buttons/Real_Time_Icon_Inactive.svg";
import WirelessSensorIconInactive from "../../assets/toggle_buttons/Wireless_Sensor_Inactive_Icon.svg";
import DownloadIconInactive from "../../assets/toggle_buttons/Download_Icon_Inactive.svg";
import SettingsIconInactive from "../../assets/toggle_buttons/Settings_Icon_Inactive.svg";

import HomeIconActive from "../../assets/toggle_buttons/Home_Icon_Active.svg";
import RealTimeIconActive from "../../assets/toggle_buttons/Real_Time_Icon_Active.svg";
import WirelessSensorIconActive from "../../assets/toggle_buttons/Wireless_Sensor_Active_Icon.svg";
import DownloadIconActive from "../../assets/toggle_buttons/Download_Icon_Active.svg";
import SettingsIconActive from "../../assets/toggle_buttons/Settings_Icon_Active.svg";

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigateLogin = () => {
    navigate("/");
  };
  //dropdown logic
  const [showDropdownOptions, setDropdownOptions] = useState(false);

  const handleNavDropdownChange = (e, setDropdownOptions) => {
    if (e.target.value === "Flag with custom value") {
      setDropdownOptions(true);
    } else {
      setDropdownOptions(false);
    }
  };
  //----------------
  //logic for toggle buttons
  const [hoveredButton, setHoveredButton] = useState(null);
  const location = useLocation();

  //logic for toggle button hovering
  const handleMouseEnter = (button) => {
    setHoveredButton(button);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  // Function to determine if the button should show the active icon
  const isActive = (path) => {
    return location.pathname === path || hoveredButton === path;
  };

  return (
    <div className="navbar-grid">
      <div className="grid-item-left">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      <div className="grid-item-right-corner">
        <div className="user-logout-container">
          <div className="inner-box logout-box">User 0000</div>
          <button
            className="inner-box logout-button"
            onClick={handleNavigateLogin}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="grid-item-left">
        <div className="navbar-dropdown">
          <select
            className="navbar-dropdown-menu"
            onChange={(e) => handleNavDropdownChange(e, setDropdownOptions)}
          >
            <option value="" disabled selected>
              Select PheNode...
            </option>
            <option>PheNode_001</option>
            <option>PheNode_002</option>
            <option>PheNode_003</option>
            <option>PheNode_004</option>
          </select>
        </div>
      </div>
      <div className="grid-item-right-corner-bottom">
        <div className="toggle-buttons-container">
          <Link to="/home">
            <button
              className={`toggle-button ${isActive("/home") ? "active" : ""}`}
              onMouseEnter={() => handleMouseEnter("/home")}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={isActive("/home") ? HomeIconActive : HomeIconInactive}
                alt="Home Icon"
                className="button-icon"
              />
            </button>
          </Link>
          <Link to="/realtime">
            <button
              className={`toggle-button ${
                isActive("/realtime") ? "active" : ""
              }`}
              onMouseEnter={() => handleMouseEnter("/realtime")}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={
                  isActive("/realtime")
                    ? RealTimeIconActive
                    : RealTimeIconInactive
                }
                alt="Realtime Icon"
                className="button-icon"
              />
            </button>
          </Link>
          <Link to="/wsn">
            <button
              className={`toggle-button ${isActive("/wsn") ? "active" : ""}`}
              onMouseEnter={() => handleMouseEnter("/wsn")}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={
                  isActive("/wsn")
                    ? WirelessSensorIconActive
                    : WirelessSensorIconInactive
                }
                alt="Wireless Sensor Icon"
                className="wsn-button-icon"
              />
            </button>
          </Link>
          <Link to="/download">
            <button
              className={`toggle-button ${
                isActive("/download") ? "active" : ""
              }`}
              onMouseEnter={() => handleMouseEnter("/download")}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={
                  isActive("/download")
                    ? DownloadIconActive
                    : DownloadIconInactive
                }
                alt="Download Icon"
                className="download-button-icon"
              />
            </button>
          </Link>
          <Link to="/settings">
            <button
              className={`toggle-button ${
                isActive("/settings") ? "active" : ""
              }`}
              onMouseEnter={() => handleMouseEnter("/settings")}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={
                  isActive("/settings")
                    ? SettingsIconActive
                    : SettingsIconInactive
                }
                alt="Settings Icon"
                className="settings-button-icon"
              />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
