import React from "react";
import BackgroundBox from "./components/layouts/Background";
import "./styles/App.css";
import Navbar from "./components/navbar/Navbar";
import Realtime from "./pages/Realtime";

const App = () => {
  return (
    <div className="app-background">
      <BackgroundBox>
        <Navbar />
        {/* Your content goes here */}
        <Realtime />
      </BackgroundBox>
    </div>
  );
};

export default App;
