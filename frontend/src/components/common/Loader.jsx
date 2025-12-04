import React from "react";
import { CircularProgress, Box } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={50} />
    </Box>
  );
};

export default Loader;
