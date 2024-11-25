import React, { useState } from "react";
import { fetchAllDeviceData } from "../../../../services/api";
import { useKeycloak } from "@react-keycloak/web";
import { useAppContext } from "../../../../context/AppContext";
import { saveAs } from "file-saver";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";

function All() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { keycloak } = useKeycloak();
  const { selectedDevice } = useAppContext();
  const deviceId = selectedDevice?.deviceId;

  const formatDateInput = (value) => {
    let sanitizedValue = value.replace(/[^0-9/]/g, "");
    sanitizedValue = sanitizedValue.replace(/\/+/g, "/");
    if (sanitizedValue.length === 2 && sanitizedValue.indexOf("/") === -1) {
      sanitizedValue += "/";
    } else if (
      sanitizedValue.length === 5 &&
      sanitizedValue.lastIndexOf("/") === 2
    ) {
      sanitizedValue += "/";
    }
    sanitizedValue = sanitizedValue.substring(0, 10);
    return sanitizedValue;
  };

  const handleStartDateChange = (e) => {
    const formattedValue = formatDateInput(e.target.value);
    setStartDate(formattedValue);
  };

  const handleEndDateChange = (e) => {
    const formattedValue = formatDateInput(e.target.value);
    setEndDate(formattedValue);
  };

  const handleDownload = async () => {
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
    const formatErrorMsg =
      "Incorrect date format. Please enter date in MM/DD/YYYY format.";

    if (!dateRegex.test(startDate)) {
      toast.error(formatErrorMsg);
      return;
    }

    if (!dateRegex.test(endDate)) {
      toast.error(formatErrorMsg);
      return;
    }

    const [startMonth, startDay, startYear] = startDate.split("/");
    const [endMonth, endDay, endYear] = endDate.split("/");

    const startDateObj = new Date(
      `${startYear}-${startMonth}-${startDay}T00:00:00Z`
    );
    const endDateObj = new Date(`${endYear}-${endMonth}-${endDay}T23:59:59Z`);

    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      toast.error("Invalid date. Please check your input.");
      return;
    }

    const now = new Date();
    if (startDateObj > now || endDateObj > now) {
      toast.error("You cannot enter a date in the future.");
      return;
    }

    if (startDateObj > endDateObj) {
      toast.error("Start date cannot be after end date.");
      return;
    }

    if (!deviceId) {
      toast.error("No device selected. Please select a device.");
      return;
    }

    const startISO = startDateObj.toISOString();
    const endISO = endDateObj.toISOString();

    const token = keycloak.token;

    try {
      // Fetch the ZIP file as a blob
      const blob = await fetchAllDeviceData(deviceId, startISO, endISO, token);
      console.log("Fetched blob:", blob);

      if (!blob) {
        toast.error("No data available for the selected date range.");
        return;
      }

      // Save the blob directly
      saveAs(blob, "all_phenode_data.zip");
      toast.success("Data downloaded successfully.");

      // Clear start and end date inputs
      setStartDate("");
      setEndDate("");
    } catch (error) {
      console.error("Error fetching data:", error);

      if (error.message.includes("Not Found")) {
        toast.error("No data found in selected timeframe.");
      } else {
        toast.error("Failed to download data. Please try again.");
      }
    }
  };

  return (
    <div className="download-grid-item">
      <div className="title-container">
        <span className="title-text">Download All Data</span>
      </div>
      <div className="start-end-button-container">
        <Tooltip title="Please enter date in MM/DD/YYYY format" arrow>
          <input
            type="text"
            className="start-end-box"
            placeholder="Start Date"
            value={startDate}
            onChange={handleStartDateChange}
            maxLength={10}
          />
        </Tooltip>
        <Tooltip title="Please enter date in MM/DD/YYYY format" arrow>
          <input
            type="text"
            className="start-end-box"
            placeholder="End Date"
            value={endDate}
            onChange={handleEndDateChange}
            maxLength={10}
          />
        </Tooltip>
        <button className="download-button" onClick={handleDownload}>
          Download
        </button>
      </div>
    </div>
  );
}

export default All;
