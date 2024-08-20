import React from "react";
import HomeTitle from "../components/pages/home/Title";
import FleetOverview from "../components/pages/home/FleetOverview";

function Home() {
  return (
    <div className="realtime-grid">
      <div className="row-one">
        <HomeTitle />
      </div>
      <div className="row">
        <FleetOverview />
      </div>
      <div className="row">{/* <SensorData /> */}</div>
      {/* <PhenodeGrafana /> */}
    </div>
  );
}

export default Home;
