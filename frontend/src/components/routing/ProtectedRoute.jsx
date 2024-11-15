import React from "react";
import { Navigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { toast } from "react-toastify";

function PrivateRoute({ children, requiredRole, fallbackRoute = "/" }) {
  const { keycloak } = useKeycloak();

  // Check if the user has the required role
  const hasAccess = keycloak.tokenParsed?.roles.includes(requiredRole);

  if (!hasAccess) {
    // Display a toast notification
    toast.error(
      "Permissions required to access this function. Please contact your admin."
    );

    // Redirect the user to the fallback route
    return <Navigate to={fallbackRoute} replace />;
  }

  // Render the child components if access is granted
  return children;
}

export default PrivateRoute;
