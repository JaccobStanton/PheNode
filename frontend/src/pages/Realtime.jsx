// src/components/CustomGrid.jsx
import React from "react";
import "../styles/Realtime.css";
import Title from "../components/pages/realtime/Title";
import PheNode from "../components/pages/realtime/PheNode";
import SensorData from "../components/pages/realtime/SensorData";
import PhenodeGrafana from "../components/pages/realtime/Grafana";
import RealtimeMobile from "../components/layouts/breakpoints/mobile/991px/RealtimeMobile";
import RealtimeMobileSmall from "../components/layouts/breakpoints/mobile/767px/RealtimeMobileSmall";

const Realtime = () => {
  return (
    <div className="realtime-grid">
      <div className="row-one">
        <Title />
      </div>
      <div className="row realtime-desktop">
        <PheNode />
      </div>
      {/* <div className="row realtime-mobile">
        <RealtimeMobile />
      </div> */}
      <div className="row realtime-mobile-767">
        <RealtimeMobileSmall />
      </div>
      {/* <div className="row">
        <SensorData />
      </div> */}
      <PhenodeGrafana />
    </div>
  );
};

export default Realtime;
