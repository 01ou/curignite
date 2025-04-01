// 汎用ローカルストレージの読み取り
export const getFromStorage = <T>(key: string): T | null => {
  const dataString = localStorage.getItem(key);
  return dataString ? JSON.parse(dataString) : null;
};

// 汎用ローカルストレージへの保存
export const saveToStorage = (key: string, data: unknown) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// 汎用ローカルストレージの削除
export const removeFromStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const incrementNumberStorage = (key: string, step: number = 1) => {
  const value = getFromStorage(key) ?? 0;
  if (typeof value === "number") {
    saveToStorage(key, value + step);
  }
}

export const pushToArrayStorage = <T>(key: string, item: T) => {
  const value = getFromStorage(key) ?? [];
  if (Array.isArray(value)) {
    saveToStorage(key, [...value, item]);
  }
}

export const updateObjectStorage = <T extends Record<string, any>>(key: string, object: Partial<T>) => {
  const prevObject: Record<string, any> = getFromStorage(key) ?? {};
  if (prevObject !== null && typeof prevObject === "object") {
    const newObject: Record<string, any> = {};
    const keys = [...Object.keys(prevObject), ...Object.keys(object)];
    keys.forEach((key) => {
      newObject[key] = object[key] ?? prevObject[key] ?? null;
    })
    saveToStorage(key, newObject);
  }
}