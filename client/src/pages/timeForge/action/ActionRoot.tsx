import React from 'react';
import useActionStorage from '../hooks/useActionStorage';
import { Button, Stack, Typography } from '@mui/material';
import { actionCategoryBgColorMap, actionCategoryColorMap } from '../types/actionTypes';
import { useNavigate } from 'react-router-dom';
import useTimeDifference from '../../../features/hooks/datetime/useTimeDifference';
import { convertToDate } from '../../../functions/dateTimeUtils/timeConversion';
import { formatDuration } from '../../../functions/dateTimeUtils/timeFormatUtils';
import { useTranslation } from 'react-i18next';
import { actionIconMap } from '../category/actionItems';
import NotFoundAction from './NotFoundAction';
import { Clear } from '@mui/icons-material';

interface ActionRootProps { }

const ActionRoot: React.FC<ActionRootProps> = ({}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { getCurrentAction, endCurrentAction } = useActionStorage();
  const currentAction = getCurrentAction();
  const { timeDiffMs } = useTimeDifference(convertToDate(currentAction?.startTimestampMs ?? 0));

  const handleFinish = () => {
    endCurrentAction();
    navigate("/time-forge");
  }

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

export default ActionRoot;