import React from "react";
import BackgroundBox from "./components/layouts/Background";
import "./styles/App.css";
import Navbar from "./components/navbar/Navbar";
import Realtime from "./pages/Realtime";
import WSN from "./pages/WSN";

const App = () => {
  return (
    <div className="app-background">
      <BackgroundBox>
        <Navbar />

        {/* <Realtime /> */}
        <WSN />
      </BackgroundBox>
    </div>
  );
};

export default App;
