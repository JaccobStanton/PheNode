import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak";

import HttpsRedirect from "./components/routing/HttpsRedirect.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ReactKeycloakProvider
    authClient={keycloak}
    initOptions={{ onLoad: "login-required" }}
  >
    <HttpsRedirect disabled={import.meta.env.MODE === "development"}>
      <App />
    </HttpsRedirect>
  </ReactKeycloakProvider>
);
