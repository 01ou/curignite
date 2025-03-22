import { Grid, Stack, Typography } from '@mui/material';
import React, { ReactNode, useState } from 'react';
import Popup from '../../../components/utils/Popup';
import ActionManager from '../category/ActionManager';
import HomeBottomNavigation from '../navigation/bottomNavigation/HomeBottomNavigation';
import SelectCategoryButton from './SelectCategoryButton';
import useActionStorage from '../hooks/useActionStorage';
import { ActionCategory } from '../types/actionTypes';
import { LocalFireDepartment, Forest, Landscape, Bedtime } from '@mui/icons-material';
import useHistoryAnalysis from '../hooks/useHistoryAnalysis';
import TodayOverview from '../status/TodayOverview';

interface StartActionProps { }

interface Category {
  label: string;
  explanation: string;
  Image: ReactNode;
  bgcolor: string;
  actionCategory: ActionCategory;
}

const categories: Category[] = [
  {
    label: '鍛錬',
    explanation: "勉強や運動など\nあなたが本気で頑張りたいこと",
    Image: <LocalFireDepartment sx={{ width: 64, height: 64 }} />,
    bgcolor: '#E23B3B',
    actionCategory: "training"
  },
  {
    label: '休息',
    explanation: "ゲームやSNSなど\nリフレッシュのための趣味や娯楽",
    Image: <Forest sx={{ width: 64, height: 64 }} />,
    bgcolor: '#4BE02A',
    actionCategory: "rest"
  },
  {
    label: '創造',
    explanation: "歌や絵、瞑想など\n楽しみながらスキルも磨ける活動",
    Image: <Landscape sx={{ width: 64, height: 64 }} />,
    bgcolor: '#C1E02A',
    actionCategory: "creative"
  },
  {
    label: '睡眠',
    explanation: "寝ましょう！睡眠は\n成長に欠かせません",
    Image: <Bedtime sx={{ width: 64, height: 64 }} />,
    bgcolor: '#2A79E0',
    actionCategory: "sleep"
  },
];

const StartAction: React.FC<StartActionProps> = () => {
  const { getHistory } = useActionStorage();
  const { getActionTime } = useHistoryAnalysis();
  const [currentActionCategory, setCurrentActionCategory] = useState<ActionCategory | null>(null);

  const timeData = getActionTime(getHistory());

  return (
    <Stack direction="column" alignItems="center" justifyContent="center" spacing={0} pb={20} overflow="auto" >
      <TodayOverview {...timeData} />
      <Stack direction="column" alignItems="center" justifyContent="center" mt={2} >
        <Typography variant='h6' >
          分類
        </Typography>
        <Grid container spacing={1} justifyContent="center" >
          {categories.map((category, index) => (
            <Grid key={index} item >
              <SelectCategoryButton
                key={index}
                label={category.label}
                explanation={category.explanation}
                Image={category.Image}
                bgcolor={category.bgcolor}
                onClick={() => setCurrentActionCategory(category.actionCategory)}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
      <Popup onClose={() => setCurrentActionCategory(null)} justifyContent="center" >
        {currentActionCategory && <ActionManager actionCategory={currentActionCategory} />}
      </Popup>
      <HomeBottomNavigation />
    </Stack>
  );
};

export default StartAction;

