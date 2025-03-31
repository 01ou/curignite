import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useTimeDifference from '../../../features/hooks/datetime/useTimeDifference';
import { convertToDate } from '../../../functions/dateTimeUtils/timeConversion';
import { formatDuration } from '../../../functions/dateTimeUtils/timeFormatUtils';
import { useTranslation } from 'react-i18next';
import { Clear } from '@mui/icons-material';
import useActionStorage from '../../timeForge/hooks/useActionStorage';
import { Stack, Typography, Button } from '@mui/material';
import NotFoundAction from '../../timeForge/action/NotFoundAction';
import { actionIconMap } from '../../timeForge/category/actionItems';
import { actionCategoryBgColorMap, actionCategoryColorMap } from '../../timeForge/types/actionTypes';
import useActionInfo from '../hooks/useActionInfo';
import useHistoryAnalysis from '../../timeForge/hooks/useHistoryAnalysis';

interface ActionPageProps { }

const ActionPage: React.FC<ActionPageProps> = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { getCurrentAction, endCurrentAction, getHistory } = useActionStorage();
  const { getActionTime } = useHistoryAnalysis();

  const { setLastActionInfo } = useActionInfo();
  const currentAction = getCurrentAction();
  const { timeDiffMs } = useTimeDifference(convertToDate(currentAction?.startTimestampMs ?? 0));

  const handleFinish = useCallback(() => {
    if (currentAction) {
      const prevHistory = getHistory();
      const { trainingTimeMs } = getActionTime(prevHistory);
      const endTimestampMs = new Date().getTime();
      setLastActionInfo({
        ...currentAction,
        endTimestampMs,
        displayedEffect: false,
        startExp: trainingTimeMs,
        endExp: trainingTimeMs + (endTimestampMs - currentAction.startTimestampMs)
      });
    }
    endCurrentAction();    
    navigate("/unit");
  }, [currentAction]);

  if (!currentAction) {
    return <NotFoundAction />;
  }

  const Image = actionIconMap[currentAction.actionId] ?? Clear;

  return (
    <Stack
      direction="column"
      justifyContent="space-around"
      alignItems="center"
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: actionCategoryBgColorMap[currentAction.category],
      }}
    >
      <Stack direction="row" alignItems="center" spacing={0} >
        <Image sx={{ width: 64, height: 64 }} />
        <Typography variant='h4'>
          {t(currentAction.actionId)}
        </Typography>
        
      </Stack>
      <Typography variant='h3'>
        {formatDuration(timeDiffMs)}
      </Typography>
      <Button
        variant="contained"
        sx={{
          width: 150,
          height: 60,
          bgcolor: actionCategoryColorMap[currentAction.category],
          fontSize: 24
        }}
        onClick={handleFinish}
      >
        終わる
      </Button>
    </Stack>
  );
};

export default ActionPage;