import { Hex } from "../../../types/utils/colorTypes";

export type ActionCategory = "training" | "rest" | "creative" | "sleep";

export type ActionData = {
  actionId: string;
  category: ActionCategory;
  startTimestampMs: number;
  endTimestampMs?: number;
};

export const actionCategoryColorMap: Record<ActionCategory, Hex> = {
  training: "#E23B3B",
  rest: "#4BE02A",
  creative: "#C1E02A",
  sleep: "#2A79E0",
}

export const actionCategoryBgColorMap: Record<ActionCategory, Hex> = {
  training: "#FFC7C7",
  rest: "#CBFFC7",
  creative: "#FFFEC7",
  sleep: "#BDD6FF",
}

