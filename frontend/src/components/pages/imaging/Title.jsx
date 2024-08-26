import React from "react";
import "../../../styles/Imaging.css";

function ImagingTitle() {
  return (
    <>
      <div className="grid-item page-title">Imaging</div>
      <div className="grid-item cell-wifi-last-measurements">
        <div className="imaging-measurements-box">
          <div className="imaging-last-photo">
            <span className="imaging-last-photo-text">
              Last image captured:
            </span>
            <span className="last-photo-date">October 31, 2022, 12:34pm</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImagingTitle;
