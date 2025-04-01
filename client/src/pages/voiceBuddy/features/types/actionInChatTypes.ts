export type ActionType = "startingEffort";

export interface ActionChoices {
  id: ActionType;
  text: string;
  color?: string;
}
