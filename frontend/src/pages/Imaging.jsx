import React from "react";
import ImagingTitle from "../components/pages/imaging/Title";
import Images from "../components/pages/imaging/Images";

function Imaging() {
  return (
    <div className="realtime-grid">
      <div className="row-one">
        <ImagingTitle />
      </div>
      <div className="row">
        <Images />
      </div>
      <div className="row"></div>
    </div>
  );
}

export default Imaging;
