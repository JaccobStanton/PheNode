import React from "react";
import "../styles/WSN.css";
// import WSNTitle from "../components/pages/wsn/Title";
import Title from "../components/pages/realtime/Title";
import Sensor from "../components/pages/wsn/Sensor";

function WSN() {
  return (
    <div className="realtime-grid">
      <div className="row-one">
        <Title />
      </div>
      <div className="row">
        <Sensor />
      </div>
      <div className="row">{/* <SensorData /> */}</div>
    </div>
  );
}

export default WSN;
