import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BackgroundBox from "./components/layouts/Background";
import "./styles/App.css";
import Navbar from "./components/navbar/Navbar";
import Realtime from "./pages/Realtime";
import WSN from "./pages/WSN";
import Download from "./pages/Download";

const App = () => {
  return (
    <Router>
      <div className="app-background">
        <BackgroundBox>
          <Navbar />
          <Routes>
            <Route path="/" element={<Realtime />} />
            <Route path="/wsn" element={<WSN />} />
            <Route path="/download" element={<Download />} />
          </Routes>
        </BackgroundBox>
      </div>
    </Router>
  );
};

export default App;
