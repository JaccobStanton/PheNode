import React, { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { WIRELESS_DASHBOARD_ID } from "../../../../services/api";
import { useAppContext } from "../../../../context/AppContext";
import { useMySensors } from "../../../../services/swrHooks";

function WSNGrafana() {
  const { keycloak, initialized } = useKeycloak();
  const { selectedWirelessSensor } = useAppContext();

  // Pass the keycloak token to useMySensors
  const { sensorsData, sensorsLoading, sensorsError } = useMySensors(
    keycloak.token
  );

  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    if (sensorsData) {
      let allSensors = sensorsData.sensors || [];

      // If a sensor is selected, move it to the beginning of the list
      if (selectedWirelessSensor) {
        allSensors = allSensors.filter(
          (sensor) => sensor.externalSensorId !== selectedWirelessSensor
        );
        const selectedSensor = sensorsData.sensors.find(
          (sensor) => sensor.externalSensorId === selectedWirelessSensor
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
  }, [sensorsData, selectedWirelessSensor, sensorsError]);

  if (!initialized || !keycloak.authenticated) {
    console.log("Keycloak is not initialized or authenticated.");
    return <div>Loading...</div>;
  }

  if (keycloak) {
    const sensorsUrl = sensors
      ? "&var-sensor=" +
        sensors.map((sensor) => sensor.externalSensorId).join("&var-sensor=")
      : "&var-sensor=";

    const url = `https://grafana.phenode.live/${WIRELESS_DASHBOARD_ID}?orgId=1&kiosk=tv&auth_token=${keycloak.token}&refresh=30m&from=now-6h&to=now${sensorsUrl}`;

    if (keycloak.authenticated) {
      return (
        <iframe
          className="sensor-grafana-box"
          title="grafana iframe"
          src={url}
          width="100%"
          height="100%"
        ></iframe>
      );
    } else {
      console.log("Keycloak is not authenticated.");
      return (
        <div className="sensor-grafana-box" style={{ marginTop: "100px" }}>
          Unable to authenticate!
        </div>
      );
    }
  } else {
    console.log("Keycloak is not initialized.");
    return (
      <div className="sensor-grafana-box" style={{ marginTop: "100px" }}>
        Initializing Keycloak...
      </div>
    );
  }
}

export default WSNGrafana;
