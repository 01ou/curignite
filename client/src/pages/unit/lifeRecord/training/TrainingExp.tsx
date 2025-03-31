import { LinearProgress, Stack, Typography } from '@mui/material';
import React from 'react';
import { MINUTES_IN_MILLISECOND } from '../../../../constants/dateTimeConstants';
import { useIncrementalCounter } from '../../../../features/hooks/utils/useIncrementalCounter';
import { formatAbbreviatedDuration } from '../../../../functions/dateTimeUtils/timeFormatUtils';

interface TrainingExpProps {
  startExp?: number;
  exp: number;
}

const calculationLevel = (exp: number) => {
  const levelSize = 10 * MINUTES_IN_MILLISECOND;
  const level = Math.floor(exp / levelSize) + 1;
  return {
    level,
    remainingExp: levelSize - exp % levelSize,
    nextExp: (level + 1) * levelSize,
    currentLevelProgress: exp % levelSize / levelSize
  };
}

const TrainingExp: React.FC<TrainingExpProps> = ({ startExp, exp }) => {
  const count = useIncrementalCounter({ start: startExp, end: startExp ? exp : 0, step: 1000, transitionTimeMs: 2000 });
  const { level: animLevel, currentLevelProgress: animProgress } = calculationLevel(count);
  const { level: fixedLevel, remainingExp, currentLevelProgress: fixedProgress } = calculationLevel(exp);
  const level = startExp === undefined ? fixedLevel : animLevel;
  const progress = startExp === undefined ? fixedProgress : animProgress;

  return (
    <div>
      <Stack direction="column" justifyContent="center" alignItems="center" >
        <Typography variant='h5'>
          {formatAbbreviatedDuration(exp)}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={2} >
          <LinearProgress variant="determinate" value={progress * 100} sx={{ width: 250, height: 20, borderRadius: 2 }} />
          <Typography variant='h6'>
            Lv. {level}
          </Typography>
        </Stack>
      </Stack>
      
      <Typography>
        残り{Math.floor(remainingExp / MINUTES_IN_MILLISECOND)}分で次のレベル
      </Typography>
    </div>
  );
};

export default TrainingExp;