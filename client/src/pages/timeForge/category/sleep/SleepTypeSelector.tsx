import { Stack, Typography } from '@mui/material';
import React from 'react';
import SleepTypeSelectButton from './SleepTypeSelectButton';
import { ActionCategory, actionCategoryBgColorMap, actionCategoryColorMap } from '../../types/actionTypes';

interface SleepTypeSelectorProps {
  onSelectType: (category: ActionCategory) => void;
}

const SleepTypeSelector: React.FC<SleepTypeSelectorProps> = ({ onSelectType }) => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
      sx={{
        padding: 3,
        bgcolor: actionCategoryBgColorMap["sleep"],
        borderRadius: 1
      }}
    >
      <Typography variant='h4' pt={1} >
        睡眠タイプ
      </Typography>
      <SleepTypeSelectButton
        label='仮眠'
        explanation={'15~90分が目安の短い睡眠\n適切な時間帯は13時~15時'}
        supplement='(休息時間)'
        bgcolor={actionCategoryColorMap["rest"]}
        onClick={() => onSelectType("rest")}
      />
      <SleepTypeSelectButton
        label='睡眠'
        explanation={'7~10時間が目安の長い睡眠\n毎日同じ時間に起きることが大切'}
        bgcolor={actionCategoryColorMap["sleep"]}
        onClick={() => onSelectType("sleep")}
      />
    </Stack>
  );
};

export default SleepTypeSelector;