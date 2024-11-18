import Keycloak from "keycloak-js";
import {
  KEYCLOAK_REALM,
  KEYCLOAK_CLIENT_ID,
  TOKEN_EXPIRATION,
} from "./services/api";

console.log("Creating Keycloak instance...");
const keycloak = new Keycloak({
  url: "https://auth.phenode.cloud",
  realm: KEYCLOAK_REALM,
  clientId: KEYCLOAK_CLIENT_ID,
});

keycloak.onTokenExpired = () => {
  keycloak
    .updateToken(TOKEN_EXPIRATION)
    .then(() => {
      console.log("Successfully refreshed token on expiration");
    })
    .catch(() => {
      console.error("Failed to refresh token. Logging out...");
      keycloak.logout();
    });
};

// Periodically check token validity
const startTokenRefresh = () => {
  setInterval(() => {
    keycloak
      .updateToken(TOKEN_EXPIRATION)
      .then((refreshed) => {
        if (refreshed) {
          console.log("Token successfully refreshed proactively");
        }
      })
      .catch((err) => {
        console.error("Failed to refresh token", err);
        keycloak.logout();
      });
  }, (TOKEN_EXPIRATION - 60) * 1000); // Check a minute before expiration
};

// Start token refresh when Keycloak is initialized
keycloak.onAuthSuccess = startTokenRefresh;

export default keycloak;
