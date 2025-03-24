import { TrumpCard } from "../../types/trumpTypes";
import { isPlayable } from "./useSpeedGame";

const useSpeedAI = () => {
  const choiceCard = (
    hands: TrumpCard[],
    _: TrumpCard[], // playerHands
    tableCards: TrumpCard[]
  ): { playCardIndex: number; targetTableIndex: number } => {
    // 手札の各カードについて、テーブル上のカードとの組み合わせを探索
    for (let i = 0; i < hands.length; i++) {
      for (let j = 0; j < tableCards.length; j++) {
        if (isPlayable(hands[i], tableCards[j])) {
          // 最初に見つかったプレイ可能なカードとテーブルカードのインデックスを返す
          return { playCardIndex: i, targetTableIndex: j };
        }
      }
    }

    // もしどのカードもプレイできなければ、-1を返す
    return { playCardIndex: -1, targetTableIndex: -1 };
  };

  return { choiceCard };
};

export default useSpeedAI;
