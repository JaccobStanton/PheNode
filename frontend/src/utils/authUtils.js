// Access the user's roles from the Keycloak token.
// This is a helper function to check if a user has a specific role
export function userHasRole(keycloak, role) {
  if (!keycloak || !keycloak.tokenParsed) {
    return false;
  }

  // Check realm-level roles
  const realmRoles = keycloak.tokenParsed.roles || [];
  // Check client-specific roles under resource_access
  const clientRoles =
    keycloak.tokenParsed.resource_access?.["phenode"]?.roles || [];

  // Match the role against both realm and client-specific roles
  return realmRoles.includes(role) || clientRoles.includes(role);
}
