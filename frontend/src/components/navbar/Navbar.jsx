import React, { useState } from "react";
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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
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
        <div className="dropdown">
          <button onClick={toggleDropdown} className="dropdown-button">
            Select PheNode...
          </button>
          {isOpen && (
            <div className="dropdown-content">
              <a href="#option1">Option 1</a>
              <a href="#option2">Option 2</a>
              <a href="#option3">Option 3</a>
            </div>
          )}
        </div>
      </div>
      <div className="grid-item-right-corner-bottom">
        <div className="toggle-buttons-container">
          <Link to="/">
            <button className="toggle-button">
              <img
                src={HomeIconInactive}
                alt="Realtime Icon"
                className="button-icon"
              />
            </button>
          </Link>
          <Link to="/">
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
