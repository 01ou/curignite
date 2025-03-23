import { Stack, SxProps, Typography } from '@mui/material';
import React from 'react';

interface InfoTypographyProps {
  text: string;
  bgcolor: string;
  supplement: string;
  sx?: SxProps;
}

const InfoTypography: React.FC<InfoTypographyProps> = ({ text, bgcolor, supplement, sx }) => {
  return (
    <Stack direction="column">
      <Typography sx={{ alignSelf: "end" }}>
        {supplement}
      </Typography>
      <Typography sx={{
        width: 140,
        height: 60,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor,
        borderRadius: 1,
        color: "white",
        fontSize: "1.2rem",
        ...sx
      }}>
        {text}
      </Typography>
    </Stack>
  );
};

export default InfoTypography;