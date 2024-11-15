import React, { useState } from "react";
import ResetSvg from "../../../assets/settings/Reset.svg";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function ResetPhenode() {
  // State to manage modal open/close
  const [openResetDialog, setOpenResetDialog] = useState(false);

  // Function to handle reset confirmation
  const confirmReset = () => {
    // Add your reset logic here, if any
    console.log("Reset PheNode confirmed");
    setOpenResetDialog(false);
  };

  return (
    <div className="settings-card">
      <div className="card-content-container">
        <div className="settings-title">Remote Reset</div>
        <div className="settings-svg-container">
          <img src={ResetSvg} alt="Reset Icon" className="settings-reset-svg" />
        </div>
        <button
          className="settings-button"
          onClick={() => setOpenResetDialog(true)}
        >
          Reset PheNode
        </button>
      </div>

      {/* Reset Confirmation Modal */}
      <Dialog open={openResetDialog} onClose={() => setOpenResetDialog(false)}>
        <DialogTitle>Reset PheNode</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you wish to reset your PheNode?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenResetDialog(false)}>Cancel</Button>
          <Button onClick={confirmReset} color="error">
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ResetPhenode;
