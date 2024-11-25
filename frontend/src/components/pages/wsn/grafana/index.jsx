import React, { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { WIRELESS_DASHBOARD_ID } from "../../../../services/api";
import { useAppContext } from "../../../../context/AppContext";
import { useMySensors } from "../../../../services/swrHooks";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

function WSNGrafana() {
  const { keycloak, initialized } = useKeycloak();
  const { selectedWirelessSensor } = useAppContext();

  // Fetch sensors data
  const { sensorsData, sensorsLoading, sensorsError } = useMySensors();

  const [sensors, setSensors] = useState([]);
  const [url, setUrl] = useState(null); // Initialize url as null

  // Update the sensors list based on selectedWirelessSensor
  useEffect(() => {
    if (sensorsData) {
      let allSensors = sensorsData.sensors || [];

      // Place the selected sensor at the beginning of the list
      if (selectedWirelessSensor && selectedWirelessSensor.externalSensorId) {
        allSensors = allSensors.filter(
          (sensor) =>
            sensor.externalSensorId !== selectedWirelessSensor.externalSensorId
        );
        const selectedSensor = sensorsData.sensors.find(
          (sensor) =>
            sensor.externalSensorId === selectedWirelessSensor.externalSensorId
        );
        if (selectedSensor) {
          allSensors.unshift(selectedSensor);
        }
      }

      setSensors(allSensors);
    }

    if (sensorsError) {
      console.error("Error fetching sensors data:", sensorsError);
    }
  }, [sensorsData, selectedWirelessSensor]);

  // Update the Grafana URL whenever sensors or keycloak.token change
  useEffect(() => {
    if (keycloak.token) {
      const sensorsUrl =
        sensors.length > 0
          ? "&var-sensor=" +
            sensors
              .map((sensor) => sensor.externalSensorId)
              .join("&var-sensor=")
          : "&var-sensor=";

      // Construct the new Grafana URL with updated sensor parameters
      const newUrl = `https://grafana.phenode.cloud/${WIRELESS_DASHBOARD_ID}?orgId=1&kiosk=tv&auth_token=${keycloak.token}&refresh=30m&from=now-6h&to=now${sensorsUrl}`;

      setUrl(newUrl);
    }
  }, [sensors, keycloak.token]);

  if (!initialized || !keycloak.authenticated) {
    console.log("Keycloak is not initialized or authenticated.");
    return <div>Loading authentication...</div>;
  }

  // Display loading state if sensors data is loading
  if (sensorsLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh", // Adjust height as needed
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Display error messages if any error occurs while fetching sensors data
  if (sensorsError) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "80vh", // Adjust height as needed
          padding: "2rem",
        }}
      >
        <Alert severity="error">
          Error loading sensors data: {sensorsError.message || "Unknown error"}
        </Alert>
      </Box>
    );
  }

  // Do not render the iframe until the URL is set
  if (!url) {
    return null; // Or you can return a loading indicator
  }

  // Now render the iframe with the updated URL
  return (
    <iframe
      className="sensor-grafana-box"
      title="grafana iframe"
      src={url}
      style={{ width: "100%", height: "100%" }}
    ></iframe>
  );
}

export default WSNGrafana;
