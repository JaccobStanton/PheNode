import React, { useState, useEffect } from "react";
import "../styles/Realtime.css";
import Title from "../components/pages/realtime/Title";
import PheNode from "../components/pages/realtime/PheNode";
import SensorData from "../components/pages/realtime/SensorData";
import PhenodeGrafana from "../components/pages/realtime/grafana/Grafana";
import RealtimeMobile from "../components/layouts/breakpoints/mobile/991px/RealtimeMobile";
import RealtimeMobileSmall from "../components/layouts/breakpoints/mobile/767px/RealtimeMobileSmall";
import { useAppContext } from "../context/AppContext";

//!PROVIDES DATA AS PROPS TO CHILDREN COMPONENTs, <Realtime />

const Realtime = () => {
  const { devices, setSelectedDevice } = useAppContext();
  const [selectedDevice, setLocalSelectedDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  // Fetch logic in parent component
  useEffect(() => {
    if (devices.length > 0) {
      setLocalSelectedDevice(devices[0]); // Automatically select the first device
      setSelectedDevice(devices[0]); // Update global context
      setLoading(false);
    } else {
      setLoading(false);
      setError(new Error("No devices available."));
    }
  }, [devices, setSelectedDevice]);

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
    if (viewportWidth >= 1280) {
      return (
        <>
          <div className="row">
            <PheNode
              selectedDevice={selectedDevice}
              loading={loading}
              error={error}
            />
          </div>
          <div className="row">
            <SensorData />
          </div>
        </>
      );
    } else if (viewportWidth >= 990) {
      return <RealtimeMobile />;
    } else {
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
