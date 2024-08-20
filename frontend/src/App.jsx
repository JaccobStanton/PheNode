import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BackgroundBox from "./components/layouts/Background";
import "./styles/App.css";
import Navbar from "./components/navbar/Navbar";
import Realtime from "./pages/Realtime";
import WSN from "./pages/WSN";
import Download from "./pages/Download";
import Settings from "./pages/Settings";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <div className="app-background">
        <BackgroundBox>
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/realtime" element={<Realtime />} />
            <Route path="/wsn" element={<WSN />} />
            <Route path="/download" element={<Download />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </BackgroundBox>
      </div>
    </Router>
  );
};

export default App;
