// These functions serve as reusable utilities to centralize the logic for making network requests. By using these utilities
import keycloak from "../keycloak"; // Import Keycloak instance

// Utility function that makes a fetch request using the standard fetch API. It accepts input, init, and other optional arguments, and
// returns the JSON-parsed response. This function is generic and can be used for any GET or POST request.
export const fetcher = async (input, init) => {
  const res = await fetch(input, init);
  return res.json();
};

// This function is more specialized. It includes authorization headers to handle authentication using a token (e.g., a JWT from Keycloak). It:
// Takes url, token, method, and body as parameters.
// Uses fetch to send a request with the provided method (defaulting to GET if not specified).
// Attaches an Authorization header with the Bearer token, allowing secure communication with the backend.
// Parses and returns the JSON response.
export const fetcherWithToken = async (
  url,
  method = "GET",
  body = null,
  userToken = null
) => {
  const token = userToken || keycloak.token; // Use the provided token or fall back to Keycloak

  if (token) {
    try {
      const response = await fetch(url, {
        method: method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: method !== "GET" && body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error(
          `Request to ${url} failed with status ${response.status}:`,
          errorResponse
        );
        throw new Error(`Error: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error("Error in fetcherWithToken:", error);
      throw error;
    }
  } else {
    throw new Error("User is not authenticated");
  }
};
