import { Button, SxProps, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

interface ActionButtonProps {
  label: string;
  Image: ReactNode;
  size: number;
  bgcolor: string;
  sx?: SxProps;
  onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, Image, size, bgcolor, sx, onClick }) => {
  return (
    <Button
      sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "white", bgcolor, width: size, height: size, ...sx }}
      onClick={onClick}  
    >
      {Image}
      <Typography variant='caption'>
        {label}
      </Typography>
    </Button>
  );
};

export default ActionButton;