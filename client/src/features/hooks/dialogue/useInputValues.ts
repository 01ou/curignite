import { useMemo, useState } from "react";
import { Dialogue, DialogueElement } from "../../../types/dialogue/DialogueTypes";
import { useNavigate } from "react-router-dom";

const useInputValues = (
  dialogues: Record<string, Dialogue>,
) => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  // input の値変更をハンドリングする関数
  const handleInputChange = (elementId: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [elementId]: value }));
  };

  // ボタンなどのクリックイベントをハンドリングする関数
  const handleElementClick = (element: DialogueElement) => {
    if (element.type === "button") {
      navigate(`?id=${element.next}`);
    }
  };

  // dialogues に対して、inputText 要素の value を更新したコピーを作成する
  const activeDialogues = useMemo(() => {
    const updatedDialogues: Record<string, Dialogue> = {};
    Object.entries(dialogues).forEach(([id, dialogue]) => {
      const updatedElements = dialogue.elements.map((element) => {
        if (element.type === "inputText") {
          return {
            ...element,
            value: inputValues[element.id] ?? "",
          } as DialogueElement;
        }
        return element;
      });
      updatedDialogues[id] = { ...dialogue, elements: updatedElements };
    });
    return updatedDialogues;
  }, [dialogues, inputValues]);

  return { activeDialogues, inputValues, handleInputChange, handleElementClick };
};

export default useInputValues;
