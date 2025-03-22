import React from "react";
import { Typography, TypographyProps } from "@mui/material";

interface MultilineTypographyProps extends TypographyProps {
  text?: string;
}

const MultilineTypography: React.FC<MultilineTypographyProps> = ({ text = "", children, ...props }) => {
  return (
    <Typography {...props}>
      {(children || text).toString().split("\n").map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </Typography>
  );
};

export default MultilineTypography;
