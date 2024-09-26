import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { FleetDataProvider } from "./context/FleetDataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <FleetDataProvider>
        <App />
      </FleetDataProvider>
    </AuthProvider>
  </React.StrictMode>
);
