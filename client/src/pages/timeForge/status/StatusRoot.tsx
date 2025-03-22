import React, { useState } from 'react';
import useActionStorage from '../hooks/useActionStorage';
import { Box } from '@mui/material';
import ChangeDateButtons from './ChangeDateButtons';
import DayStatus from './DayStatus';
import RecentStatus from './RecentStatus';
import { DAYS_IN_MILLISECOND } from '../../../constants/dateTimeConstants';

interface StatusRootProps { }

const StatusRoot: React.FC<StatusRootProps> = ({}) => {
  const [displayType, setDisplayType] = useState<"date" | "recent">("recent");
  const [displayDateMs, setDisplayDateMs] = useState(new Date().getTime());
  
  const { getHistory } = useActionStorage();
  

  const history = getHistory();

  return (
    <Box sx={{ overflowY: "auto", pb: 10 }}>
      <ChangeDateButtons
      displayDateMs={displayDateMs}
      type={displayType}
      onChangeDateMs={setDisplayDateMs}
      onChangeType={setDisplayType}
    />
    {displayType === "date" ? (
      <>
        <DayStatus history={history} displayDateMs={displayDateMs} />
      </>
    ) : (
      <RecentStatus history={history} startDateMs={displayDateMs - 7 * DAYS_IN_MILLISECOND} endDateMs={displayDateMs} />
    )} 
    </Box>
  );
};

export default StatusRoot;