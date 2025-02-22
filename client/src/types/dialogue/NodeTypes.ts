export interface ButtonNode {
  type: "button";
  textKey: string;
  requiredInputs?: string[];
  color: string;
  next: string;
}

export interface InputTextNode {
  type: "inputText";
  labelKey: string;
}

export type Node = (ButtonNode | InputTextNode) & {
  id: string;
};

// 固定部分の定義用型
export interface NodeContent {
  contentsKey: string;
  activeContentsKey?: string;
  nodes: Node[];
}