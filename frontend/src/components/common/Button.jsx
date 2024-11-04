import React from "react";
import { ButtonBase } from "@mui/material";

export default function Button(props) {
  const { sx, children, onClick, ...rest } = props;
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
        ...sx,
      }}
      onClick={onClick}
    >
      {children}
    </ButtonBase>
  );
}
