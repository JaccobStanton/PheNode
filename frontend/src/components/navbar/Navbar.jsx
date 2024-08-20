import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../../styles/Navbar.css";
import Logo from "../../assets/logo/Logo.svg";
import HomeIconInactive from "../../assets/toggle_buttons/Home_Icon_Inactive.svg";
import RealTimeIconInactive from "../../assets/toggle_buttons/Real_Time_Icon_Inactive.svg";
import WirelessSensorIconInactive from "../../assets/toggle_buttons/Wireless_Sensor_Inactive_Icon.svg";
import DownloadIconInactive from "../../assets/toggle_buttons/Download_Icon_Inactive.svg";
import SettingsIconInactive from "../../assets/toggle_buttons/Settings_Icon_Inactive.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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
        <div className="navbar-dropdown" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="navbar-dropdown-button">
            Select PheNode...
          </button>
          {isOpen && (
            <div className="navbar-dropdown-content show">
              <a href="#option1">PheNode_0001</a>
              <a href="#option2">PheNode_0002</a>
              <a href="#option3">PheNode_0003</a>
            </div>
          )}
        </div>
      </div>
      <div className="grid-item-right-corner-bottom">
        <div className="toggle-buttons-container">
          <Link to="/home">
            <button className="toggle-button">
              <img
                src={HomeIconInactive}
                alt="Realtime Icon"
                className="button-icon"
              />
            </button>
          </Link>
          <Link to="/realtime">
            <button className="toggle-button">
              <img
                src={RealTimeIconInactive}
                alt="Realtime Icon"
                className="button-icon"
              />
            </button>
          </Link>
          <Link to="/wsn">
            <button className="toggle-button">
              <img
                src={WirelessSensorIconInactive}
                alt="Wireless Sensor Icon"
                className="button-icon"
              />
            </button>
          </Link>
          <Link to="/download">
            <button className="toggle-button">
              <img
                src={DownloadIconInactive}
                alt="Download Icon"
                className="button-icon"
              />
            </button>
          </Link>
          <Link to="/settings">
            <button className="toggle-button">
              <img
                src={SettingsIconInactive}
                alt="Download Icon"
                className="button-icon"
              />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
