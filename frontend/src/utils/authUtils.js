// Access the user's roles from the Keycloak token.
// This is a helper function to check if a user has a specific role
export function userHasRole(keycloak, role) {
  if (!keycloak || !keycloak.tokenParsed) {
    return false;
  }

  const realmRoles = keycloak.tokenParsed.realm_access?.roles || [];
  const clientId = keycloak.clientId || "phenode"; // Ensure clientId is set
  const clientRoles =
    keycloak.tokenParsed.resource_access?.[clientId]?.roles || [];

  return realmRoles.includes(role) || clientRoles.includes(role);
}
