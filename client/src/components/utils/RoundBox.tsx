import { SxProps } from '@mui/material';
import { Box } from '@mui/system';
import React, { ReactNode } from 'react';

interface RoundBoxProps {
  sx?: SxProps;
  children?: ReactNode;
  size?: number;
  bgcolor?: string;
}

const RoundBox: React.FC<RoundBoxProps> = ({
  sx,
  children,
  size,
  bgcolor
}) => {
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: size,
      height: size,
      bgcolor,
      borderRadius: 999,
      ...sx
    }}>
      {children}
    </Box>
  );
};

export default RoundBox;