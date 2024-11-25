import React, { useState } from "react";
import { useAppContext } from "../../../../context/AppContext";
import { useKeycloak } from "@react-keycloak/web";
import { fetchDeviceImagesToDownload } from "../../../../services/api";
import { toast } from "react-toastify";
import Tooltip from "@mui/material/Tooltip";

function ImageData() {
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
      toast.error("You cannot enter a future date.");
      return;
    }

    if (startDateObj > endDateObj) {
      toast.error("Start date cannot be after end date.");
      return;
    }

    const startISO = startDateObj.toISOString();
    const endISO = endDateObj.toISOString();

    const token = keycloak.token;

    try {
      await fetchDeviceImagesToDownload(deviceId, startISO, endISO, token);
      toast.success("Images downloaded successfully.");

      // Clear start and end date inputs
      setStartDate("");
      setEndDate("");
    } catch (error) {
      console.error("Error downloading images:", error);

      // Parse the error message to check for "No images found"
      try {
        const errorResponse = JSON.parse(
          error.message.replace("Failed to fetch images: ", "")
        );
        if (errorResponse && errorResponse.error === "No images found.") {
          toast.error("No images found in selected timeframe.");
          return;
        }
      } catch (parseError) {
        // Parsing failed, fallback to generic error handling
        console.error("Failed to parse error message:", parseError);
      }

      toast.error("Failed to download images.");
    }
  };

  return (
    <div className="download-grid-item">
      <div className="title-container">
        <span className="title-text">Download PheNode Images</span>
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

export default ImageData;
