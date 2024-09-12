import React from "react";
import "../styles/WSN.css";
import Sensor from "../components/pages/wsn/Sensor";
import WSNTitle from "../components/pages/wsn/Title";
import SensorGrafana from "../components/pages/wsn/Grafana";
import SensorMobile from "../components/layouts/breakpoints/mobile/991px/SensorMobile";

function WSN() {
  return (
    <div className="realtime-grid">
      <div className="row-one">
        <WSNTitle />
      </div>

      {/* Desktop Sensor */}
      <div className="row sensor-desktop">
        <Sensor />
      </div>

      {/* Mobile Sensor */}
      <div className="row sensor-mobile">
        <SensorMobile />
      </div>

      <SensorGrafana />
    </div>
  );
}

export default WSN;
