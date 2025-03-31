import React, { useEffect, useState } from 'react';
import DailyHabitsStatus from './DailyHabitsStatus';
import { Button, Stack, Typography } from '@mui/material';
import Popup from '../../../components/utils/Popup';
import CircularProgressWithLabel from '../../../components/display/CircularProgressWithLabel';
import useDailyHabitsStorage from '../hooks/useDailyHabitsStorage';

interface HomeDailyHabitsProps { }

const HomeDailyHabits: React.FC<HomeDailyHabitsProps> = ({}) => {
  const [openPopup, setOpenPopup] = useState(false);
  const { setHabitSetting, getHabitSetting, getContinuousCount, getProgress, differenceInLastWorkOn, workOnHabits } = useDailyHabitsStorage();
  
  useEffect(() => {
    setHabitSetting({ contents: "速単を毎日見開き1ページ読む", targetDays: 30 });
  }, []);

  const habitsContents = getHabitSetting()?.contents ?? "";
  const targetDays = getHabitSetting()?.targetDays ?? 30;
  const didItToday = differenceInLastWorkOn() === 0;

  return (
    <>
      <Button sx={{ color: "black", bgcolor: "#FFFC4B", padding: 1, borderRadius: 1, boxShadow: 2 }} onClick={() => setOpenPopup(true)} >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
            <Typography variant='h6'>
              毎日チャレンジ
            </Typography>
            <DailyHabitsStatus
              targetHabits={habitsContents}
              targetDays={targetDays}
              currentDays={getProgress()}
              didItToday={didItToday}
              consecutiveEfforts={getContinuousCount()}
            />
        </Stack>
      </Button>
      <Popup open={openPopup} onClose={() => setOpenPopup(false)} justifyContent="center" >
        <Stack direction="column" alignItems="center" justifyContent="center" spacing={2} sx={{ bgcolor: "#FEFFDC", padding: 3, borderRadius: 1 }}>
          <Typography variant='h4'>
            毎日チャレンジ
          </Typography>
          <Typography variant='h6'>
            {habitsContents}
          </Typography>
          <CircularProgressWithLabel
            targetValue={targetDays}
            currentValue={getProgress()}
            size={200}
          />
          <Button variant="contained" sx={{ width: 140, height: 60, fontSize: "1.2rem" }} onClick={() => {
            workOnHabits();
            setOpenPopup(false);
          }}
            disabled={didItToday}
          >
            {didItToday ? "完了済み" : "完了"}
          </Button>
        </Stack>
      </Popup>
    </>
  );
};

export default HomeDailyHabits;