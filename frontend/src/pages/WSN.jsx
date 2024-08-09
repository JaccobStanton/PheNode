import React from "react";
import "../styles/WSN.css";
import Sensor from "../components/pages/wsn/Sensor";
import WSNTitle from "../components/pages/wsn/Title";
import SensorGrafana from "../components/pages/wsn/Grafana";

function WSN() {
  return (
    <div className="realtime-grid">
      <div className="row-one">
        <WSNTitle />
      </div>
      <div className="row">
        <Sensor />
      </div>
      <SensorGrafana />
    </div>
  );
}

export default WSN;
