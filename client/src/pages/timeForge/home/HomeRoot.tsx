import { Grid, Stack, Typography } from '@mui/material';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import SelectCategoryButton from './SelectCategoryButton';
import { Bedtime, Forest, Landscape, LocalFireDepartment } from '@mui/icons-material';
import TodayResultChart from './TodayResultChart';
import ProgressCircle from './ProgressCircle';
import ActionManager from '../category/ActionManager';
import { ActionCategory } from '../types/actionTypes';
import Popup from '../../../components/utils/Popup';
import useActionStorage from '../category/useActionStorage';
import { isToday } from 'date-fns';
import { useNavigate } from 'react-router-dom';

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

const HomeRoot: React.FC = () => {
  const navigate = useNavigate();
  const { getCurrentAction, getHistory } = useActionStorage();
  const [currentActionCategory, setCurrentActionCategory] = useState<ActionCategory | null>(null);

  const { trainingTimeMs, restTimeMs, creativeTimeMs, sleepTimeMs } = useMemo(() => {
    const history = getHistory() || [];
    return history.reduce(
      (acc, data) => {
        if (data?.endTimestampMs && isToday(data.endTimestampMs)) {
          const duration = data.endTimestampMs - data.startTimestampMs;
          switch (data.category) {
            case "training":
              acc.trainingTimeMs += duration;
              break;
            case "rest":
              acc.restTimeMs += duration;
              break;
            case "creative":
              acc.creativeTimeMs += duration;
              break;
            case 'sleep':
              acc.sleepTimeMs += duration;
              break;
            default:
              break;
          }
        }
        return acc;
      },
      { trainingTimeMs: 0, restTimeMs: 0, creativeTimeMs: 0, sleepTimeMs: 0 }
    );
  }, [getHistory]);

  useEffect(() => {
    if (getCurrentAction()) {
      navigate("/time-forge/action");
    }
  }, [])

  return (
    <Stack direction="column" alignItems="center" justifyContent="center" spacing={0} >
      <ProgressCircle sleepTimeMs={sleepTimeMs} size={80} sx={{ alignSelf: "end" }} />
      <TodayResultChart
        trainingTimeMs={trainingTimeMs}
        restTimeMs={restTimeMs}
        creativeTimeMs={creativeTimeMs}
      />
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
    </Stack>
  );
};

export default HomeRoot;
