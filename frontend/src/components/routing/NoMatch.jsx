import React from "react";
import { Card, Stack, styled, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "../common/Button";

const Main = styled(Stack)(() => ({
  height: "100%",
  width: "100%",
  overflowX: "auto",
  "& ::-webkit-scrollbar": {
    WebkitAppearance: "none",
  },
  "& ::-webkit-scrollbar:horizontal": {
    height: "16px",
  },
  "& ::-webkit-scrollbar-thumb": {
    borderRadius: "8px",
    border: "2px solid white",
    backgroundColor: "rgba(0, 0, 0, .5)",
  },
}));

export default function NoMatch() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <Main>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          overflow: "auto",
          height: "100vh",
          width: "100%",
          backgroundImage:
            "radial-gradient(circle farthest-corner at 0% 0%, #043e83, var(--bg-dark-color) 105%, #7b00ff24 102%)",
        }}
        flexGrow={1}
      >
        <Card>
          <Stack p={4} minWidth={300} alignItems="center">
            <Typography variant="h3">404</Typography>
            <Typography>Page does not exist</Typography>
            <Button
              sx={{
                width: "100%",
                backgroundColor: "#1a75e0",
                marginTop: "15px",
              }}
              onClick={goHome}
            >
              {"Back Home"}
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Main>
  );
}
