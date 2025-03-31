import React from "react";
import { Box, Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";

interface VerticalTextWithTiltProps {
  text: string;
  angle?: number;
  color?: string;
  variant?: Variant;
}

const VerticalTextWithTilt: React.FC<VerticalTextWithTiltProps> = ({
  text,
  angle = -20, // デフォルトは-20度で傾ける
  color = "black",
  variant = "body1"
}) => {
  return (
    <Box
      sx={{
        display: "inline-block",
        transform: `rotate(${angle}deg)`, // 斜めに傾ける
        writingMode: "vertical-rl", // 右から左への縦書き
        textOrientation: "upright", // 文字の向きを正しく保つ
        whiteSpace: "nowrap", // 改行防止
      }}
    >
      <Typography
        variant={variant}
        component="span"
        sx={{
          letterSpacing: "2px",
          color,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default VerticalTextWithTilt;
