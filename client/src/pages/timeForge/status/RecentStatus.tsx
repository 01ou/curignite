import React, { useMemo } from 'react';
import { ActionData } from '../types/actionTypes';
import useHistoryAnalysis from '../hooks/useHistoryAnalysis';
import ActionTimeTransitionChart from './charts/ActionTimeTransitionChart';

interface RecentStatusProps {
  history: ActionData[];
  startDateMs: number;
  endDateMs: number;
}

const RecentStatus: React.FC<RecentStatusProps> = ({ history, startDateMs, endDateMs }) => {
  const { getActionTimeByDate } = useHistoryAnalysis();
  const actionTimeByDate = useMemo(() => getActionTimeByDate(history, startDateMs, endDateMs), [history, startDateMs, endDateMs]);

  return (
    <div>
      <ActionTimeTransitionChart actionTimeByDate={actionTimeByDate} />
    </div>
  );
};

export default RecentStatus;