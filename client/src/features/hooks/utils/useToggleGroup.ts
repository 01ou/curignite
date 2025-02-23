import { useState, useCallback, useMemo } from "react";

interface ToggleGroupOptions {
  defaultState: boolean;
  defaultOpenIds: string[];
  singleOpen: boolean;
  onChange?: (isActive: boolean, id?: string) => void;
}

const useToggleGroup = (options: Partial<ToggleGroupOptions> = {}) => {
  const config = useMemo(() => {
    return {
      defaultState: false,
      singleOpen: true,
      defaultOpenIds: [],
      ...options,
    } as ToggleGroupOptions;
  }, [options]);

  // 初期状態は、defaultOpenIds に指定されたIDを true に、それ以外は 'default' キーとして初期状態を設定
  const [toggles, setToggles] = useState<Record<string, boolean>>(() => {
    if (!config.defaultOpenIds) return { default: config.defaultState };
    const initialToggles: Record<string, boolean> = {};
    config.defaultOpenIds.forEach(id => {
      initialToggles[id] = true;
    });
    return initialToggles;
  });

  // IDが文字列でなければ 'default' を返す
  const getNormalizedId = (id: any) => (typeof id === "string" ? id : "default");

  // singleOpen が true の場合、指定のIDのみをアクティブにし、他は全て反転させる
  const setExclusiveToggle = useCallback((id: string, isActive: boolean) => {
    setToggles(prev => {
      const newToggles = {} as Record<string, boolean>;
      Object.keys(prev).forEach(key => {
        newToggles[key] = !isActive;
      });
      newToggles[id] = isActive;
      config.onChange?.(isActive, id);
      return newToggles;
    });
  }, [config]);

  // 全てのトグル状態を一括で設定する
  const setAllToggles = useCallback((isActive: boolean) => {
    setToggles(prev => {
      const newToggles = Object.keys(prev).reduce((acc, key) => {
        acc[key] = isActive;
        return acc;
      }, {} as Record<string, boolean>);
      config.onChange?.(isActive);
      return newToggles;
    });
  }, [config]);

  const activateAll = useCallback(() => setAllToggles(true), [setAllToggles]);
  const deactivateAll = useCallback(() => setAllToggles(false), [setAllToggles]);

  // 指定のIDの状態を更新する
  const setToggle = useCallback((id: string, isActive: boolean) => {
    if (config.singleOpen) {
      isActive ? setExclusiveToggle(id, true) : deactivateAll();
    } else {
      setToggles(prev => ({ ...prev, [id]: isActive }));
    }
    config.onChange?.(isActive, id === "default" ? undefined : id);
  }, [config, setExclusiveToggle, deactivateAll]);

  // 指定のIDがアクティブかどうかを返す（指定がなければ 'default' を参照）
  const isActive = useCallback((id: any = "default") => {
    return toggles[getNormalizedId(id)] ?? config.defaultState;
  }, [config, toggles]);

  // 指定のIDをアクティブにする
  const activate = useCallback((id: any = "default") => {
    setToggle(getNormalizedId(id), true);
  }, [setToggle]);

  // 指定のIDを非アクティブにする
  const deactivate = useCallback((id: any = "default") => {
    setToggle(getNormalizedId(id), false);
  }, [setToggle]);

  // 指定のIDの状態をトグルする
  const toggle = useCallback((id: any = "default") => {
    const normalizedId = getNormalizedId(id);
    const currentState = toggles[normalizedId] ?? config.defaultState;
    setToggle(normalizedId, !currentState);
  }, [config, toggles, setToggle]);

  // 指定のIDのみをアクティブにする（他は全て非アクティブにする）
  const activateExclusively = useCallback((id: string) => {
    setExclusiveToggle(id, true);
  }, [setExclusiveToggle]);

  // 指定のIDのみを非アクティブにする（他は全てアクティブにする）
  const deactivateExclusively = useCallback((id: string) => {
    setExclusiveToggle(id, false);
  }, [setExclusiveToggle]);

  // 'default' キーの状態を返す
  const defaultToggle = useMemo(() => toggles["default"] ?? config.defaultState, [config, toggles]);

  return {
    defaultToggle,
    isActive,
    activate,
    deactivate,
    toggle,
    activateAll,
    deactivateAll,
    activateExclusively,
    deactivateExclusively,
  };
};

export default useToggleGroup;
