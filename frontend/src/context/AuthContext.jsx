import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load accessToken from localStorage on initial render
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUsername = localStorage.getItem("username");
    if (token) {
      setAccessToken(token);
      setUsername(storedUsername);
    }
  }, []);

  // Update localStorage when accessToken or username changes
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");
    }
  }, [accessToken, username]);

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
          credentials: "include",
        }
      );

      if (!response.ok) {
        // Check for specific status codes and set a custom error message
        if (response.status === 401) {
          throw new Error("Invalid credentials. Username/Password incorrect");
        } else {
          throw new Error("An error occurred during login");
        }
      }

      const data = await response.json();

      // Ensure access_token exists before proceeding
      if (!data.access_token) {
        throw new Error("Access token not received");
      }

      setAccessToken(data.access_token);
      setUsername(username);
    } catch (err) {
      setError(err.message);
      // Only show alert if the error is related to credentials
      if (err.message === "Invalid credentials. Username/Password incorrect") {
        alert(err.message); // Show the popup
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to handle logout
  const logout = () => {
    setAccessToken(null);
    setUsername(null);

    // Remove token from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");

    // Optionally, call an endpoint to invalidate the session on the server
    fetch(`${import.meta.env.VITE_API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
  };

  // Session Management: Add event listeners for logout on window close or inactivity
  useEffect(() => {
    let timeoutId;

    // Function to reset the session timeout
    const resetTimeout = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        logout(); // Log out the user after 15 minutes of inactivity
      }, 15 * 60 * 1000); // 15 minutes
    };

    // Function to handle browser close
    const handleBeforeUnload = () => {
      logout();
    };

    // Add event listeners
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Reset the session timeout on user interactions
    const events = ["click", "mousemove", "keydown", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimeout));

    // Initialize the session timeout
    resetTimeout();

    // Cleanup event listeners on component unmount
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      events.forEach((event) =>
        window.removeEventListener(event, resetTimeout)
      );
    };
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{ accessToken, username, login, logout, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
