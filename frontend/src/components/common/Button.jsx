import React from "react";
import {
  ButtonBase,
  ToggleButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";

import { ArrowBack, ArrowForward } from "@mui/icons-material";

// Standard Button Component
function Button({ sx, children, onClick, ...rest }) {
  return (
    <ButtonBase
      {...rest}
      sx={{
        minWidth: 120,
        minHeight: 40,
        maxHeight: 40,
        color: "white",
        padding: "0px 16px",
        borderRadius: 1,
        ...sx, // Allow additional styles to be passed as props
      }}
      onClick={onClick}
    >
      {children}
    </ButtonBase>
  );
}

// Button used in wsn/boxes/
function SensorToggleButton({ value, label, shortLabel, ...otherProps }) {
  // Determine if the screen width is at least 1440px
  const isLargeScreen = useMediaQuery("(min-width:1440px)");

  const content = (
    <ToggleButton
      value={value}
      sx={{
        fontSize: {
          xs: "0.70rem",
          sm: "0.45rem",
          md: "0.45rem",
          lg: "0.6rem",
          xl: "0.6rem",
          customXL: "0.85rem",
        },
        padding: "2px 8px",
        color: "var(--dark-blue)",
        borderColor: "var(--reflected-light)",
        backgroundColor: "transparent",
        "&.Mui-selected": {
          backgroundColor: "rgba(18, 88, 170, 0.6)",
          color: "var(--green)",
        },
        "&.Mui-selected:focus": {
          outline: "none",
          boxShadow: "none",
        },
        "&:hover": {
          borderColor: "var(--green)",
        },
      }}
      {...otherProps}
    >
      {isLargeScreen ? label : shortLabel}
    </ToggleButton>
  );

  return isLargeScreen ? content : <Tooltip title={label}>{content}</Tooltip>;
}

/// Button used in realtime/count/
function ArrowToggleButton({ direction, onClick, ...otherProps }) {
  const Icon = direction === "left" ? ArrowBack : ArrowForward;
  const ariaLabel = direction === "left" ? "Previous Sensor" : "Next Sensor";

  return (
    <ToggleButton
      value={direction}
      onClick={onClick}
      aria-label={ariaLabel}
      sx={{
        minWidth: "36px",
        padding: "0px",
        color: "var(--dark-blue)",
        borderColor: "var(--reflected-light)",
        backgroundColor: "transparent",
        "&.Mui-selected": {
          backgroundColor: "rgba(18, 88, 170, 0.6)",
          color: "var(--green)",
        },
        "&.Mui-selected:focus": {
          outline: "none",
          boxShadow: "none",
        },
        "&:hover": {
          borderColor: "var(--green)",
        },
      }}
      {...otherProps}
    >
      <Icon />
    </ToggleButton>
  );
}
// Export Components
export { Button, SensorToggleButton, ArrowToggleButton };
