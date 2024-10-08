import Keycloak from "keycloak-js";

console.log("Creating Keycloak instance...");
const keycloak = new Keycloak({
  url: "https://auth.phenode.cloud",
  realm: "grafana",
  clientId: "phenode",
});

console.log("Keycloak instance created:", keycloak);
export default keycloak;
