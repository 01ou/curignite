import React from 'react';
import { Box, SxProps, Typography } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { HOURS_IN_MILLISECOND } from '../../../constants/dateTimeConstants';
import { convertMsToUnit } from '../../../functions/dateTimeUtils/timeFormatUtils';

interface SleepTimeCircleProps {
  sleepTimeMs: number;  
  size: number;        
  cutout?: string;      // 円のくり抜き率
  sx?: SxProps;
}

const SleepTimeCircle: React.FC<SleepTimeCircleProps> = ({ sleepTimeMs, size, cutout = '0%', sx }) => {
  const sleepRate = (sleepTimeMs / (24 * HOURS_IN_MILLISECOND)) * 100;

  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    datasets: [
      {
        data: [sleepRate, 100 - sleepRate],
        backgroundColor: ['#2A79E0', '#E0E0E0'],
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    cutout,
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
      datalabels: { display: false }
    },
    elements: { arc: { borderWidth: 0 } },
  };

  return (
    <Box sx={{ display: 'flex', position: "relative", flexDirection: 'column', alignItems: 'center', width: size, height: size, ...sx }}>
      <Doughnut data={data} options={options} />
      <Typography variant="subtitle1" sx={{ position: "absolute", mt: 2, textAlign: "center", fontWeight: "bold" }}>
        {convertMsToUnit(sleepTimeMs, "hours", 1).toFixed(1)}時間<br />睡眠
      </Typography>
    </Box>
  );
};

export default SleepTimeCircle;
