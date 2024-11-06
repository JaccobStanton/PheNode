import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "../../../context/AppContext";
import { useKeycloak } from "@react-keycloak/web";
import { updateDeviceLabel } from "../../../services/api";
import { toast } from "react-toastify";

function DeviceRename() {
  const [tempName, setTempName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const inputRef = useRef(null);

  const { keycloak } = useKeycloak();
  const { selectedDevice, setSelectedDevice, mutateDevices } = useAppContext();

  useEffect(() => {
    if (selectedDevice) {
      setTempName(selectedDevice.label || selectedDevice.deviceId);
    }
  }, [selectedDevice]);

  const handleBlur = () => {
    if (inputRef.current) {
      setTempName(inputRef.current.textContent);
    }
  };

  const onClickRename = async () => {
    const newName = inputRef.current?.textContent.trim();
    if (!newName) {
      alert("Please enter a valid name");
      return;
    }

    setIsUpdating(true);

    try {
      if (!keycloak.authenticated) {
        throw new Error("User is not authenticated");
      }
      await updateDeviceLabel(selectedDevice.deviceId, newName, keycloak.token); // Use the new function
      setSelectedDevice({ ...selectedDevice, label: newName });
      await mutateDevices();
      toast.success("Device renamed successfully!");
    } catch (error) {
      console.error("Error updating device label:", error);
      toast.error(`Error: ${error.message || "Failed to rename device"}`);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!selectedDevice) {
    return <div>No device selected.</div>;
  }

  return (
    <div className="settings-card">
      <div className="card-content-container">
        <div className="settings-title">Rename this PheNode</div>
        <div className="settings-blue-text">{selectedDevice.deviceId}:</div>
        <div
          className="settings-input-box"
          contentEditable={!isUpdating}
          suppressContentEditableWarning={true}
          onBlur={handleBlur}
          ref={inputRef}
        >
          {tempName}
        </div>
        <button
          className="settings-button"
          onClick={onClickRename}
          disabled={isUpdating}
        >
          {isUpdating ? "Renaming..." : "Rename"}
        </button>
      </div>
    </div>
  );
}

export default DeviceRename;
