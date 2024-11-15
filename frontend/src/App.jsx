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
import NoMatch from "./components/routing/NoMatch";
import PrivateRoute from "./components/routing/privateRoute";
import ProtectedRoute from "./components/routing/ProtectedRoute";

import BackgroundBox from "./components/layouts/Background";
import AuthWrapper from "./components/pages/auth/AuthWrapper";
import { AppContextProvider } from "./context/AppContext";
import Logout from "./components/pages/auth/Logout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppContent = () => {
  return (
    <Routes>
      {/* Route for Logout - rendered without Navbar, BackgroundBox, or app-background */}
      <Route path="/logout" element={<Logout />} />

      <Route
        path="/nomatch"
        element={
          <PrivateRoute>
            <NoMatch />
          </PrivateRoute>
        }
      />

      {/* Routes for the rest of the application */}
      <Route
        path="/*"
        element={
          <div className="app-background">
            <BackgroundBox>
              <Navbar />

              <Routes>
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/realtime"
                  element={
                    <PrivateRoute>
                      <Realtime />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/wsn"
                  element={
                    <PrivateRoute>
                      <WSN />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/download"
                  element={
                    <PrivateRoute>
                      <Download />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute requiredRole="phenode-editor">
                      <Settings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/preferences"
                  element={
                    <ProtectedRoute requiredRole="phenode-editor">
                      <Preferences />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/imaging"
                  element={
                    <PrivateRoute>
                      <Imaging />
                    </PrivateRoute>
                  }
                />

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
          <ToastContainer position="bottom-right" autoClose={5000} />
          <AppContent />
        </AppContextProvider>
      </AuthWrapper>
    </Router>
  );
};

export default App;
