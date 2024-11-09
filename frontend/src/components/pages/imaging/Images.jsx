import React, { useState, useEffect } from "react";
import "../../../styles/Imaging.css";
import { useAppContext } from "../../../context/AppContext";
import { deleteDeviceImage } from "../../../services/api";
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

import { toast } from "react-toastify";

import {
  downloadImage,
  batchDownload,
} from "../../../utils/imageDownloadUtils";

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
  const [openModal, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);

  // Use the deviceId if selectedDevice is available
  const deviceId = selectedDevice ? selectedDevice.deviceId : null;

  // Use the useDeviceImages hook
  const { images, imagesLoading, imagesError } = useDeviceImages(deviceId);

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
    downloadImage(image);
  };

  //function to download in batch as a zip file
  const handleBatchDownload = () => {
    batchDownload(selectedRows, filteredImages);
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
      await deleteDeviceImage(
        selectedDevice.deviceId,
        imageToDelete._id,
        keycloak.token
      );

      // Revalidate SWR data after a successful deletion
      await mutate();

      setOpenDeleteDialog(false);

      // Show success toast notification
      toast.success("Image successfully deleted!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {
      // Show error toast notification
      toast.error("Failed to delete image. Please try again.", {
        position: "bottom-right",
        autoClose: 3000,
      });
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
          <CircularProgressWithLabel />
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
              style={{ maxWidth: "70%", maxHeight: "70%" }}
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
