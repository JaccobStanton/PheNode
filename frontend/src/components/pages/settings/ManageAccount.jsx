import React from "react";
import UsersSvg from "../../../assets/settings/Users.svg";

function ManageAccount() {
  const handleManageAccountClick = () => {
    window.open("https://auth.phenode.cloud/realms/grafana/account/", "_blank");
  };

  return (
    <div className="settings-card">
      <div className="card-content-container">
        <div className="settings-title">Manage Account</div>
        <div className="settings-svg-container">
          <img src={UsersSvg} alt="Users Icon" className="settings-svg" />
        </div>
        <button className="settings-button" onClick={handleManageAccountClick}>
          Manage Account
        </button>
      </div>
    </div>
  );
}

export default ManageAccount;
