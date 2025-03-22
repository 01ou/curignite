import React, { useMemo, useState } from 'react';
import useActionStorage from '../hooks/useActionStorage';
import useHistoryAnalysis from '../hooks/useHistoryAnalysis';
import TodayOverview from './TodayOverview';
import ActionBreakdown from './ActionBreakdown';
import { Box } from '@mui/material';
import ChangeDateButtons from './charts/ChangeDateButtons';

interface StatusRootProps { }

const StatusRoot: React.FC<StatusRootProps> = ({}) => {
  const [displayDateMs, setDisplayDateMs] = useState(new Date().getTime());
  
  const { getHistory } = useActionStorage();
  const { getActionTime, getActionBreakdown } = useHistoryAnalysis();

  const history = getHistory();
  const timeData = useMemo(() => getActionTime(history, displayDateMs), [history, getActionTime]);
  const breakdown = getActionBreakdown(history, undefined, displayDateMs);
  
  return (
    <Box sx={{ overflowY: "auto", pb: 10 }}>
      <ChangeDateButtons displayDateMs={displayDateMs} onChangeDateMs={setDisplayDateMs} />
      <TodayOverview {...timeData} />
      <ActionBreakdown actions={breakdown} />
    </Box>
  );
};

export default StatusRoot;