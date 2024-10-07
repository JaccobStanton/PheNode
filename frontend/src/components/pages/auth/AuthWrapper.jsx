// AuthWrapper.jsx
import React, { useState, useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { useLocation } from "react-router-dom";
import Loading from "./Loading"; // Adjust the import path accordingly

const AuthWrapper = ({ children }) => {
  const { keycloak, initialized } = useKeycloak();
  const location = useLocation();
  const [delayCompleted, setDelayCompleted] = useState(false);
  const [loadingText, setLoadingText] = useState("Authenticating User");

  useEffect(() => {
    let timer;

    if (initialized && keycloak.authenticated) {
      console.log("User is authenticated. Starting delay timer...");

      // Remove 'logoutInProgress' flag if it exists
      localStorage.removeItem("logoutInProgress");

      // Set loading text for authenticated state
      setLoadingText("Setting up your environment");

      // Start the 15-second timer when the user is authenticated
      timer = setTimeout(() => {
        console.log("Delay completed.");
        setDelayCompleted(true);
      }, 11000);
    }

    // Cleanup function to clear the timer if the component unmounts
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [initialized, keycloak.authenticated]);

  // Show Loading component while Keycloak is initializing
  if (!initialized) {
    console.log("Keycloak is not initialized yet, showing loading page...");
    return <Loading loadingText="Authenticating User" />;
  }

  // If Keycloak is initialized but the user is not authenticated
  if (!keycloak.authenticated) {
    const logoutInProgress =
      localStorage.getItem("logoutInProgress") === "true";

    if (logoutInProgress || location.pathname === "/logout") {
      console.log(
        "User is not authenticated and logout is in progress. Showing logout screen..."
      );
      // Display Loading component with "Logging out" message
      return <Loading loadingText="Logging out" />;
    } else {
      console.log("User is not authenticated. Redirecting to login...");
      keycloak.login({ redirectUri: window.location.origin + "/" });
      return <Loading loadingText="Authenticating User" />;
    }
  }

  // User is authenticated but delay is not completed
  if (!delayCompleted) {
    console.log("Delay not completed yet. Showing loading page...");
    return <Loading loadingText={loadingText} />;
  }

  // User is authenticated and delay is completed
  console.log(
    "User is authenticated and delay completed. Rendering the application..."
  );
  return <>{children}</>;
};

export default AuthWrapper;
