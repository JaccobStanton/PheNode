import React from "react";
import "../../../styles/Imaging.css";
import { useAppContext } from "../../../context/AppContext";

function ImagingTitle() {
  const { selectedDevice } = useAppContext();

  // Extract necessary values from the selected device
  const lastImage = selectedDevice?.camera?.lastImage;

  // Format the last image date
  const formattedDateImages = lastImage
    ? new Date(lastImage).toLocaleString()
    : "N/A";

  return (
    <>
      <div className="grid-item page-title">Imaging</div>
      <div className="grid-item cell-wifi-last-measurements">
        <div className="imaging-measurements-box">
          <div className="imaging-last-photo">
            <span className="imaging-last-photo-text">
              Last image captured:
            </span>
            <span className="last-photo-date">{formattedDateImages}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImagingTitle;
