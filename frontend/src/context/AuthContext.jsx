import { createContext, useContext, useState } from "react";

// Create a context for authentication
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [username, setUsername] = useState(null); // State for storing username
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
            username: username, // Pass username to the request
            password: password,
            grant_type: "password",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      setAccessToken(data.access_token);
      setUsername(username);
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
    console.log("User logged out");
  };

  // Provide the auth state and functions to children
  return (
    <AuthContext.Provider
      value={{ accessToken, username, login, logout, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
