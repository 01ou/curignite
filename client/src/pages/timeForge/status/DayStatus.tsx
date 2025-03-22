import React, { useMemo } from 'react';
import { ActionData } from '../types/actionTypes';
import ActionBreakdown from './ActionBreakdown';
import TodayOverview from './TodayOverview';
import useHistoryAnalysis from '../hooks/useHistoryAnalysis';

interface DayStatusProps {
  history: ActionData[];
  displayDateMs: number;
}

const DayStatus: React.FC<DayStatusProps> = ({ history, displayDateMs }) => {
  const { getActionTime, getActionBreakdown } = useHistoryAnalysis();
  const timeData = useMemo(() => getActionTime(history, displayDateMs), [history, getActionTime]);
  const breakdown = getActionBreakdown(history, undefined, displayDateMs);
  
  return (
    <>
      <TodayOverview {...timeData} />
      <ActionBreakdown actions={breakdown} />
    </>
  );
};

export default DayStatus;