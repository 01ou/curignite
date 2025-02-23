import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Dialogue, DialogueElement } from "../../../types/dialogue/DialogueTypes";
import { NodeContent } from "../../../types/dialogue/NodeTypes";
import i18n from "../../../locales/i18n";

const useLocalizedDialogues = (
  nodeContents: Record<string, NodeContent>,
  getActiveContents: (contents: string, activeContentsKey: string | null) => string
) => {
  const { t } = useTranslation();

  return useMemo(() => {
    const mergedDialogues: Record<string, Dialogue> = {};
    Object.entries(nodeContents).forEach(([id, { contentsKey, activeContentsKey, nodes }]) => {
      const contents = getActiveContents(t(contentsKey), activeContentsKey ?? null);
      mergedDialogues[id] = {
        contents,
        activeContentsKey,
        elements: nodes.map((node) => {
          if (node.type === "button") {
            return {
              ...node,
              text: node.textKey ? t(node.textKey) : "",
              disabled: node.requiredInputs,
              next: node.next,
              onClick: () => {},
            } as DialogueElement;
          }
          if (node.type === "inputText") {
            return {
              ...node,
              label: node.labelKey ? t(node.labelKey) : "",
              value: "",
              onChange: (_) => {},
            } as DialogueElement;
          }
          return node as DialogueElement;
        }),
      };
    });
    return mergedDialogues;
  }, [t, nodeContents, i18n, getActiveContents]);
};

export default useLocalizedDialogues;
