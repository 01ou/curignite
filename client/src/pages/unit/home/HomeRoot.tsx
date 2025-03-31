import React, { useEffect, useState } from 'react';
import HomeCharacter from '../character/HomeCharacter';
import HomeLifeRecord from '../lifeRecord/HomeLifeRecord';
import HomeDailyHabits from '../dailyHabits/HomeDailyHabits';
import { Stack } from '@mui/material';
import TrainingExp from '../lifeRecord/training/TrainingExp';
import useActionInfo from '../hooks/useActionInfo';
import Popup from '../../../components/utils/Popup';
import TrainingResult from '../lifeRecord/training/TrainingResult';
import useHistoryAnalysis from '../../timeForge/hooks/useHistoryAnalysis';
import useActionStorage from '../../timeForge/hooks/useActionStorage';

interface HomeRootProps { }

const HomeRoot: React.FC<HomeRootProps> = ({}) => {
  const { getActionTime } = useHistoryAnalysis();
  const { getHistory } = useActionStorage();
  const { getLastActionInfo, setDisplayedEffectState } = useActionInfo();
  const [openPopup, setOpenPopup] = useState<"actionEnd" | null>(null);

  useEffect(() => {
    const info = getLastActionInfo();
    if (!info?.displayedEffect) {
      setOpenPopup("actionEnd");
      setDisplayedEffectState(true);
    }
  }, []);
  
  return (
    <>
      <Stack direction="column" alignItems="center" spacing={4} >
        <TrainingExp exp={getActionTime(getHistory()).trainingTimeMs} />
        <HomeCharacter />
        <HomeLifeRecord />
        <HomeDailyHabits />
      </Stack>
      <Popup open={!!openPopup} onClose={() => setOpenPopup(null)} >
        <TrainingResult />
      </Popup>
    </>
  );
};

export default HomeRoot;