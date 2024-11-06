import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import ApiKeySvg from "../../../assets/settings/API-Key.svg";
import { toast } from "react-toastify";

function CopyAccessToken() {
  const { keycloak } = useKeycloak();

  const copyTokenToClipboard = () => {
    if (keycloak && keycloak.token) {
      navigator.clipboard
        .writeText(keycloak.token)
        .then(() => {
          toast.success("Access token copied to clipboard!");
        })
        .catch((error) => {
          console.error("Failed to copy access token: ", error);
          toast.error("Failed to copy access token");
        });
    } else {
      toast.error("User is not authenticated or token is unavailable");
    }
  };

  return (
    <div className="settings-card">
      <div className="card-content-container">
        <div className="settings-title">Get API access token</div>
        <div className="settings-svg-container">
          <img src={ApiKeySvg} alt="API Key Icon" className="settings-svg" />
        </div>
        <button className="settings-button" onClick={copyTokenToClipboard}>
          Copy access token
        </button>
      </div>
    </div>
  );
}

export default CopyAccessToken;
