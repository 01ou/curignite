import { LinearProgress, Stack, SxProps, Typography } from '@mui/material';
import React from 'react';

interface ProblemSetParameterSliderProps {
  label: string;
  value: number;
  fillColor?: string;
  baseColor?: string;
  sx?: SxProps;
}

const ProblemSetParameterSlider: React.FC<ProblemSetParameterSliderProps> = ({
  label,
  value,
  fillColor = "#CFFF83",
  baseColor = "#f3f3f3",
  sx
}) => {
  return (
    <Stack direction="row" alignItems="center" spacing={2} px={2} sx={sx} >
      <Typography sx={{ width: 64, textAlign: "center" }}>{label}</Typography>
      <LinearProgress
        value={value}
        variant="determinate"
        sx={{
          width: "100%",
          height: 20,
          backgroundColor: baseColor, // 背景色
          "& .MuiLinearProgress-bar": {
            backgroundColor: fillColor, // プログレスの色
          },
        }}
      />
    </Stack>
  );
};

export default ProblemSetParameterSlider;