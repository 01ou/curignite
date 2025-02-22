import { NodeContent } from "../../types/dialogue/NodeTypes";
import useActiveContents from "./useActiveContents";
import useCurrentDialogueId from "./useCurrentDialogueId";
import useDynamicDialogue from "./useDynamicDialogue";
import useInputValues from "./useInputValues";
import useLocalizedDialogues from "./useLocalizedDialogues";

const useDialogues = (
  {
    nodeContents,
    defaultId,
    notFoundId,
    getReplace,
  }: 
  {
    nodeContents: Record<string, NodeContent>;
    defaultId: string;
    notFoundId: string;
    getReplace?: (inputValues: Record<string, string>) => Record<string, string>;
  }
) => {
  const { currentId, setDialogueId } = useCurrentDialogueId(defaultId);
  const { updateActiveContents, getActiveContents } = useActiveContents();

  const dialogues = useLocalizedDialogues(nodeContents, getActiveContents);
  const { activeDialogues, inputValues, handleInputChange, handleElementClick } = useInputValues(dialogues);

  // 現在のダイアログが存在するかチェック
  const currentDialogue = activeDialogues[currentId] ?? null;
  const { dynamicDialogue, updateReplaces } = useDynamicDialogue(currentDialogue, getReplace?.(inputValues) ?? {});

  // ダイアログが見つからない場合、notFoundIdのダイアログを返す
  if (!dynamicDialogue) {
    console.error(`Dialogue with ID '${currentId}' not found. Fallback to '${notFoundId}'.`);
    return {
      currentDialogue: activeDialogues[notFoundId], // notFoundIdに基づいたダイアログを返す
      inputValues,
      handleInputChange,
      handleElementClick,
      updateActiveContents,
      setDialogueId,
      updateReplaces
    };
  }

  return { currentDialogue: dynamicDialogue, inputValues, handleInputChange, handleElementClick, updateActiveContents, setDialogueId, updateReplaces };
};

export default useDialogues;
