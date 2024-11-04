// Logout.jsx
import React, { useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";
import Loading from "./Loading"; // Adjust the import path

const Logout = () => {
  const { keycloak } = useKeycloak();

  useEffect(() => {
    // Delay the logout to show the 'Logging out' screen
    const timer = setTimeout(() => {
      keycloak.logout({ redirectUri: window.location.origin + "/" });
    }, 5000); // 5 seconds delay

    return () => {
      clearTimeout(timer);
    };
  }, [keycloak]);

  return <Loading loadingText="Logging out" />;
};

export default Logout;
