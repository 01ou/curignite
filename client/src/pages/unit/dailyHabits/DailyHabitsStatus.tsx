import { Stack, Typography } from '@mui/material';
import React from 'react';
import CircularProgressWithLabel from '../../../components/display/CircularProgressWithLabel';
import VerticalTextWithTilt from '../../../components/display/VerticalTextWithTilt';
import RoundBox from '../../../components/utils/RoundBox';
import { setAlpha } from '../../../functions/colorUtils/adjustColorUtils';

interface DailyHabitsStatusProps {
  targetHabits: string;
  targetDays: number;
  currentDays: number;
  didItToday: boolean;
  consecutiveEfforts: number;
}

const DailyHabitsStatus: React.FC<DailyHabitsStatusProps> = ({
  targetHabits,
  targetDays,
  currentDays,
  didItToday,
  consecutiveEfforts
}) => {
  return (
    <Stack direction="row" justifyContent="space-around" alignItems="center" >
      <Typography width={"33%"} fontWeight="bold" >
        {targetHabits}
      </Typography>
      <CircularProgressWithLabel
        size={80}
        targetValue={targetDays}
        currentValue={currentDays}
        unprocessedColor={setAlpha("#C5C5C5", 0.8)}
      />
      <RoundBox
        size={64}
        bgcolor={didItToday ? "#FF214E" : "#C3C3C3"}
      >
        {didItToday ? (
          <VerticalTextWithTilt text='達成' variant='h6' color="white" />
        ) : (
          <Typography>
            未達成
          </Typography>
        )}
      </RoundBox>
      <RoundBox size={64} bgcolor='#21FF8C' sx={{ textAlign: "center" }} >
        {consecutiveEfforts}日<br />
        連続
      </RoundBox>
    </Stack>
  );
};

export default DailyHabitsStatus;