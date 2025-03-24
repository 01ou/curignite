export type TrumpMark = "heart" | "spade" | "diamond" | "clover";
export interface TrumpCard {
  id: number;
  mark: TrumpMark;
  value: number;
}