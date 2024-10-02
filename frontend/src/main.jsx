import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak"; // Import the keycloak instance
import AppContext from "./context/AppContext.jsx";

console.log("Main file is rendering");

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ReactKeycloakProvider authClient={keycloak}>
    <AppContext>
      <App />
    </AppContext>
  </ReactKeycloakProvider>
  // </React.StrictMode>
);
