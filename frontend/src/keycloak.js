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
      console.log("successfully get a new token");
    })
    .catch(() => {
      console.log("failed to refresh token");
    });
};
export default keycloak;
