// useSessionTimeout.js
import { useEffect } from "react";

const useSessionTimeout = (
  keycloak,
  isAuthenticated,
  timeoutDuration = 60 * 60 * 1000
) => {
  useEffect(() => {
    if (!isAuthenticated) return; // Exit if not authenticated

    let logoutTimer;

    // Reset the logout timer
    const resetLogoutTimer = () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }

      logoutTimer = setTimeout(() => {
        console.log("Session timeout reached. Logging out...");
        keycloak.logout();
      }, timeoutDuration);
    };

    // Add event listeners to reset the timer on user activity
    window.addEventListener("mousemove", resetLogoutTimer);
    window.addEventListener("keypress", resetLogoutTimer);
    resetLogoutTimer(); // Initialize the timer

    // Cleanup function to remove event listeners and clear the timer
    return () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
      window.removeEventListener("mousemove", resetLogoutTimer);
      window.removeEventListener("keypress", resetLogoutTimer);
    };
  }, [keycloak, isAuthenticated, timeoutDuration]);
};

export default useSessionTimeout;
