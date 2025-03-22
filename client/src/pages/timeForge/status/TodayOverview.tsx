import React from 'react';
import ProgressCircle from './SleepTimeCircle';
import TodayResultChart from './charts/TodayResultChart';
import { Stack } from '@mui/material';

interface TodayOverviewProps {
  trainingTimeMs: number;
  restTimeMs: number;
  creativeTimeMs: number;
  sleepTimeMs: number;
}

const TodayOverview: React.FC<TodayOverviewProps> = ({ trainingTimeMs, restTimeMs, creativeTimeMs, sleepTimeMs }) => {
  return (
    <Stack direction="column" width="100%" >
      <ProgressCircle sleepTimeMs={sleepTimeMs} size={80} sx={{ alignSelf: "end" }} />
      <TodayResultChart
        trainingTimeMs={trainingTimeMs}
        restTimeMs={restTimeMs}
        creativeTimeMs={creativeTimeMs}
      />
    </Stack>
  );
};

export default TodayOverview;