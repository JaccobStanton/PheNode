import React, { useState } from "react";
import "../../../styles/Preferences.css";

function DownloadPreferences() {
  const [showCustomInput1, setShowCustomInput1] = useState(false);
  const [showCustomInput2, setShowCustomInput2] = useState(false);
  const [showCustomInput3, setShowCustomInput3] = useState(false);

  const handleDropdownChange = (e, setShowCustomInput) => {
    if (e.target.value === "Flag with custom value") {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
    }
  };
  return (
    <div className="preferences-main-container">
      <div className="preferences-columns-container">
        <div className="preferences-column-one">
          <div className="preferences-box">
            <div className="preferences-text">In the case of zeros...</div>
            <select
              className="preferences-dropdown"
              onChange={(e) => handleDropdownChange(e, setShowCustomInput1)}
            >
              <option>Leave zero</option>
              <option>Delete and leave cell blank</option>
              <option>Impute with mean substitution</option>
              <option>Flag with custom value</option>
            </select>
            {showCustomInput1 && (
              <input
                type="text"
                className="preferences-input"
                placeholder="Enter custom value"
              />
            )}
          </div>
          <div className="preferences-box">
            <div className="preferences-text">
              Desired number of decimal places...
            </div>
            <select className="preferences-dropdown">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>No limit</option>
            </select>
          </div>
        </div>
        <div className="preferences-column-two">
          <div className="preferences-box">
            <div className="preferences-text">In the case of zeros...</div>
            <select
              className="preferences-dropdown"
              onChange={(e) => handleDropdownChange(e, setShowCustomInput2)}
            >
              <option>Leave zero</option>
              <option>Delete and leave cell blank</option>
              <option>Impute with mean substitution</option>
              <option>Flag with custom value</option>
            </select>
            {showCustomInput2 && (
              <input
                type="text"
                className="preferences-input"
                placeholder="Enter custom value"
              />
            )}
          </div>
          <div className="preferences-box">
            <div className="preferences-text">Select a time zone...</div>
            <select className="preferences-dropdown">
              <option>Coordinated Universal Time (GMT)</option>
              <option>Eastern Standard Time (GMT-5)</option>
              <option>Central Standard Time (GMT-6)</option>
              <option>Mountain Standard Time (GMT-7) </option>
              <option>Pacific Standard Time (GMT-8)</option>
            </select>
          </div>
        </div>
        <div className="preferences-column-three">
          <div className="preferences-box">
            <div className="preferences-text">In the case of zeros...</div>
            <select
              className="preferences-dropdown"
              onChange={(e) => handleDropdownChange(e, setShowCustomInput3)}
            >
              <option>Leave zero</option>
              <option>Delete and leave cell blank</option>
              <option>Impute with mean substitution</option>
              <option>Flag with custom value</option>
            </select>
            {showCustomInput3 && (
              <input
                type="text"
                className="preferences-input"
                placeholder="Enter custom value"
              />
            )}
          </div>
          <div className="preferences-box">
            <div className="preferences-text">In the case of hyphens...</div>
            <select className="preferences-dropdown">
              <option>Replace with underscore</option>
              <option>Leave hyphen</option>
              <option>Delete hyphen</option>
            </select>
          </div>
        </div>
      </div>
      <div className="preferences-row preferences-button-row">
        <button className="preferences-update-button">
          Update Data Preferences
        </button>
      </div>
    </div>
  );
}

export default DownloadPreferences;
