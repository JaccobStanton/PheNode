import React from "react";
import DataPreferenceSvg from "../../../assets/toggle_buttons/Download_Data_Preferences_Icon.svg";

function DownloadTitle() {
  return (
    <>
      <div className="grid-item page-title">Download Data</div>
      <div className="grid-item cell-wifi-last-measurements">
        <div className="download-data-preferences-box">
          <span className="preferences-text">To Data Download Preferences</span>
          <div className="data-preference-svg-container">
            <img
              src={DataPreferenceSvg}
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
