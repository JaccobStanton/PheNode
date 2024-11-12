import React, { useState } from "react";
import { fetchDeviceSensorData } from "../../../services/api";
import { useKeycloak } from "@react-keycloak/web";
import { useAppContext } from "../../../context/AppContext";
import JSZip from "jszip";
import { saveAs } from "file-saver";

function EnvData() {
  const [startDateEnv, setStartDateEnv] = useState("");
  const [endDateEnv, setEndDateEnv] = useState("");
  const { keycloak } = useKeycloak();
  const { selectedDevice } = useAppContext();

  const handleDownloadEnvironmentalData = async () => {
    console.log("Download button clicked");

    if (!startDateEnv || !endDateEnv) {
      alert("Please enter both start and end dates.");
      return;
    }

    if (!selectedDevice || !selectedDevice.deviceId) {
      alert("No device selected.");
      return;
    }

    const deviceId = selectedDevice.deviceId;
    console.log("Selected Device ID:", deviceId);

    const fromDate = new Date(startDateEnv);
    const toDate = new Date(endDateEnv);

    if (isNaN(fromDate) || isNaN(toDate)) {
      alert("Please enter valid dates in the format YYYY-MM-DD.");
      return;
    }

    const from = fromDate.toISOString();
    const to = toDate.toISOString();
    console.log("Date range in ISO format:", { from, to });

    const token = keycloak.token;
    console.log("Token:", token ? "Exists" : "Does not exist");

    try {
      const data = await fetchDeviceSensorData(deviceId, token, from, to);
      console.log("Fetched data:", data);

      if (!data || data.length === 0) {
        alert("No data available for the selected date range.");
        return;
      }

      const zip = new JSZip();
      const csvContent = convertDataToCSV(data);
      zip.file("environmental_data.csv", csvContent);

      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, "phenode_sensor_data.zip");
        console.log("Download initiated");
      });
    } catch (error) {
      console.error("Error fetching sensor data:", error);
      alert("Failed to download data. Please try again.");
    }
  };

  const convertDataToCSV = (data) => {
    if (!data || data.length === 0) {
      return "No data available for the selected period.";
    }

    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(",")];

    data.forEach((row) => {
      const values = headers.map((header) => {
        let val = row[header];
        if (typeof val === "string") {
          val = `"${val.replace(/"/g, '""')}"`; // Escape quotes
        }
        return val;
      });
      csvRows.push(values.join(","));
    });

    return csvRows.join("\n");
  };

  return (
    <div className="download-grid-item">
      <div className="title-container">
        <span className="title-text">Download Environmental Data</span>
      </div>
      <div className="start-end-button-container">
        <input
          type="text"
          className="start-end-box"
          placeholder="Start Date (YYYY-MM-DD)"
          value={startDateEnv}
          onChange={(e) => setStartDateEnv(e.target.value)}
        />
        <input
          type="text"
          className="start-end-box"
          placeholder="End Date (YYYY-MM-DD)"
          value={endDateEnv}
          onChange={(e) => setEndDateEnv(e.target.value)}
        />
        <button
          className="download-button"
          onClick={handleDownloadEnvironmentalData}
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default EnvData;
