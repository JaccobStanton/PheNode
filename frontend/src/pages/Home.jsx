// Home.jsx
import React, { useEffect } from "react";
import HomeTitle from "../components/pages/home/Title";
import FleetOverview from "../components/pages/home/FleetOverview";
import { useAppContext } from "../context/AppContext";

function Home() {
  const { devices, devicesLoading, devicesError } = useAppContext(); // Fetch devices from context

  // Debugging: Log devices data, loading state, and errors
  useEffect(() => {
    console.log("Devices in Home:", devices);
    console.log("Devices Loading in Home:", devicesLoading);
    console.log("Devices Error in Home:", devicesError);
  }, [devices, devicesLoading, devicesError]);

  return (
    <div className="realtime-grid">
      <div className="row-one">
        <HomeTitle />
      </div>
      <div className="row">
        <FleetOverview
          devices={devices}
          devicesLoading={devicesLoading}
          devicesError={devicesError}
        />
      </div>
    </div>
  );
}

export default Home;
