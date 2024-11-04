import React, { useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import useSessionTimeout from "../../../hooks/useSessionTimeout";

const AuthWrapper = ({ children }) => {
  const { keycloak, initialized } = useKeycloak();
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = initialized && keycloak.authenticated;

  // Use the custom hook for session timeout
  useSessionTimeout(keycloak, isAuthenticated);

  // Effect to reset state when the user logs out
  useEffect(() => {
    if (
      initialized &&
      !keycloak.authenticated &&
      location.pathname !== "/logged-out"
    ) {
      console.log("User is not authenticated.");
      localStorage.removeItem("delayCompleted");
    }
  }, [initialized, keycloak.authenticated, location.pathname]);

  // Effect to handle redirection if user is authenticated and on '/logged-out'
  useEffect(() => {
    if (
      initialized &&
      keycloak.authenticated &&
      location.pathname === "/logged-out"
    ) {
      console.log("Redirecting authenticated user away from /logged-out");
      navigate("/");
    }
  }, [initialized, keycloak.authenticated, location.pathname, navigate]);

  // Show Loading component while Keycloak is initializing
  if (!initialized) {
    console.log("Keycloak is not initialized yet, showing loading page...");
    return <Loading loadingText="Loading" />;
  }

  // If Keycloak is initialized but the user is not authenticated
  if (!keycloak.authenticated) {
    if (
      location.pathname === "/logout" ||
      location.pathname === "/logged-out"
    ) {
      console.log(
        "User is not authenticated and on logout path. Showing logout screen..."
      );
      return children;
    } else {
      console.log("User is not authenticated. Redirecting to login...");
      keycloak.login({ redirectUri: window.location.origin + "/" });
      return <Loading loadingText="Authenticating User" />;
    }
  }

  // User is authenticated, show the children components
  return <>{children}</>;
};

export default AuthWrapper;
