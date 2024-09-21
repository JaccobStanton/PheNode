import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./styles/App.css";
import Navbar from "./components/navbar/Navbar";
import Realtime from "./pages/Realtime";
import WSN from "./pages/WSN";
import Download from "./pages/Download";
import Settings from "./pages/Settings";
import Home from "./pages/Home";
import Preferences from "./pages/Preferences";
import Imaging from "./pages/Imaging";
import Login from "../src/pages/Login";
import BackgroundBox from "./components/layouts/Background"; // Import BackgroundBox
import LoginLayout from "./components/layouts/LoginLayout"; // Import LoginLayout

const AppContent = () => {
  const location = useLocation(); // Get current location (path)

  const isLoginPage = location.pathname === "/"; // Check if current path is the login page

  return (
    <div>
      {/* Conditionally render the app layout (Navbar and BackgroundBox) only if not on the login page */}
      {!isLoginPage && (
        <div className="app-background">
          <Navbar />
          <BackgroundBox />
        </div>
      )}

      {/* Define the Routes */}
      <Routes>
        {/* Wrap the Login page with LoginLayout */}
        <Route
          path="/"
          element={
            <LoginLayout>
              <Login />
            </LoginLayout>
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/realtime" element={<Realtime />} />
        <Route path="/wsn" element={<WSN />} />
        <Route path="/download" element={<Download />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/imaging" element={<Imaging />} />
      </Routes>
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
