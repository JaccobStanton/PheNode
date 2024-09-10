import React, { useState, useEffect } from "react";
import "../styles/WSN.css";
import Sensor from "../components/pages/wsn/Sensor";
import WSNTitle from "../components/pages/wsn/Title";
import SensorGrafana from "../components/pages/wsn/Grafana";
import SensorMobile from "../components/breakpoints/SensorMobile";

function WSN() {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 991);

  // Update state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 991);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="realtime-grid">
      <div className="row-one">
        <WSNTitle />
      </div>
      <div className="row">{isMobileView ? <SensorMobile /> : <Sensor />}</div>
      <SensorGrafana />
    </div>
  );
}

export default WSN;
