import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
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
  //logic for dropdown menu
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  //logic for toggle buttons
  const [hoveredButton, setHoveredButton] = useState(null);
  const location = useLocation();

  //logic for dropdown menu
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          <div className="inner-box left-box">User 0000</div>
          <button className="inner-box logout-button">Logout</button>
        </div>
      </div>
      <div className="grid-item-left">
        <div className="navbar-dropdown">
          <button className="navbar-dropdown-button">Select PheNode...</button>
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
