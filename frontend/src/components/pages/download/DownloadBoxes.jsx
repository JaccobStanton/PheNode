import React from "react";
import EnvData from "./downloadables/Environmental";
import ImageData from "./downloadables/Images";
import Diagnostics from "./downloadables/Diagnostics";
import Wireless from "./downloadables/WSN";
import All from "./downloadables/All";

function DownloadBoxes() {
  return (
    <div className="download-grid-container">
      <EnvData />
      <ImageData />
      <Diagnostics />
      <Wireless />
      <All />
    </div>
  );
}

export default DownloadBoxes;
