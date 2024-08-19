import React from "react";
import "../../../styles/Home.css";

const mockData = [
  { id: 1, name: "PheNode 1" },
  { id: 2, name: "PheNode 2" },
  { id: 3, name: "PheNode 3" },
  { id: 4, name: "PheNode 4" },
  { id: 5, name: "PheNode 5" },
  { id: 6, name: "PheNode 6" },
  { id: 7, name: "PheNode 7" },
  { id: 8, name: "PheNode 8" },
];

function FleetOverview() {
  return (
    <div className="fleet-overview-box">
      <div className="fleet-cards-container">
        {mockData.map((item) => (
          <div key={item.id} className="fleet-card">
            <div className="fleet-card-content">
              <div className="fleet-card-content-section fleet-card-content-title-section">
                <div className="fleet-card-content-title">{item.name}</div>
                <div className="fleet-card-content-date-label">
                  Last measurements taken:
                </div>
                <div className="fleet-card-content-date-value">
                  October 31, 2022, 12:34pm
                </div>
              </div>
              <div className="fleet-card-content-section">
                <div className="fleet-card-content-label">Status:</div>
                <div className="fleet-card-content-data">Operational</div>
              </div>
              <div className="fleet-card-content-section">
                <div className="fleet-card-content-label">Temperature:</div>
                <div className="fleet-card-content-data">00.00°F</div>
              </div>
              <div className="fleet-card-content-section">
                <div className="fleet-card-content-label">
                  Today's Rainfall:
                </div>
                <div className="fleet-card-content-data">00.00"</div>
              </div>
              <div className="fleet-card-content-section">
                <div className="fleet-card-content-label">Wind Speed:</div>
                <div className="fleet-card-content-data">12.34 mph</div>
              </div>
              <div className="fleet-card-content-section">
                <div className="fleet-card-content-label">Battery:</div>
                <div className="fleet-card-content-data">92.08%</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FleetOverview;
