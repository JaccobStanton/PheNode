import React, { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { WIRELESS_DASHBOARD_ID } from "../../../../services/api";
import { useAppContext } from "../../../../context/AppContext";
import { useMySensors } from "../../../../services/swrHooks";

function WSNGrafana() {
  const { keycloak, initialized } = useKeycloak();
  const { selectedWirelessSensor } = useAppContext();
  const { sensorsData, sensorsLoading, sensorsError } = useMySensors();
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
  }, [sensorsData, selectedWirelessSensor]);

  if (!initialized) {
    return (
      <div
        className="grafana-div-block grafana-ws"
        style={{ marginTop: "100px" }}
      >
        Initializing Keycloak...
      </div>
    );
  }

  if (!keycloak.authenticated) {
    return (
      <div
        className="grafana-div-block grafana-ws"
        style={{ marginTop: "100px" }}
      >
        Unable to authenticate!
      </div>
    );
  }

  // Construct the sensors URL parameter
  const sensorsUrl = sensors
    .map((sensor) => `&var-sensor=${sensor.externalSensorId}`)
    .join("");

  const url = `https://grafana.phenode.live/${WIRELESS_DASHBOARD_ID}?orgId=1&kiosk=tv&auth_token=${keycloak.token}&refresh=30m&from=now-6h&to=now${sensorsUrl}`;

  return (
    <div
      className="grafana-div-block grafana-ws"
      style={{ marginTop: "100px", marginBottom: "50px" }}
    >
      <iframe
        title="grafana iframe"
        src={url}
        width="100%"
        height="100%"
      ></iframe>
      <br />
    </div>
  );
}

export default WSNGrafana;
