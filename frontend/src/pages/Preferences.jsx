import React from "react";
import PreferencesTitle from "../components/pages/preferences/Title";
import DownloadPreferences from "../components/pages/preferences/DownloadPreferences";

function Preferences() {
  return (
    <div className="realtime-grid">
      <div className="row-one">
        <PreferencesTitle />
      </div>
      <div className="row">{<DownloadPreferences />}</div>
      <div className="row">{/* <SensorData /> */}</div>
      {/* <PhenodeGrafana /> */}
    </div>
  );
}

export default Preferences;
