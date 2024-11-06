import React from "react";
import "../../../styles/Settings.css";
import UsersSvg from "../../../assets/settings/Users.svg";
import ResetSvg from "../../../assets/settings/Reset.svg";
import DeviceRename from "./DeviceRename";
import CopyAccessToken from "./AccessToken";

const SettingsCards = () => {
  return (
    <div className="settings-grid-container">
      <DeviceRename />

      <div className="settings-card">
        <div className="card-content-container">
          <div className="settings-title">Set image capture interval</div>
          <div className="settings-blue-text">
            (ex: 1 = 1 image per 24 hours, 2 = 1 image per 12 hours, 3 = 1 image
            per 8 hours, etc.)
          </div>
          <div className="settings-input-box"></div>
          <button className="settings-button">Set</button>
        </div>
      </div>

      <div className="settings-card">
        <div className="card-content-container">
          <div className="settings-title">Set image capture time</div>
          <div className="settings-blue-text">
            (Set hour, minute, and AM/PM)
          </div>
          <div className="settings-input-box"></div>
          <button className="settings-button">Set</button>
        </div>
      </div>

      <div className="settings-card">
        <div className="card-content-container">
          <div className="settings-title">Set Wi-Fi credentials</div>
          <div className="settings-ssid-input-box">SSID</div>
          <div className="settings-password-input-box">Password</div>
          <button className="settings-button">Set</button>
        </div>
      </div>

      <CopyAccessToken />

      <div className="settings-card">
        <div className="card-content-container">
          <div className="settings-title">Manage Account </div>
          <div className="settings-svg-container">
            <img src={UsersSvg} alt="Users Icon" className="settings-svg" />
          </div>
          <button className="settings-button">Manage Account</button>
        </div>
      </div>

      <div className="settings-card">
        <div className="card-content-container">
          <div className="settings-title">Remote Reset</div>
          <div className="settings-svg-container">
            <img
              src={ResetSvg}
              alt="Reset Icon"
              className="settings-reset-svg"
            />
          </div>
          <button className="settings-button">Reset PheNode</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsCards;
