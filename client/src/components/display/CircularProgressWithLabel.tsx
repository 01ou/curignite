import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";

interface ProgressProps {
  targetValue: number;
  currentValue: number;
  size?: number;
  thickness?: number;
  color?: string;
  unprocessedColor?: string;
  variant?: Variant;
}

const CircularProgressWithLabel: React.FC<ProgressProps> = ({
  targetValue,
  currentValue,
  size = 100,
  thickness = 4,
  color = "blue",
  unprocessedColor = "#D9D9D9",
  variant = "body1"
}) => {
  const progress = Math.min((currentValue / targetValue) * 100, 100);

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        width: size,
        height: size
      }}
    >
      <CircularProgress
        variant="determinate"
        value={100}
        size={size}
        thickness={thickness}
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          color: unprocessedColor
        }}
      />
      <CircularProgress
        variant="determinate"
        value={progress}
        size={size}
        thickness={thickness}
        sx={{
          color,
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute"
        }}
      />
      
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant={variant}
          component="div"
          color="text.secondary"
        >
          {`${currentValue}/${targetValue}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressWithLabel;
