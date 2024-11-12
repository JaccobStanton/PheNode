import React, { useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import { setDeviceWifiCredentials } from "../../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SetWifiCredentials() {
  const { selectedDevice } = useAppContext();
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const onClickSetWifiCredentials = async () => {
    if (!selectedDevice) {
      toast.error("Please select a device first.");
      return;
    }

    setIsUpdating(true);

    const wifiBody = { ssid, password }; // Updated to match backend expectations

    try {
      const result = await setDeviceWifiCredentials(
        selectedDevice.deviceId,
        wifiBody
      );

      if (result) {
        toast.success(
          "Wi-Fi credentials set successfully. The device will restart shortly."
        );
      } else {
        toast.error("Failed to set Wi-Fi credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error setting Wi-Fi credentials:", error);
      toast.error("An error occurred while setting Wi-Fi credentials.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="settings-card">
      <div className="card-content-container">
        <div className="settings-title">Set Wi-Fi credentials</div>
        <input
          type="text"
          placeholder="SSID"
          value={ssid}
          onChange={(e) => setSsid(e.target.value)}
          className="settings-ssid-input-box"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="settings-password-input-box"
        />
        <button
          className="settings-button"
          onClick={onClickSetWifiCredentials}
          disabled={isUpdating}
        >
          {isUpdating ? "Setting..." : "Set"}
        </button>
      </div>
    </div>
  );
}

export default SetWifiCredentials;
