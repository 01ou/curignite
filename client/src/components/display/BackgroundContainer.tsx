// components/BackgroundContainer.tsx
import React from "react";
import { Box, SxProps } from "@mui/material";

interface BackgroundContainerProps {
  backgroundImage: string;
  fit?: "width" | "height"; // 追加: 画像のフィット方法を選択
  children: React.ReactNode;
  sx?: SxProps;
  ref?: React.RefObject<HTMLDivElement | null>
}

const BackgroundContainer: React.FC<BackgroundContainerProps> = ({
  backgroundImage,
  fit = "cover", // デフォルト: cover
  children,
  sx,
  ref
}) => {
  const backgroundSize = fit === "width" ? "100vw auto" : fit === "height" ? "auto 100vh" : "cover";

  return (
    <Box
      ref={ref}
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default BackgroundContainer;
