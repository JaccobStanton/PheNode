import React, { useState, useEffect } from "react";
import { useWirelessSensor } from "../../../services/swrHooks";
import { useAppContext } from "../../../context/AppContext";
import { mutate } from "swr";
import { API_URL } from "../../../services/api";
import { toast } from "react-toastify";
import StatsBox from "./boxes/Stats";

function GPS_Rename({
  location,
  battery,
  externalSensorId,
  soilProbesConnected,
}) {
  const [tempName, setTempName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const { updateSensorLabel } = useWirelessSensor(externalSensorId);

  const { selectedWirelessSensor, setSelectedWirelessSensor } = useAppContext();

  // Initialize tempName with the current label or externalSensorId
  useEffect(() => {
    if (selectedWirelessSensor) {
      setTempName(
        selectedWirelessSensor.label || selectedWirelessSensor.externalSensorId
      );
    }
  }, [selectedWirelessSensor]);

  const handleNameChange = (event) => {
    setTempName(event.target.value);
  };

  const onClickRename = async () => {
    if (tempName.trim() === "") {
      alert("Please enter a valid name");
      return;
    }

    setIsUpdating(true);

    try {
      await updateSensorLabel(tempName.trim());
      // Update the selectedWirelessSensor in context
      setSelectedWirelessSensor({
        ...selectedWirelessSensor,
        label: tempName.trim(),
      });
      // Revalidate the sensors list to update the dropdown menu
      await mutate(`${API_URL}/wireless-sensors/my-sensors`);
      // Display success toast
      toast.success("Sensor renamed successfully!");
    } catch (error) {
      console.error("Error updating sensor label:", error);
      // Display error toast
      toast.error(`Error: ${error.message || "Failed to rename sensor"}`);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="sensor-page-data-box">
      <div className="sensor-data-value-boxes-container">
        <StatsBox
          location={location}
          battery={battery}
          externalSensorId={externalSensorId}
          soilProbesConnected={soilProbesConnected}
        />
        {/* <div className="grid-item sensor-data-value-boxes">
          <div className="sensor-gps-coordinates-box">
            <div className="sensor-gps-text">GPS:</div>
            <div className="sensor-gps-coordinates">
              {location?.latitude !== undefined
                ? convertToDMS(location.latitude, true)
                : "N/A"}
              , <br />
              {location?.longitude !== undefined
                ? convertToDMS(location.longitude, true)
                : "N/A"}
            </div>
            <div className="sensor-gps-text">Battery:</div>
            <div className="sensor-gps-coordinates">
              {battery?.batteryPercent !== undefined
                ? `${battery.batteryPercent}%`
                : "N/A"}
            </div>*/}

        <div className="grid-item sensor-data-value-boxes">
          <div className="sensor-rename-container">
            <div className="id-top-box">
              <div className="text-column">
                <p className="rename-title">Rename this sensor:</p>
                {/* <p className="device-id">{externalSensorId}</p> */}
              </div>
            </div>
            <div className="rename-bottom-box">
              <input
                type="text"
                className="placeholder-box"
                value={tempName}
                onChange={handleNameChange}
                disabled={isUpdating}
              />
              <button
                className="rename-button"
                onClick={onClickRename}
                disabled={isUpdating}
              >
                {isUpdating ? "Renaming..." : "Rename"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GPS_Rename;
