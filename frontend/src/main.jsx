import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak";
import HttpsRedirect from "./components/routing/HttpsRedirect.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
      customXL: 2560,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ReactKeycloakProvider
    authClient={keycloak}
    initOptions={{ onLoad: "login-required" }}
  >
    <ThemeProvider theme={theme}>
      <HttpsRedirect disabled={import.meta.env.MODE === "development"}>
        <App />
      </HttpsRedirect>
    </ThemeProvider>
  </ReactKeycloakProvider>
);
