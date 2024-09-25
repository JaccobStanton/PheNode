import { useState, useEffect } from "react";

const useFleetData = (accessToken) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!accessToken) {
      console.log("No access token provided to useFleetData.");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      console.log("Fetching fleet data with token:", accessToken);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/devices`, // Ensure this URL is correct
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
        console.log("Fetched fleet data:", result);

        // Assuming the API response contains a "devices" field that is an array
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

  return { data, loading, error };
};

export default useFleetData;
