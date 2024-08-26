import React, { useState } from "react";
import "../../../styles/Imaging.css";

function Images() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedRows([]); // Deselect all rows
    } else {
      setSelectedRows([1, 2, 3]); // Select all rows (you'll need to adjust this for dynamic rows)
    }
    setSelectAll(!selectAll);
  };

  const isRowSelected = (id) => selectedRows.includes(id);

  // Sample data for testing
  const mockData = [
    {
      id: 1,
      pheNode: "PheNode_001",
      imageName: "Image_001.png",
      date: "2024-01-01",
      time: "12:00 AM",
    },
    {
      id: 2,
      pheNode: "PheNode_002",
      imageName: "Image_002.png",
      date: "2024-01-01",
      time: "01:00 AM",
    },
    {
      id: 3,
      pheNode: "PheNode_003",
      imageName: "Image_003.png",
      date: "2024-01-01",
      time: "02:00 AM",
    },
    {
      id: 4,
      pheNode: "PheNode_004",
      imageName: "Image_004.png",
      date: "2024-01-01",
      time: "03:00 AM",
    },
    {
      id: 5,
      pheNode: "PheNode_005",
      imageName: "Image_005.png",
      date: "2024-01-01",
      time: "04:00 AM",
    },
    {
      id: 6,
      pheNode: "PheNode_006",
      imageName: "Image_006.png",
      date: "2024-01-01",
      time: "05:00 AM",
    },
    {
      id: 7,
      pheNode: "PheNode_007",
      imageName: "Image_007.png",
      date: "2024-01-01",
      time: "06:00 AM",
    },
    {
      id: 8,
      pheNode: "PheNode_008",
      imageName: "Image_008.png",
      date: "2024-01-01",
      time: "07:00 AM",
    },
    {
      id: 9,
      pheNode: "PheNode_009",
      imageName: "Image_009.png",
      date: "2024-01-01",
      time: "08:00 AM",
    },
    {
      id: 10,
      pheNode: "PheNode_010",
      imageName: "Image_010.png",
      date: "2024-01-01",
      time: "09:00 AM",
    },
    {
      id: 11,
      pheNode: "PheNode_011",
      imageName: "Image_011.png",
      date: "2024-01-01",
      time: "10:00 AM",
    },
    {
      id: 12,
      pheNode: "PheNode_012",
      imageName: "Image_012.png",
      date: "2024-01-01",
      time: "11:00 AM",
    },
    {
      id: 13,
      pheNode: "PheNode_013",
      imageName: "Image_013.png",
      date: "2024-01-01",
      time: "12:00 PM",
    },
    {
      id: 14,
      pheNode: "PheNode_014",
      imageName: "Image_014.png",
      date: "2024-01-01",
      time: "01:00 PM",
    },
    {
      id: 15,
      pheNode: "PheNode_015",
      imageName: "Image_015.png",
      date: "2024-01-01",
      time: "02:00 PM",
    },
    {
      id: 16,
      pheNode: "PheNode_016",
      imageName: "Image_016.png",
      date: "2024-01-01",
      time: "03:00 PM",
    },
    {
      id: 17,
      pheNode: "PheNode_017",
      imageName: "Image_017.png",
      date: "2024-01-01",
      time: "04:00 PM",
    },
    {
      id: 18,
      pheNode: "PheNode_018",
      imageName: "Image_018.png",
      date: "2024-01-01",
      time: "05:00 PM",
    },
    {
      id: 19,
      pheNode: "PheNode_019",
      imageName: "Image_019.png",
      date: "2024-01-01",
      time: "06:00 PM",
    },
    {
      id: 20,
      pheNode: "PheNode_020",
      imageName: "Image_020.png",
      date: "2024-01-01",
      time: "07:00 PM",
    },
  ];

  return (
    <div className="images-main-container">
      <div className="images-row">
        <select className="images-dropdown-menu">
          <option>Select Date...</option>
          <option>2024-01-01</option>
          <option>2024-01-02</option>
          <option>2024-01-03</option>
        </select>
        <select className="images-dropdown-menu">
          <option>Select Time...</option>
          <option>12:00 AM</option>
          <option>01:00 AM</option>
          <option>02:00 AM</option>
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
                  onChange={(e) =>
                    setSelectedRows(
                      e.target.checked ? mockData.map((row) => row.id) : []
                    )
                  }
                />
              </th>
              <th>ID</th>
              <th>PheNode</th>
              <th>Image Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((row) => (
              <tr
                key={row.id}
                className={`table-row ${
                  isRowSelected(row.id) ? "selected" : ""
                }`}
              >
                <td>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={isRowSelected(row.id)}
                    onChange={() => handleCheckboxChange(row.id)}
                  />
                </td>
                <td>{row.id}</td>
                <td>{row.pheNode}</td>
                <td>{row.imageName}</td>
                <td>{row.date}</td>
                <td>{row.time}</td>
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
    </div>
  );
}

export default Images;
