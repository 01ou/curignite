import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { format, isToday } from 'date-fns';
import React from 'react';
import { shiftDateTime } from '../../../../functions/dateTimeUtils/timeFormatUtils';

interface ChangeDateButtonsProps {
  displayDateMs: number;
  onChangeDateMs: (ms: number) => void;
}

const ChangeDateButtons: React.FC<ChangeDateButtonsProps> = ({ displayDateMs, onChangeDateMs }) => {
  const handleShiftDate = (direction: "right" | "left") => {
    const nextDateMs = shiftDateTime(displayDateMs, direction === "left" ? -1 : 1, "days");
    onChangeDateMs(nextDateMs);
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="background.paper"
      p={2}
      borderRadius={2}
      boxShadow={2}
      sx={{
        width: 'fit-content',
        margin: 'auto',
        '& .MuiTypography-root': {
          fontSize: '1.2rem',
          fontWeight: '500',
          color: 'text.primary',
          padding: '0 15px',
        },
        '& .MuiIconButton-root': {
          color: 'primary.main',
          '&:hover': {
            backgroundColor: 'transparent',
            color: 'secondary.main',
          },
        },
      }}
    >
      <IconButton onClick={() => handleShiftDate("left")} size="large">
        <ChevronLeft />
      </IconButton>
      <Typography>
        {format(displayDateMs, "yyyy年 MM月dd日")}
      </Typography>
      <IconButton onClick={() => handleShiftDate("right")} size="large" disabled={isToday(displayDateMs)} >
        <ChevronRight />
      </IconButton>
    </Box>
  );
};

export default ChangeDateButtons;
