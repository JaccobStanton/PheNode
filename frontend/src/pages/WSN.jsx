import React, { useState, useEffect } from "react";
import "../styles/WSN.css";
import Sensor from "../components/pages/wsn/Sensor";
import WSNTitle from "../components/pages/wsn/Title";
import SensorGrafana from "../components/pages/wsn/Grafana";
import SensorMobile from "../components/layouts/breakpoints/mobile/991px/SensorMobile";

function WSN() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  // Update the viewport width on window resize
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderResponsiveMobileComponent = () => {
    // Render Sensorfor 991px and above (including 1280px, 1440px, 1920px, 2560px)
    if (viewportWidth >= 1280) {
      return (
        <>
          <div className="row ">
            <Sensor />
          </div>
        </>
      );
    }

    // Render RealtimeMobileSmall for widths below 991px
    else {
      return (
        <div className="row sensor-mobile">
          <SensorMobile />
        </div>
      );
    }
  };
  return (
    <div className="realtime-grid">
      <div className="row-one">
        <WSNTitle />
      </div>
      <div>{renderResponsiveMobileComponent()}</div>
      <SensorGrafana />
    </div>
  );
}

export default WSN;
