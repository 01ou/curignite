import React from 'react';
import ActionList from './ActionList';
import { actionIconMap, creativeIds, restIds, trainingIds } from './actionItems';
import { ActionCategory, actionCategoryBgColorMap, actionCategoryColorMap } from '../types/actionTypes';
import useActionStorage from './useActionStorage';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SleepTypeSelector from './sleep/SleepTypeSelector';

interface ActionManagerProps {
  actionCategory: ActionCategory;
}

const ActionManager: React.FC<ActionManagerProps> = ({ actionCategory }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { startAction } = useActionStorage();

  const handleStartAction = (actionId: string) => {
    startAction(actionId, actionCategory);
    navigate("/time-forge/action");
  }

  const handleStartSleep = (category: ActionCategory) => {
    startAction(category === "sleep" ? "sleep" : "nap", category);
    navigate("/time-forge/action");
  }

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
    }
  }
  return (
    <>
      {actionCategory === "sleep" ? (
        <SleepTypeSelector onSelectType={handleStartSleep} />
      ) : (
        <ActionList
          actionName={actionSetting[actionCategory].name}
          buttonColor={actionCategoryColorMap[actionCategory]}
          bgcolor={actionCategoryBgColorMap[actionCategory]}
          actionItems={actionSetting[actionCategory].items.map(id => (
            { id: id, label: t(id), Image: actionIconMap[id] }
          ))}
          onClickAction={handleStartAction}
        />
      )}
    </>
  );
};

export default ActionManager;