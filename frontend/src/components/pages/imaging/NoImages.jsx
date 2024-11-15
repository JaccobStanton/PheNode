import React from "react";
import Box from "@mui/material/Box";

function NoImages() {
  return (
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
  );
}

export default NoImages;
