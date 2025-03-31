import React, { useState } from 'react';
import ActionSelectButton from './ActionSelectButton';
import { Forest, LocalFireDepartment } from '@mui/icons-material';
import { Stack } from '@mui/material';
import Popup from '../../../components/utils/Popup';
import { t } from 'i18next';
import { trainingIds, restIds, creativeIds, actionIconMap } from '../../timeForge/category/actionItems';
import ActionList from './ActionList';
import { actionCategoryColorMap, actionCategoryBgColorMap, ActionCategory } from '../../timeForge/types/actionTypes';
import { useNavigate } from 'react-router-dom';
import useActionStorage from '../../timeForge/hooks/useActionStorage';

interface HomeLifeRecordProps { }

const actionSetting = {
  training: {
    name: "鍛錬",
    items: trainingIds
  },
  rest: {
    name: "休息",
    items: restIds
  },
  creative: {
    name: "創造",
    items: creativeIds
  },
  sleep: {
    name: "睡眠",
    items: []
  }
}

const HomeLifeRecord: React.FC<HomeLifeRecordProps> = ({}) => {
  const navigate = useNavigate();
  const { startAction } = useActionStorage();
  const [actionCategory, setActionCategory] = useState<ActionCategory | null>(null);

  const handleStartAction = (actionId: string) => {
    if (actionCategory) {
      startAction(actionId, actionCategory);
      navigate("/unit/action");
    }
  }

  return (
    <div>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} >
        <ActionSelectButton
          title='鍛錬'
          contents='勉強・運動を始める'
          Image={<LocalFireDepartment sx={{ width: 80, height: 80 }} />}
          bgcolor='#E23B3B'
          buttonSx={{ width: 320, height: 105 }}
          onClick={() => setActionCategory("training")}
        />
        <ActionSelectButton
          title='休息'
          contents='娯楽で心身を休める'
          Image={<Forest sx={{ width: 70, height: 70 }} />}
          bgcolor='#3FD395'
          buttonSx={{ width: 320, height: 105 }}
          onClick={() => setActionCategory("rest")}
        />
      </Stack>
      <Popup onClose={() => setActionCategory(null)} >
        {actionCategory &&
          <ActionList
            actionName={actionSetting[actionCategory].name}
            buttonColor={actionCategoryColorMap[actionCategory]}
            bgcolor={actionCategoryBgColorMap[actionCategory]}
            actionItems={actionSetting[actionCategory].items.map(id => (
              { id: id, label: t(id), Image: actionIconMap[id] }
            ))}
            onClickAction={handleStartAction}
          />
        }
      </Popup>
    </div>
  );
};

export default HomeLifeRecord;