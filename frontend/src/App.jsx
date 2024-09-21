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
import BackgroundBox from "./components/layouts/Background";
import LoginLayout from "./components/layouts/LoginLayout";

const AppContent = () => {
  const location = useLocation(); // Get current location (path)

  // Check if current path is the login page
  const isLoginPage = location.pathname === "/";

  return (
    <div>
      {/* If not on the login page, wrap content in BackgroundBox and show Navbar */}
      {!isLoginPage ? (
        <div className="app-background">
          <BackgroundBox>
            <Navbar />
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/realtime" element={<Realtime />} />
              <Route path="/wsn" element={<WSN />} />
              <Route path="/download" element={<Download />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/preferences" element={<Preferences />} />
              <Route path="/imaging" element={<Imaging />} />
            </Routes>
          </BackgroundBox>
        </div>
      ) : (
        // On the login page, just render LoginLayout with Login
        <Routes>
          <Route
            path="/"
            element={
              <LoginLayout>
                <Login />
              </LoginLayout>
            }
          />
        </Routes>
      )}
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
