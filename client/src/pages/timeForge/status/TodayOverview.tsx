import React from 'react';
import { Stack } from '@mui/material';
import ProgressCircle from './SleepTimeCircle';
import TodayResultChart from './charts/TodayResultChart';
import InfoTypography from './InfoTypography';
import { convertMsToUnit } from '../../../functions/dateTimeUtils/timeConversion';
import { useIncrementalCounter } from '../../../features/hooks/utils/useIncrementalCounter';
import { MINUTES_IN_MILLISECOND } from '../../../constants/dateTimeConstants';
import useActionStorage from '../hooks/useActionStorage';
import useHistoryAnalysis from '../hooks/useHistoryAnalysis';

const RANKS = ["E", "D", "C", "B", "B+", "A", "A+", "S", "S+", "SS"];
const RANK_INTERVAL_MS = 30 * MINUTES_IN_MILLISECOND;

const TodayOverview: React.FC = () => {
  const { getHistory, getContinuousTrainingCount, doneTrainingToday } = useActionStorage();
  const { getActionTime } = useHistoryAnalysis();

  const { trainingTimeMs, restTimeMs, creativeTimeMs, sleepTimeMs } = getActionTime(getHistory());

  const currentRankIndex = Math.min(RANKS.length - 1, Math.floor(trainingTimeMs / RANK_INTERVAL_MS));
  const currentRank = RANKS[currentRankIndex];
  const nextRankTimeMs = RANK_INTERVAL_MS - (trainingTimeMs % RANK_INTERVAL_MS);

  const continuousTrainingCount = getContinuousTrainingCount();
  const trainingCount = useIncrementalCounter({ 
    start: Math.max(0, continuousTrainingCount - 31), 
    end: continuousTrainingCount, 
    transitionTimeMs: 500 
  });

  return (
    <Stack direction="column" width="100%">
      <Stack direction="row" justifyContent="space-around" alignItems="center">
        <InfoTypography
          text={`連続鍛錬 ${trainingCount}`}
          bgcolor="orange"
          supplement={`今日: ${doneTrainingToday() ? "達成" : "未達成"}`}
        />
        <InfoTypography
          text={`鍛錬ランク ${currentRank}`}
          bgcolor="orange"
          supplement={currentRankIndex === RANKS.length - 1 ? "最高ランク" : `次のランク: ${convertMsToUnit(nextRankTimeMs, "minutes")}分`}
        />
        <ProgressCircle sleepTimeMs={sleepTimeMs} size={80} />
      </Stack>
      <TodayResultChart
        trainingTimeMs={trainingTimeMs}
        restTimeMs={restTimeMs}
        creativeTimeMs={creativeTimeMs}
      />
    </Stack>
  );
};

export default TodayOverview;