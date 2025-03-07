import React, { useState, useEffect } from 'react';
import Popup from '../../../components/utils/Popup';
import StampRally from './stampRally/StampRally';
import { Button, Stack } from '@mui/material';

const LOCAL_STORAGE_KEY = 'lastAccessDate';

const isFirstAccessToday = (): boolean => {
  const lastAccess = localStorage.getItem(LOCAL_STORAGE_KEY);
  const today = new Date().toISOString().split('T')[0];
  
  if (lastAccess === today) return false;
  
  localStorage.setItem(LOCAL_STORAGE_KEY, today);
  return true;
};

const DailyPopups: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isFirstAccessToday()) {
      setOpen(true);
    }

    setOpen(true);
  }, []);

  return (
    <Popup open={open} onClose={() => setOpen(false)} justifyContent="center" >
      <Stack direction="column" alignItems="center" spacing={4}>
        <StampRally />
        <Button sx={{ width: 120, height: 60, bgcolor: "skyblue", fontSize: 24, color: "black" }} onClick={() => setOpen(false) }>
          OK
        </Button>
      </Stack>
    </Popup>
  );
};

export default DailyPopups;
