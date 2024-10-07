import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Navbar from "./components/navbar/Navbar";
import Realtime from "./pages/Realtime";
import WSN from "./pages/WSN";
import Download from "./pages/Download";
import Settings from "./pages/Settings";
import Home from "./pages/Home";
import Preferences from "./pages/Preferences";
import Imaging from "./pages/Imaging";
import BackgroundBox from "./components/layouts/Background";
import AuthWrapper from "./components/pages/auth/AuthWrapper";
import { AppContextProvider } from "./context/AppContext";
import Logout from "./components/pages/auth/Logout";

const AppContent = () => {
  return (
    <Routes>
      {/* Route for Logout - rendered without Navbar, BackgroundBox, or app-background */}
      <Route path="/logout" element={<Logout />} />

      {/* Routes for the rest of the application */}
      <Route
        path="/*"
        element={
          <div className="app-background">
            <BackgroundBox>
              <Navbar />

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/realtime" element={<Realtime />} />
                <Route path="/wsn" element={<WSN />} />
                <Route path="/download" element={<Download />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/preferences" element={<Preferences />} />
                <Route path="/imaging" element={<Imaging />} />
                {/* Add other routes as needed */}
              </Routes>
            </BackgroundBox>
          </div>
        }
      />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <AuthWrapper>
        <AppContextProvider>
          <AppContent />
        </AppContextProvider>
      </AuthWrapper>
    </Router>
  );
};

export default App;
