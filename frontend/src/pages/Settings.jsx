import React from "react";
import SettingsTitle from "../components/pages/settings/Title";
import SettingsCards from "../components/pages/settings/SettingsCards";

function Settings() {
  return (
    <div className="realtime-grid">
      <div className="row-one">
        <SettingsTitle />
      </div>
      <div className="row">
        <SettingsCards />
      </div>
    </div>
  );
}

export default Settings;
