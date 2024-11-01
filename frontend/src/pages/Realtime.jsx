// src/components/CustomGrid.jsx
import React, { useState, useEffect } from "react";
import "../styles/Realtime.css";
import Title from "../components/pages/realtime/Title";
import PheNode from "../components/pages/realtime/PheNode";
import SensorData from "../components/pages/realtime/SensorData";
import PhenodeGrafana from "../components/pages/realtime/grafana/Grafana";
import RealtimeMobile from "../components/layouts/breakpoints/mobile/991px/RealtimeMobile";
import RealtimeMobileSmall from "../components/layouts/breakpoints/mobile/767px/RealtimeMobileSmall";

const Realtime = () => {
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

  // Conditional rendering logic based on viewport width
  const renderResponsiveComponent = () => {
    // Render PheNode and SensorData for 991px and above (including 1280px, 1440px, 1920px, 2560px)
    if (viewportWidth >= 1280) {
      return (
        <>
          <div className="row">
            <PheNode />
          </div>
          <div className="row">
            <SensorData />
          </div>
        </>
      );
    }
    // Render RealtimeMobile for widths between 767px and 991px
    else if (viewportWidth >= 990) {
      return <RealtimeMobile />;
    }
    // Render RealtimeMobileSmall for widths below 767px
    else {
      return <RealtimeMobileSmall />;
    }
  };

  return (
    <div className="realtime-grid">
      <div className="row-one">
        <Title />
      </div>
      <div>{renderResponsiveComponent()}</div>
      <PhenodeGrafana />
    </div>
  );
};

export default Realtime;
