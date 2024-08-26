import React, { useState } from "react";
import "../../../styles/Imaging.css";

const mockData = [
  { id: 1, name: "Image_001.png", date: "2024-01-01", time: "12:00 AM" },
  { id: 2, name: "Image_002.png", date: "2024-01-01", time: "01:00 AM" },
  { id: 3, name: "Image_003.png", date: "2024-01-01", time: "02:00 AM" },
  { id: 4, name: "Image_004.png", date: "2024-01-01", time: "03:00 AM" },
  { id: 5, name: "Image_005.png", date: "2024-01-01", time: "04:00 AM" },
  { id: 6, name: "Image_006.png", date: "2024-01-01", time: "05:00 AM" },
  { id: 7, name: "Image_007.png", date: "2024-01-01", time: "06:00 AM" },
  { id: 8, name: "Image_008.png", date: "2024-01-01", time: "07:00 AM" },
  { id: 9, name: "Image_009.png", date: "2024-01-01", time: "08:00 AM" },
  { id: 10, name: "Image_010.png", date: "2024-01-01", time: "09:00 AM" },
  { id: 10, name: "Image_010.png", date: "2024-01-01", time: "09:00 AM" },
  { id: 10, name: "Image_010.png", date: "2024-01-01", time: "09:00 AM" },
  { id: 10, name: "Image_010.png", date: "2024-01-01", time: "09:00 AM" },
  { id: 10, name: "Image_010.png", date: "2024-01-01", time: "09:00 AM" },
  { id: 10, name: "Image_010.png", date: "2024-01-01", time: "09:00 AM" },
  { id: 10, name: "Image_010.png", date: "2024-01-01", time: "09:00 AM" },
  { id: 10, name: "Image_010.png", date: "2024-01-01", time: "09:00 AM" },
  { id: 10, name: "Image_010.png", date: "2024-01-01", time: "09:00 AM" },
  { id: 10, name: "Image_010.png", date: "2024-01-01", time: "09:00 AM" },
  { id: 10, name: "Image_010.png", date: "2024-01-01", time: "09:00 AM" },
];

function Images() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };

  const handleSelectAllChange = () => {
    if (selectAllChecked) {
      setSelectedRows([]); // Deselect all if already selected
      setSelectAllChecked(false);
    } else {
      setSelectedRows(mockData.map((item) => item.id)); // Select all rows
      setSelectAllChecked(true);
    }
  };

  const isRowSelected = (id) => selectedRows.includes(id);

  return (
    <div className="images-main-container">
      <div className="images-row">
        <select className="images-dropdown-menu">
          <option>Select Date...</option>
          <option>2024-01-01</option>
          <option>2024-01-02</option>
          <option>2024-01-03</option>
          {/* Add more options as needed */}
        </select>
        <select className="images-dropdown-menu">
          <option>Select Time...</option>
          <option>All in 24 hour period</option>
          <option>All in 12 hour period</option>
          <option>12:00 AM</option>
          <option>01:00 AM</option>
          <option>02:00 AM</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={selectAllChecked}
                  onChange={handleSelectAllChange}
                />
              </th>
              <th>PheNode</th>
              <th>Image Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((item) => (
              <tr
                key={item.id}
                className={`table-row ${
                  isRowSelected(item.id) ? "selected" : ""
                }`}
              >
                <td>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={isRowSelected(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                </td>
                <td>PheNode_004</td>
                <td>{item.name}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>
                  <button className="action-button">View</button>
                  <button className="action-button">Delete</button>
                  <button className="action-button">Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedRows.length > 1 && (
        <div className="batch-download-button-container">
          <button className="batch-download-button">Batch Download</button>
        </div>
      )}
    </div>
  );
}

export default Images;
