import { useEffect } from 'react';
import { TrumpCard } from '../../types/trumpTypes';
import useSpeedAI from './useSpeedAI';

interface UseAutoPlaySpeedProps {
  aiHands: TrumpCard[];
  tableCards: TrumpCard[];
  aiCanPlay: boolean;
  minPlayTime?: number;
  maxPlayTime?: number;
  playCard: (cardIndex: number, targetTableIndex?: number) => void;
}

const useAutoPlaySpeed = ({
  aiHands,
  tableCards,
  aiCanPlay,
  minPlayTime = 500,
  maxPlayTime = 1500,
  playCard
}: UseAutoPlaySpeedProps) => {
  // AIのカード選択ロジック
  const { choiceCard } = useSpeedAI();

  useEffect(() => {
    if (!aiCanPlay) return;

    const getRandomInterval = () =>
      Math.floor(Math.random() * (maxPlayTime - minPlayTime)) + minPlayTime;

    const intervalId = setInterval(() => {
      if (aiCanPlay) {
        const choice = choiceCard(aiHands, [], tableCards);
        if (choice.playCardIndex !== -1) {
          playCard(choice.playCardIndex, choice.targetTableIndex);
        }
      }
    }, getRandomInterval());

    return () => clearInterval(intervalId);
  }, [aiCanPlay, minPlayTime, maxPlayTime, choiceCard, playCard]);

  return {};
};

export default useAutoPlaySpeed;
