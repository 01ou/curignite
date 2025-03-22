import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { format, isToday } from 'date-fns';
import React from 'react';
import { shiftDateTime } from '../../../functions/dateTimeUtils/timeFormatUtils';
import { DAYS_IN_MILLISECOND } from '../../../constants/dateTimeConstants';

interface ChangeDateButtonsProps {
  displayDateMs: number;
  type: "date" | "recent";
  shiftSize?: number;
  onChangeDateMs: (ms: number) => void;
  onChangeType: (type: "date" | "recent") => void;
}

const ChangeDateButtons: React.FC<ChangeDateButtonsProps> = ({ displayDateMs, type, shiftSize = 7, onChangeDateMs, onChangeType }) => {
  const handleShiftDate = (direction: "right" | "left") => {
    const shift = (direction === "left" ? -1 : 1) * (type === "date" ? 1 : shiftSize);
    const nextDateMs = shiftDateTime(displayDateMs, shift, "days");
    onChangeDateMs(nextDateMs);
  }

  const startDateMs = type === "date" ? displayDateMs : displayDateMs - shiftSize * DAYS_IN_MILLISECOND;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="background.paper"

      sx={{
        width: 'fit-content',
        margin: 'auto',
        '& .MuiIconButton-root': {

          '&:hover': {
            backgroundColor: 'transparent',
            color: 'secondary.main',
          },
        },
      }}
    >
      <IconButton onClick={() => handleShiftDate("left")} color="primary" size="large">
        <ChevronLeft />
      </IconButton>
      <Typography sx={{ fontSize: "1.2rem", fontWeight: 500 }}>
        {`
          ${format(startDateMs, "yyyy年")} 
          ${type === "recent" ? `${format(startDateMs, "MM月dd日")}~` : ""}
          ${format(displayDateMs, "MM月dd日")}
        `}
      </Typography>
      <IconButton onClick={() => handleShiftDate("right")} color="primary" size="large" disabled={isToday(displayDateMs)} >
        <ChevronRight />
      </IconButton>
    </Box>
  );
};

export default ChangeDateButtons;
