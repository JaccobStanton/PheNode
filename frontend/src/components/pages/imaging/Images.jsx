import React, { useState, useEffect } from "react";
import "../../../styles/Imaging.css";
import { useAppContext } from "../../../context/AppContext";
import { useDeviceImages } from "../../../services/swrHooks";
import dayjs from "dayjs"; // For date formatting
import CircularProgressWithLabel from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useKeycloak } from "@react-keycloak/web";
import { API_URL } from "../../../services/api";

import JSZip from "jszip";
import { saveAs } from "file-saver";

// MUI imports
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import isBetween from "dayjs/plugin/isBetween";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

import { DateField } from "@mui/x-date-pickers/DateField";
import { TimeField } from "@mui/x-date-pickers/TimeField";

function Images() {
  const { selectedDevice } = useAppContext(); // Access selectedDevice from context
  const { keycloak } = useKeycloak(); // Access Keycloak for authentication

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [progress, setProgress] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);

  // Use the deviceId if selectedDevice is available
  const deviceId = selectedDevice ? selectedDevice.deviceId : null;

  // Use the useDeviceImages hook
  const { images, imagesLoading, imagesError } = useDeviceImages(deviceId);

  useEffect(() => {
    if (images && images.length > 0) {
      // Calculate the progress based on images loaded
      setProgress((images.length / images.length) * 100);
    }
  }, [images]);

  // State to hold the filtered images
  const [filteredImages, setFilteredImages] = useState([]);

  // Update filteredImages whenever images, selectedDate, or selectedTime change
  useEffect(() => {
    if (images && images.length > 0) {
      let filtered = images;

      if (selectedDate && selectedTime) {
        // Combine selected date and time into one Day.js object
        const selectedDateTime = selectedDate
          .hour(selectedTime.hour())
          .minute(selectedTime.minute())
          .second(selectedTime.second());

        // Create end time by adding 1 hour
        const endTime = selectedDateTime.add(1, "hour");

        // Filter images between selectedDateTime and endTime
        filtered = images.filter((item) => {
          const imageTime = dayjs(item.timestamp);
          return imageTime.isBetween(selectedDateTime, endTime, null, "[)");
        });
      } else if (selectedDate) {
        // If only date is selected, filter images on that date
        filtered = images.filter((item) => {
          const imageTime = dayjs(item.timestamp);
          return imageTime.isSame(selectedDate, "day");
        });
      }
      // **Filter out images without base64-encoded data**
      filtered = filtered.filter(
        (item) => item.base64encoded && item.base64encoded.trim() !== ""
      );

      setFilteredImages(filtered);
    } else {
      setFilteredImages([]);
    }
  }, [images, selectedDate, selectedTime]);

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
      setSelectedRows(filteredImages.map((item) => item._id)); // Select all rows in filtered images
      setSelectAllChecked(true);
    }
  };

  const isRowSelected = (id) => selectedRows.includes(id);

  const handleViewImage = (image) => {
    try {
      // Check if the image already has the base64-encoded data
      const base64ImageData = image.base64encoded;

      if (base64ImageData) {
        // Update modalImage with the image data
        setModalImage({
          ...image,
          base64encoded: base64ImageData,
        });
        setOpenModal(true);
      } else {
        console.error("Base64-encoded image data is missing.");
      }
    } catch (error) {
      console.error("Error handling image data:", error);
    }
  };

  // Function to download the image
  const handleDownloadImage = (image) => {
    if (image.base64encoded) {
      const link = document.createElement("a");
      link.href = `data:image/jpeg;base64,${image.base64encoded}`;
      link.download = image.filename || "downloaded_image.jpg"; // Default filename if not provided
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("Base64-encoded image data is missing.");
    }
  };

  //function to download in batch as a zip file
  const handleBatchDownload = async () => {
    if (selectedRows.length === 0) {
      console.error("No images selected for batch download.");
      return;
    }

    const zip = new JSZip();
    const folder = zip.folder("phenode_images");

    for (const imageId of selectedRows) {
      const image = filteredImages.find((img) => img._id === imageId);
      if (image && image.base64encoded) {
        const base64Content = image.base64encoded.includes(",")
          ? image.base64encoded.split(",")[1]
          : image.base64encoded;

        if (base64Content) {
          folder.file(image.filename || `${image._id}.jpg`, base64Content, {
            base64: true,
          });
        } else {
          console.error(
            `Invalid or empty base64 content for image ID: ${imageId}`
          );
        }
      } else {
        console.warn(
          `Skipping image ID ${imageId} as it does not have base64 data.`
        );
      }
    }

    try {
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "phenode_images.zip");
    } catch (error) {
      console.error("Error generating ZIP file:", error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalImage(null);
  };

  const handleDeleteImage = (image) => {
    setImageToDelete(image);
    setOpenDeleteDialog(true);
  };

  const confirmDeleteImage = async () => {
    try {
      // Replace with your API call or delete logic
      await fetch(
        `${API_URL}/devices/${deviceId}/images/${imageToDelete._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${keycloak.token}`,
          },
        }
      );
      // Refresh the images list after deletion
      // You may need to trigger a re-fetch or mutate the SWR cache
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="images-main-container">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="images-row">
          <DateField
            label="Select Date..."
            className="images-dropdown-menu"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
          />
          <TimeField
            label="Select Time..."
            className="images-dropdown-menu"
            value={selectedTime}
            onChange={(newValue) => setSelectedTime(newValue)}
          />
        </div>
      </LocalizationProvider>
      {imagesLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh", // Adjust height as needed
          }}
        >
          <CircularProgressWithLabel value={progress} />
        </Box>
      )}
      {imagesError && <div>Error: {imagesError.message}</div>}

      {!imagesLoading && !imagesError && filteredImages.length > 0 && (
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
                <th>Image Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredImages.map((item) => (
                <tr
                  key={item._id}
                  className={`table-row ${
                    isRowSelected(item._id) ? "selected" : ""
                  }`}
                >
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={isRowSelected(item._id)}
                      onChange={() => handleCheckboxChange(item._id)}
                    />
                  </td>
                  <td>{item.filename}</td>
                  <td>{dayjs(item.timestamp).format("YYYY-MM-DD")}</td>
                  <td>{dayjs(item.timestamp).format("h:mm:ss A")}</td>
                  <td>
                    <div className="action-buttons-container">
                      <button
                        className="action-button"
                        onClick={() => handleViewImage(item)}
                      >
                        View
                      </button>
                      <span className="separator">|</span>
                      <button
                        className="action-button"
                        onClick={() => handleDownloadImage(item)}
                      >
                        Download
                      </button>
                      <span className="separator">|</span>
                      <button
                        className="action-button-delete"
                        onClick={() => handleDeleteImage(item)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!imagesLoading && !imagesError && filteredImages.length === 0 && (
        <Box
          className="no-images-found"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            color: "#797979",
            opacity: "60%",
            fontSize: {
              xs: "16px", // base font size
              sm: "18px", // for small screens
              md: "20px", // for medium screens
              lg: "24px", // for large screens
              xl: "28px",
            },
          }}
        >
          No Images Found
        </Box>
      )}

      {selectedRows.length > 1 && (
        <div className="batch-download-button-container">
          <button
            className="batch-download-button"
            onClick={handleBatchDownload}
          >
            Batch Download
          </button>
        </div>
      )}

      {/* Modal for Viewing Image */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
          onClick={handleCloseModal}
        >
          {modalImage ? (
            <img
              src={`data:image/jpeg;base64,${modalImage?.base64encoded}`}
              alt={modalImage?.filename}
              style={{ maxWidth: "50%", maxHeight: "50%" }}
            />
          ) : null}
        </Box>
      </Modal>

      {/* Dialog for Delete Confirmation */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete Image</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this image?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={confirmDeleteImage} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Images;
