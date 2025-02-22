export interface Dialogue {
  contents: string;
  activeContentsKey?: string;
  elements: DialogueElement[];
}

export interface ButtonDialogueElement {
  type: "button";
  text: string;
  next: string;
  color: string;
  disabled?: boolean;
  requiredInputs?: string[];
  onClick: () => void;
}

export interface InputTextDialogueElement {
  type: "inputText";
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export type DialogueElement = (ButtonDialogueElement | InputTextDialogueElement) & {
  id: string;
};