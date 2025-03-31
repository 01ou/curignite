import { getFromStorage, saveToStorage, updateObjectStorage } from "../../../functions/webStorageUtils/useLocalStorageUtils";
import { ActionData } from "../../timeForge/types/actionTypes";

interface ActionInfo extends ActionData {
  endTimestampMs: number;
  startExp: number;
  endExp: number;
  displayedEffect?: boolean;
}

enum STORAGE_KEYS {
  INFO = "unit_actionInfo"
}

const useActionInfo = () => {
  const setLastActionInfo = (info: ActionInfo) => {
    saveToStorage(STORAGE_KEYS.INFO, info);
    console.log("save", STORAGE_KEYS.INFO, info);
    
  }

  const setDisplayedEffectState = (state: boolean) => {
    updateObjectStorage<ActionInfo>(STORAGE_KEYS.INFO, { displayedEffect: state });
  }

  const getLastActionInfo = () => {
    console.log("load", STORAGE_KEYS.INFO, getFromStorage<ActionInfo>(STORAGE_KEYS.INFO));
    
    return getFromStorage<ActionInfo>(STORAGE_KEYS.INFO);
  }

  return { setLastActionInfo, setDisplayedEffectState, getLastActionInfo };
}

export default useActionInfo;