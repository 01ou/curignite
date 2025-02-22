import { useState, useMemo, useCallback } from "react";

const useActiveContents = () => {
  const [activeContents, setActiveContents] = useState<Record<string, string>>({});

  const updateActiveContents = useCallback((key: string, value: string) => {
    setActiveContents((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  // 必要な内容だけを計算した派生値を作成
  const computedActiveContents = useMemo(() => {
    return (contents: string, activeContentsKey: string | null) =>
      activeContentsKey && activeContents[activeContentsKey]
        ? activeContents[activeContentsKey]
        : contents;
  }, [activeContents]);

  return { activeContents, updateActiveContents, getActiveContents: computedActiveContents };
};

export default useActiveContents;
