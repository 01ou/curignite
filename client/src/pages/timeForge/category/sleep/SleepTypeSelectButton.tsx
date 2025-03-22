import { Button, SxProps, Typography } from '@mui/material';
import React from 'react';
import MultilineTypography from '../../../../components/utils/MultilineTypography';

interface SleepTypeSelectButtonProps {
  label: string;
  explanation: string;
  bgcolor: string;
  supplement?: string;
  sx?: SxProps;
  onClick?: () => void;
}

const SleepTypeSelectButton: React.FC<SleepTypeSelectButtonProps> = ({ label, explanation, bgcolor, supplement, sx, onClick }) => {
  return (
    <Button
      sx={{
        width: 300,
        height: "fit-contents",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        color: "white",
        bgcolor,
        padding: 3,
        ...sx
      }}
      onClick={onClick}
    >
      <Typography variant='h5' sx={{ width: "100%", textAlign: "start"}}>
        {label}
      </Typography>
      <MultilineTypography sx={{ width: "100%", textAlign: "center", mt: 1 }}>
        {explanation}
      </MultilineTypography>
      <Typography sx={{ position: "absolute", top: 10, right: 10 }}>
        {supplement}
      </Typography>
    </Button>
  );
};

export default SleepTypeSelectButton;