import { useMemo, useState, useCallback } from "react";
import { Dialogue } from "../../types/dialogue/DialogueTypes";

// プレースホルダを置き換える関数
const replacePlaceholders = (text: string, replaces: Record<string, string>) => {
  return text.replace(/\$\[([^\]]+)\]/g, (_, id) => replaces[id] || "");
};

const useDynamicDialogue = (initialDialogue: Dialogue | null, initialReplaces: Record<string, string>) => {
  const [replaces, setReplaces] = useState<Record<string, string>>(initialReplaces);

  // 動的な会話内容を生成
  const dynamicDialogue = useMemo(() => {
    if (!initialDialogue) return null;

    return {
      ...initialDialogue,
      contents: replacePlaceholders(initialDialogue.contents, replaces),
      elements: initialDialogue.elements.map((element) => {
        switch (element.type) {
          case "inputText":
            return { ...element, label: replacePlaceholders(element.label, replaces) };
          case "button":
            return { ...element, text: replacePlaceholders(element.text, replaces) };
          default:
            return element;
        }
      }),
    };
  }, [initialDialogue, replaces]);

  // replaces を更新する関数
  const updateReplaces = useCallback((key: string, value: string) => {
    setReplaces((prev) => ({ ...prev, [key]: value }));
  }, []);

  return { dynamicDialogue, updateReplaces };
};

export default useDynamicDialogue;
