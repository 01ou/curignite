import React from "react";
import { Box, Typography } from "@mui/material";

interface StampRallyCellProps {
  text: string;
  stampSrc: string;
  stamped: boolean;
  size?: number;
  fontSize?: number;
}

const StampRallyCell: React.FC<StampRallyCellProps> = ({ text, stampSrc, stamped, size = 70, fontSize = 20 }) => {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        backgroundColor: "#f5f5f5",
        color: "#757575",
        border: "3px solid #ffeb3b",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        textAlign: "center",
        borderRadius: "100%",
        fontSize
      }}
    >
      {text}
      {stamped && (
        <Box
          component="img"
          src={stampSrc}
          alt="stamp"
          sx={{
            position: "absolute",
            width: "120%",
            height: "120%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0.8,
          }}
        />
      )}
    </Box>
  );
};

export default StampRallyCell;
