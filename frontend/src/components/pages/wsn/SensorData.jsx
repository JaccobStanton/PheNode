// SensorPageDataBox.jsx
import React from "react";
import SensorBox from "./boxes/Sensor";
import SoilBox from "./boxes/Soil";

function SensorPageDataBox({ gasSensor, soilSensors, lux }) {
  return (
    <div className="sensor-page-data-box">
      <div className="sensor-data-value-boxes-container">
        <SensorBox gasSensor={gasSensor} lux={lux} />
        <SoilBox soilSensors={soilSensors} />
      </div>
    </div>
  );
}

export default SensorPageDataBox;
