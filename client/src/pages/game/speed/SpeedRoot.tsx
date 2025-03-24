import React from 'react';
import SpeedDisplay from './SpeedDisplay';
import { isPlayable, useSpeedGame } from './hooks/useSpeedGame';
import useSpeedAI from './hooks/useSpeedAI';
import useAutoPlaySpeed from './hooks/useAutoPlaySpeed';
import putCardSE from '../../../assets/sounds/put-card.mp3'; 
import dealingCardsSE from '../../../assets/sounds/dealing-cards.mp3'; 

interface SpeedRootProps {}

const SpeedRoot: React.FC<SpeedRootProps> = () => {
  const {
    tableCards,
    player1Hands,
    player1Deck,
    canPlayer1Play,
    player2Hands,
    player2Deck,
    canPlayer2Play,
    playCard,
    updateTableCards
  } = useSpeedGame();

  // プレイヤーのカードをプレイする関数（サウンド再生含む）
  const handlePlayCard = (player: "player1" | "player2", cardIndex: number, targetTableIndex?: number) => {
    const hands = player === "player1" ? player1Hands : player2Hands;
    if (isPlayable([hands[cardIndex]], tableCards)) {
      const audio = new Audio(putCardSE);
      audio.play();
      playCard(player, cardIndex, targetTableIndex);
    }
  };

  const handleUpdateTableCards = () => {
    const audio = new Audio(dealingCardsSE);
    audio.play();
    updateTableCards();
  };

  // AI のカード選択ロジックを提供
  useSpeedAI();

  // AI の自動プレイを管理
  useAutoPlaySpeed({
    aiHands: player2Hands,
    tableCards,
    aiCanPlay: canPlayer2Play,
    playCard: (cardIndex, targetTableIndex) => handlePlayCard("player2", cardIndex, targetTableIndex)
  });

  return (
    <div>
      <SpeedDisplay
        tableCards={tableCards}
        player1Hands={player1Hands}
        player1RemainingDeck={player1Deck.length}
        player2Hands={player2Hands}
        player2RemainingDeck={player2Deck.length}
        canSomeonePlay={canPlayer1Play || canPlayer2Play}
        playCard={handlePlayCard}
        onUpdateTableCard={handleUpdateTableCards}
      />
    </div>
  );
};

export default SpeedRoot;
