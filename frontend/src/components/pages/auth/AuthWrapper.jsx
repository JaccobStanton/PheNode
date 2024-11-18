import React, { useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "./Loading";

const AuthWrapper = ({ children }) => {
  const { keycloak, initialized } = useKeycloak();
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = initialized && keycloak.authenticated;
  const TOKEN_EXPIRATION = 240; // Adjust based on your app settings

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

  // Effect to handle proactive token refresh
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      keycloak
        .updateToken(TOKEN_EXPIRATION)
        .then((refreshed) => {
          if (refreshed) {
            console.log("Proactively refreshed token.");
          } else {
            console.log("Token is still valid, no refresh needed.");
          }
        })
        .catch((err) => {
          console.error("Failed to refresh token", err);
          keycloak.logout();
        });
    }, (TOKEN_EXPIRATION - 60) * 1000); // Check a minute before expiration

    return () => clearInterval(interval); // Cleanup on unmount
  }, [keycloak, isAuthenticated, TOKEN_EXPIRATION]);

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
