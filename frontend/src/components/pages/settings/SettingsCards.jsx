import React from "react";
import "../../../styles/Settings.css";
import ApiKeySvg from "../../../assets/settings/API-Key.svg";
import UsersSvg from "../../../assets/settings/Users.svg";
import ResetSvg from "../../../assets/settings/Reset.svg";

const SettingsCards = () => {
  return (
    <div className="settings-grid-container">
      <div className="settings-card">
        <div className="card-content-container">
          <div className="settings-title">Rename this PheNode</div>
          <div className="settings-blue-text">0001:</div>
          <div className="settings-input-box"></div>
          <button className="settings-button">Rename</button>
        </div>
      </div>

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
          <div className="settings-blue-text">Centered Text 4</div>
          <div className="settings-input-box"></div>
          <button className="settings-button">Set</button>
        </div>
      </div>

      <div className="settings-card">
        <div className="card-content-container">
          <div className="settings-title">Get API access token</div>
          <div className="settings-svg-container">
            <img src={ApiKeySvg} alt="API Key Icon" className="settings-svg" />
          </div>
          <button className="settings-button">Copy access token</button>
        </div>
      </div>

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
