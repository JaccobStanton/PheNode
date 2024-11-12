// import React from "react";
// import "../../../styles/Realtime.css";
// import { useAppContext } from "../../../context/AppContext"; // Import useAppContext

// function Title() {
//   const { selectedDevice } = useAppContext(); // Use AppContext to get the selected device

//   // Return a message if no device is selected
//   if (!selectedDevice) {
//     return (
//       <>
//         <div className="grid-item page-title">PheNode System Status</div>
//         <div className="grid-item cell-wifi-last-measurements">
//           <div className="box">
//             <span>No device selected</span>
//           </div>
//         </div>
//       </>
//     );
//   }

//   // Extract necessary values from the selected device
//   const { lastMeasurement, deviceId } = selectedDevice; // Remove 'rf' if not needed temporarily

//   // Format the last measurement date
//   const formattedDate = lastMeasurement
//     ? new Date(lastMeasurement).toLocaleString()
//     : "N/A";

//   // Helper function to render signal blocks based on signal strength
//   const renderSignalBlocks = (strength) => {
//     const blocks = [];
//     for (let i = 1; i <= 4; i++) {
//       const isActive = i <= strength;
//       blocks.push(
//         <div
//           key={i}
//           className="signal-block"
//           style={{
//             backgroundColor: isActive ? "var(--green)" : "var(--dark-blue)",
//             boxShadow: isActive ? "0 0 10px 1px #1a75e0db" : "none",
//           }}
//         ></div>
//       );
//     }
//     return blocks;
//   };

//   // Hardcode signal strengths for testing
//   const wifiSignalStrength = 4; // Hardcoded 4 bars for WiFi
//   const cellularSignalStrength = 3; // Hardcoded 3 bars for Cellular

//   // Uncomment the following lines to restore backend signal strengths
//   // const wifiSignalStrength = rf?.wifiSignalStrength || 0;
//   // const cellularSignalStrength = rf?.cellularSignalStrength || 0;

//   return (
//     <>
//       <div className="grid-item page-title">PheNode System Status</div>
//       <div className="grid-item cell-wifi-last-measurements">
//         <div className="box">
//           <div className="last-measurement">
//             <span className="last-measurement-text">
//               Last measurements taken:
//             </span>
//             <span className="measurement-date">{formattedDate}</span>
//           </div>
//           <div className="bottom-box">
//             <div className="wifi-container">
//               <span className="wifi-text">WiFi: </span>
//               <div className="signal-blocks">
//                 {renderSignalBlocks(wifiSignalStrength)}
//               </div>
//             </div>
//             <div className="cellular-container">
//               <span className="cellular-text">Cellular: </span>
//               <div className="signal-blocks">
//                 {renderSignalBlocks(cellularSignalStrength)}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Title;

import React from "react";
import "../../../styles/Realtime.css";
import { useAppContext } from "../../../context/AppContext"; // Import useAppContext

function Title() {
  const { selectedDevice } = useAppContext(); // Use AppContext to get the selected device

  // Return a message if no device is selected
  if (!selectedDevice) {
    return (
      <>
        <div className="grid-item page-title">PheNode System Status</div>
        <div className="grid-item cell-wifi-last-measurements">
          <div className="box">
            <span>No device selected</span>
          </div>
        </div>
      </>
    );
  }

  // Extract necessary values from the selected device
  const { lastMeasurement, deviceId } = selectedDevice;

  // Format the last measurement date
  const formattedDate = lastMeasurement
    ? new Date(lastMeasurement).toLocaleString()
    : "N/A";

  // Helper function to render signal blocks based on signal strength
  const renderSignalBlocks = (strength) => {
    const blocks = [];
    for (let i = 1; i <= 4; i++) {
      const isActive = i <= strength;
      blocks.push(
        <div
          key={i}
          className="signal-block"
          style={{
            backgroundColor: isActive ? "var(--green)" : "var(--dark-blue)",
            boxShadow: isActive ? "0 0 10px 1px #1a75e0db" : "none",
          }}
        ></div>
      );
    }
    return blocks;
  };

  // Determine signal strengths based on deviceId
  let wifiSignalStrength, cellularSignalStrength;

  if (deviceId === "F5:AA:A2:3F:A8:9A") {
    wifiSignalStrength = 3; // 3 WiFi bars
    cellularSignalStrength = 4; // 4 Cellular bars
  } else {
    wifiSignalStrength = 0; // 0 WiFi bars
    cellularSignalStrength = 4; // 4 Cellular bars
  }

  return (
    <>
      <div className="grid-item page-title">PheNode System Status</div>
      <div className="grid-item cell-wifi-last-measurements">
        <div className="box">
          <div className="last-measurement">
            <span className="last-measurement-text">
              Last measurements taken:
            </span>
            <span className="measurement-date">{formattedDate}</span>
          </div>
          <div className="bottom-box">
            <div className="wifi-container">
              <span className="wifi-text">WiFi: </span>
              <div className="signal-blocks">
                {renderSignalBlocks(wifiSignalStrength)}
              </div>
            </div>
            <div className="cellular-container">
              <span className="cellular-text">Cellular: </span>
              <div className="signal-blocks">
                {renderSignalBlocks(cellularSignalStrength)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Title;
