//used to get all data one time from the backend, so do not have to make multiple api calls.
//passes this data to :
//useFleetData.js hook

// context/FleetDataContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext"; // Import useAuth to get the accessToken

// Create a context for fleet data
const FleetDataContext = createContext();

// Custom hook to use the FleetDataContext
export const useFleetDataContext = () => useContext(FleetDataContext);

export const FleetDataProvider = ({ children }) => {
  const { accessToken } = useAuth(); // Get accessToken from AuthContext
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!accessToken) {
      console.log("No access token provided to FleetDataProvider.");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/devices`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Fleet data fetch response status:", response.status);

        if (!response.ok) {
          throw new Error(`Failed to fetch fleet data: ${response.status}`);
        }

        const result = await response.json();
        setData(result.devices || []);
      } catch (err) {
        console.error("Error fetching fleet data:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [accessToken]);

  return (
    <FleetDataContext.Provider value={{ data, loading, error }}>
      {children}
    </FleetDataContext.Provider>
  );
};
