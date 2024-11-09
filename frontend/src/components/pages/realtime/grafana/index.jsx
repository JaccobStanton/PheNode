import React, { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { DASHBOARD_ID } from "../../../../services/api";
import { useAppContext } from "../../../../context/AppContext";
import { useDevice, useMySensors } from "../../../../services/swrHooks";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

export default function RealtimeGrafana() {
  const { keycloak, initialized } = useKeycloak();
  const { selectedDevice } = useAppContext();

  const { deviceData, deviceLoading, deviceError } = useDevice(
    selectedDevice?.deviceId
  );
  const { sensorsData, sensorsLoading, sensorsError } = useMySensors();

  const [deviceName, setDeviceName] = useState("PheNode");
  const [sensors, setSensors] = useState([]);

  // Update deviceName when deviceData changes
  useEffect(() => {
    if (deviceData && deviceData.device) {
      setDeviceName(deviceData.device.deviceId);
    } else {
      setDeviceName("PheNode");
    }
  }, [deviceData]);

  // Update sensors when sensorsData changes
  useEffect(() => {
    if (sensorsData && Array.isArray(sensorsData.sensors)) {
      setSensors(sensorsData.sensors);
    } else {
      setSensors([]);
    }
  }, [sensorsData]);

  if (!initialized || !keycloak.authenticated) {
    return <div>Loading authentication...</div>;
  }

  // Display loading state if either device or sensors data is loading
  if (deviceLoading || sensorsLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Display error messages if any error occurs while fetching device or sensors data
  if (deviceError || sensorsError) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          padding: "2rem",
        }}
      >
        {deviceError && (
          <Alert severity="error" sx={{ marginBottom: "1rem" }}>
            Error loading device data: {deviceError.message || "Unknown error"}
          </Alert>
        )}
        {sensorsError && (
          <Alert severity="error">
            Error loading sensors data:{" "}
            {sensorsError.message || "Unknown error"}
          </Alert>
        )}
      </Box>
    );
  }

  // Build the sensors URL parameter
  const sensorsUrl =
    sensors.length > 0
      ? "&var-sensor=" +
        sensors.map((sensor) => sensor.externalSensorId).join("&var-sensor=")
      : "&var-sensor=";

  // Construct the Grafana URL with the updated deviceName
  const url = `https://grafana.phenode.cloud/${DASHBOARD_ID}?orgId=1&kiosk=tv&auth_token=${keycloak.token}&refresh=30m&from=now-6h&to=now&var-device=${deviceName}${sensorsUrl}`;

  return (
    <iframe
      className="phenode-grafana-box"
      title="grafana iframe"
      src={url}
      style={{ width: "100%", height: "100%" }}
    ></iframe>
  );
}
