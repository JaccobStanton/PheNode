import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { toast } from "react-toastify";
import { userHasRole } from "../../../utils/authUtils";
import DataPreferenceInactive from "../../../assets/toggle_buttons/Download_Data_Preferences_Icon_Inactive.svg";
import DataPreferenceActive from "../../../assets/toggle_buttons/Download_Data_Preferences_Icon_Active.svg";

function DownloadTitle() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();

  const handleNavigate = () => {
    if (userHasRole(keycloak, "phenode-editor")) {
      navigate("/preferences");
    } else {
      toast.error(
        "Permissions required to access this function. Please contact your admin."
      );
    }
  };

  return (
    <>
      <div className="grid-item page-title">Download Data</div>
      <div className="grid-item cell-wifi-last-measurements">
        <div className="download-data-preferences-box">
          <span className="preferences-text">To Data Download Preferences</span>
          <div
            className="data-preference-svg-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleNavigate}
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
