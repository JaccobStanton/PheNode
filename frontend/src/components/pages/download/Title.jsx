import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataPreferenceInactive from "../../../assets/toggle_buttons/Download_Data_Preferences_Icon_Inactive.svg";
import DataPreferenceActive from "../../../assets/toggle_buttons/Download_Data_Preferences_Icon_Active.svg";

function DownloadTitle() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/preferences");
  };
  return (
    <>
      <div className="grid-item page-title">Download Data</div>
      <div className="grid-item cell-wifi-last-measurements">
        <div className="download-data-preferences-box" onClick={handleNavigate}>
          <span className="preferences-text">To Data Download Preferences</span>
          <div
            className="data-preference-svg-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={isHovered ? DataPreferenceActive : DataPreferenceInactive}
              alt="Data Preference Icon"
              className="data-preference-svg"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default DownloadTitle;
