import React from "react";
import "../styles/Download.css";
import "../styles/Realtime.css";
import DownloadTitle from "../components/pages/download/Title";
import DownloadBoxes from "../components/pages/download/DownloadBoxes";

function Download() {
  return (
    <div className="realtime-grid">
      <div className="row-one">
        <DownloadTitle />
      </div>
      <DownloadBoxes />

      {/* <SensorGrafana /> */}
    </div>
  );
}

export default Download;
