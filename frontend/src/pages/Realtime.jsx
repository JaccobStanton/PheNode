// src/components/CustomGrid.jsx
import React from "react";
import "../styles/Realtime.css";

import Title from "../components/pages/realtime/Title";
import PheNode from "../components/pages/realtime/PheNode";
import SensorData from "../components/pages/realtime/SensorData";

const Realtime = () => {
  return (
    <div className="realtime-grid">
      <div className="row-one">
        <Title />
      </div>
      <div className="row">
        <PheNode />
      </div>
      <div className="row">
        <SensorData />
      </div>
    </div>
  );
};

export default Realtime;
