import { ActionCategory } from "../types/actionTypes";

type ActionData = {
  actionId: string;
  category: ActionCategory;
  startTimestampMs: number;
  endTimestampMs?: number;
};

const STORAGE_KEYS = {
  ACTIVE: "activeAction",
  HISTORY: "actionHistory",
};

const useActionStorage = () => {
  // アクティブアクションの保存
  const startAction = (actionId: string, category: ActionCategory, startTimestamp = new Date()) => {
    endCurrentAction(); // 既存アクションの終了
    saveToStorage(STORAGE_KEYS.ACTIVE, {
      actionId,
      category,
      startTimestampMs: startTimestamp.getTime(),
    });
  };

  const getCurrentAction = (): ActionData | null => {
    return getFromStorage<ActionData>(STORAGE_KEYS.ACTIVE);
  }

  // アクティブアクションのキャンセル
  const cancelCurrentAction = () => {
    removeFromStorage(STORAGE_KEYS.ACTIVE);
  };

  // アクティブアクションの終了
  const endCurrentAction = () => {
    const activeAction = getCurrentAction();
    if (activeAction) {
      addHistory({
        ...activeAction,
        endTimestampMs: new Date().getTime(),
      });
      removeFromStorage(STORAGE_KEYS.ACTIVE);
    }
  };

  // 履歴への追加
  const addHistory = (newAction: ActionData) => {
    const history = getHistory();
    history.push(newAction);
    saveToStorage(STORAGE_KEYS.HISTORY, history);
  };

  // 履歴の取得
  const getHistory = (): ActionData[] => {
    return getFromStorage<ActionData[]>(STORAGE_KEYS.HISTORY) || [];
  };

  // 汎用ローカルストレージの読み取り
  const getFromStorage = <T>(key: string): T | null => {
    const dataString = localStorage.getItem(key);
    return dataString ? JSON.parse(dataString) : null;
  };

  // 汎用ローカルストレージへの保存
  const saveToStorage = (key: string, data: unknown) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // 汎用ローカルストレージの削除
  const removeFromStorage = (key: string) => {
    localStorage.removeItem(key);
  };

  return { startAction, getCurrentAction, cancelCurrentAction, endCurrentAction, getHistory };
};

export default useActionStorage;
