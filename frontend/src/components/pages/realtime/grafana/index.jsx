import React, { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { DASHBOARD_ID } from "../../../../services/api";
import { useAppContext } from "../../../../context/AppContext";
import { useMyDevices, useMySensors } from "../../../../services/swrHooks";

export default function RealtimeGrafana() {
  const { keycloak, initialized } = useKeycloak();
  const { selectedDevice } = useAppContext();

  // Use the updated hooks with token passed
  const { deviceData, deviceIsLoading, deviceIsError } = useMyDevices(
    keycloak.token,
    selectedDevice
  );
  const { sensorsData, sensorsLoading, sensorsError } = useMySensors(
    keycloak.token
  );

  const [device, setDevice] = useState(null);
  const [sensors, setSensors] = useState(null);

  useEffect(() => {}, [initialized, keycloak]);

  useEffect(() => {}, [selectedDevice]);

  useEffect(() => {
    if (deviceData) {
      setDevice(deviceData.device);
    }
    if (deviceIsError) {
    }
  }, [deviceData, deviceIsError]);

  useEffect(() => {
    if (sensorsData) {
      setSensors(sensorsData.sensors);
    }
    if (sensorsError) {
      console.error("Error fetching sensors data:", sensorsError);
    }
  }, [sensorsData, sensorsError]);

  const deviceName = device && device.deviceId ? device.deviceId : "PheNode";

  if (!initialized || !keycloak.authenticated) {
    console.log("Keycloak is not initialized or authenticated.");
    return <div>Loading...</div>;
  }

  if (keycloak) {
    const sensorsUrl = sensors
      ? "&var-sensor=" +
        sensors.map((sensor) => sensor.externalSensorId).join("&var-sensor=")
      : "&var-sensor=";

    const url = `https://grafana.phenode.cloud/${DASHBOARD_ID}?orgId=1&kiosk=tv&auth_token=${keycloak.token}&refresh=30m&from=now-6h&to=now&var-device=${deviceName}${sensorsUrl}`;

    if (keycloak.authenticated) {
      return (
        <iframe
          className="phenode-grafana-box"
          title="grafana iframe"
          src={url}
        ></iframe>
      );
    } else {
      console.log("Keycloak is not authenticated.");
      return (
        <div
          id="w-node-_473a3554-fab9-4dbf-cddf-310ef7914f1b-07ac755a"
          className="grafana-div-block"
        >
          Unable to authenticate!
        </div>
      );
    }
  } else {
    console.log("Keycloak is not initialized.");
    return (
      <div
        id="w-node-_473a3554-fab9-4dbf-cddf-310ef7914f1b-07ac755a"
        className="grafana-div-block"
      >
        Initializing Keycloak...
      </div>
    );
  }
}
