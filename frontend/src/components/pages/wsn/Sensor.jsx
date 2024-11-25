import React, { useState, useEffect } from "react";
import "../../../styles/Realtime.css";
import "../../../styles/WSN.css";
import { useAppContext } from "../../../context/AppContext";
import { useWirelessSensor } from "../../../services/swrHooks";
import SensorDiagram from "../../../assets/diagrams/Wireless-Sensors-v4.svg";
import SensorDropdownMenu from "./SensorDropdownMenu";
import SensorPageDataBox from "./SensorData";
import GPS_Rename from "./GPS_Rename";

function Sensor() {
  const { selectedWirelessSensor } = useAppContext();
  const selectedSensorId = selectedWirelessSensor?.externalSensorId;

  // State to hold the current sensor data
  const [currentSensorData, setCurrentSensorData] = useState(null);

  // Fetch sensor data using the hook
  const { sensorData, sensorLoading, sensorError } =
    useWirelessSensor(selectedSensorId);

  // Update currentSensorData when new data arrives
  useEffect(() => {
    if (sensorData && sensorData.sensor) {
      setCurrentSensorData(sensorData.sensor);
    }
  }, [sensorData]);

  // Handle errors
  if (sensorError) {
    return <div>Error: {sensorError.message}</div>;
  }

  // Display loading only if there's no current data
  if (!currentSensorData && sensorLoading) {
    return <div>Loading sensor data...</div>;
  }

  // Display message if no data is available
  if (!currentSensorData && !sensorLoading) {
    return <div>No data available for this sensor.</div>;
  }

  // Destructure sensor properties from currentSensorData
  const {
    gasSensor,
    soilSensors,
    battery,
    lux,
    location,
    externalSensorId,
    soilProbesConnected,
  } = currentSensorData;

  return (
    <>
      {/* LEFT COLUMN SENSOR DATA */}
      <div className="grid-item sensor-twenty-five-width">
        <SensorPageDataBox
          gasSensor={gasSensor}
          soilSensors={soilSensors}
          lux={lux}
        />
      </div>

      {/* DROPDOWN AND SVG */}
      <div className="wireless-sensor-img-grid-container">
        <div className="wireless-sensor-svg-container">
          <img src={SensorDiagram} alt="sensor" className="wsn-sensor-svg" />
        </div>
        <SensorDropdownMenu />
      </div>

      {/* RIGHT COLUMN GPS-RENAMING SENSOR */}
      <div className="grid-item sensor-twenty-five-width">
        <GPS_Rename
          location={location}
          battery={battery}
          externalSensorId={externalSensorId}
          soilProbesConnected={soilProbesConnected}
        />
      </div>
    </>
  );
}

export default Sensor;
