//For Routes Requiring Specific Roles: This ensures only users with the phenode-editor
// role can access settings and preferences
import React from "react";
import { Navigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { toast } from "react-toastify";
import { userHasRole } from "../../utils/authUtils";

function ProtectedRoute({ children, requiredRole, fallbackRoute = "/" }) {
  const { keycloak } = useKeycloak();

  if (!userHasRole(keycloak, requiredRole)) {
    toast.error(
      "Permissions required to access this function. Please contact your admin."
    );
    return <Navigate to={fallbackRoute} replace />;
  }

  return children;
}

export default ProtectedRoute;
