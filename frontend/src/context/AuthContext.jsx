import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle login and fetch the access token
  const login = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_AUTH_URL}/realms/${
          import.meta.env.VITE_REALM
        }/protocol/openid-connect/token`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id: import.meta.env.VITE_CLIENT_ID,
            username: username,
            password: password,
            grant_type: "password",
          }),
          credentials: "include", // Include credentials (cookies) for cross-origin requests
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      setAccessToken(data.access_token);
      setUsername(username);

      // Backend should set the HTTP-only, secure cookie containing the token
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle logout
  const logout = () => {
    setAccessToken(null);
    setUsername(null);

    // Optionally, call an endpoint to invalidate the session on the server
    fetch(`${import.meta.env.VITE_API_URL}/logout`, {
      method: "POST",
      credentials: "include", // Include credentials to clear cookies on the server
    });
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, username, login, logout, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
