import React from "react";
import Box from "@mui/material/Box";
import CircularProgressWithLabel from "@mui/material/CircularProgress";

function LoadingProgress() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh", // Adjust height as needed
        width: "100%",
      }}
    >
      <CircularProgressWithLabel />
    </Box>
  );
}

function DeleteLoadingProgress() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgressWithLabel />
    </Box>
  );
}

// Named exports
export { LoadingProgress, DeleteLoadingProgress };
