import React from 'react';
import TrainingExp from './TrainingExp';
import useActionInfo from '../../hooks/useActionInfo';
import { Box } from '@mui/material';
import { actionCategoryBgColorMap } from '../../../timeForge/types/actionTypes';

interface TrainingResultProps { }

const TrainingResult: React.FC<TrainingResultProps> = () => {
  const { getLastActionInfo } = useActionInfo();
  const actionInfo = getLastActionInfo();

  return (
    <Box sx={{ bgcolor: actionCategoryBgColorMap["training"], width:"100%", height: "100%", borderRadius: 1 }} >
      <Box sx={{ padding: 2,  }}>
        <TrainingExp
          startExp={actionInfo?.startExp}
          exp={actionInfo?.endExp ?? 0}
        />
      </Box>
    </Box>
  );
};

export default TrainingResult;