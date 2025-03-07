import React, { useEffect, useState } from 'react';
import StampRallyCell from './StampRallyCell';
import StampImage from '../../../../assets/stamp.svg';
import { format, subDays, getISOWeek, startOfWeek } from 'date-fns';
import { Box, Stack } from '@mui/material';

const LOCAL_STORAGE_KEY = 'stampRallyDates';

const getPastWeekDates = () => {
  const start = startOfWeek(new Date(), { weekStartsOn: 1 }); // 月曜始まり
  return Array.from({ length: 7 }, (_, i) => subDays(start, -i));
};

const getStoredDates = () => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveDate = (date: string) => {
  const dates = getStoredDates();
  if (!dates.includes(date)) {
    const updatedDates = [...dates, date].slice(-7);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedDates));
  }
};

const StampRally: React.FC = () => {
  const [stampedDates, setStampedDates] = useState<string[]>([]);
  const today = format(new Date(), 'yyyy-MM-dd');
  const currentYearMonth = format(new Date(), 'yyyy年M月');
  const currentWeek = `第${getISOWeek(new Date())}週目`;

  useEffect(() => {
    saveDate(today);
    setStampedDates(getStoredDates());
  }, []);

  const hasAccessedAllDaysThisWeek = () => {
    const storedDates = getStoredDates();
    const pastWeekDates = getPastWeekDates().map(date => format(date, 'yyyy-MM-dd'));
    return pastWeekDates.every(date => storedDates.includes(date));
  };

  const pastWeekDates = getPastWeekDates();
  const firstRow = pastWeekDates.slice(0, 4);
  const secondRow = pastWeekDates.slice(4);

  return (
    <Box sx={{ bgcolor: "whitesmoke", borderRadius: 1, padding: 2 }}>
      <Box style={{ textAlign: 'left', fontWeight: 'bold', marginBottom: '10px' }}>
        {currentYearMonth} {currentWeek}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%", mb: 1 }}>
        <StampRallyCell text='Completed' fontSize={16} size={90} stampSrc={StampImage} stamped={hasAccessedAllDaysThisWeek()} />
      </Box>
      <Stack direction="row" justifyContent="center" spacing={1}>
        {firstRow.map((date, index) => (
          <StampRallyCell
            key={index}
            text={format(date, 'E')} // 曜日のみ表示
            stampSrc={StampImage}
            stamped={stampedDates.includes(format(date, 'yyyy-MM-dd'))}
          />
        ))}
      </Stack>
      <Stack direction="row" justifyContent="center" spacing={1} mt={1}>
        {secondRow.map((date, index) => (
          <StampRallyCell
            key={index + 4}
            text={format(date, 'E')} // 曜日のみ表示
            stampSrc={StampImage}
            stamped={stampedDates.includes(format(date, 'yyyy-MM-dd'))}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default StampRally;