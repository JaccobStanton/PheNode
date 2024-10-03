// App.jsx
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web"; // Import useKeycloak
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

const AppContent = () => {
  const location = useLocation(); // Get current location (path)
  const { keycloak, initialized } = useKeycloak(); // Get keycloak instance and initialized status

  // Automatically prompt login if not authenticated
  useEffect(() => {
    if (initialized && !keycloak.authenticated) {
      keycloak.login(); // Redirect to Keycloak's login page
    }
  }, [initialized, keycloak]);

  // Show loading state while Keycloak is initializing
  if (!initialized) {
    return <div className="loading-text">Loading...</div>;
  }

  // Prevent rendering further content until login is complete
  if (!keycloak.authenticated) {
    return null;
  }

  return (
    <div className="app-background">
      <BackgroundBox>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          {/* <Route path="/realtime" element={<Realtime />} />
          <Route path="/wsn" element={<WSN />} />
          <Route path="/download" element={<Download />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/imaging" element={<Imaging />} /> */}
          {/* Add other routes as needed */}
        </Routes>
      </BackgroundBox>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
