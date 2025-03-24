import { useState, useEffect, useCallback } from "react";
import { TrumpMark, TrumpCard } from "../../types/trumpTypes";

const suits: TrumpMark[] = ["heart", "spade", "diamond", "clover"];
type GameStatus = "progress" | "finish";

type GameState = {
  tableCards: TrumpCard[];
  tableDeck: TrumpCard[];
  discard: TrumpCard[];
  player1Hands: TrumpCard[];
  player2Hands: TrumpCard[];
  player1Deck: TrumpCard[];
  player2Deck: TrumpCard[];
  canPlayer1Play: boolean;
  canPlayer2Play: boolean;
  winner: "player1" | "player2" | null;
  state: GameStatus;
};

const createDeck = (): TrumpCard[] =>
  suits.flatMap((mark, suitIndex) =>
    Array.from({ length: 13 }, (_, i) => ({ id: suitIndex * 13 + i, mark, value: i + 1 }))
  );

const shuffle = (deck: TrumpCard[]) => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const isPlayable = (hands: TrumpCard | TrumpCard[], tableCards: TrumpCard | TrumpCard[]) =>
  (Array.isArray(hands) ? hands : [hands]).some(hand =>
    (Array.isArray(tableCards) ? tableCards : [tableCards]).some(tableCard =>
      Math.abs(hand.value - tableCard.value) === 1 || (hand.value === 1 && tableCard.value === 13) || (hand.value === 13 && tableCard.value === 1)
    )
  );

export const useSpeedGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    tableCards: [],
    tableDeck: [],
    discard: [],
    player1Hands: [],
    player2Hands: [],
    player1Deck: [],
    player2Deck: [],
    canPlayer1Play: false,
    canPlayer2Play: false,
    winner: null,
    state: "progress",
  });

  const initializeGame = useCallback(() => {
    const shuffledDeck = shuffle(createDeck());
    setGameState({
      tableCards: shuffledDeck.slice(40, 42),
      tableDeck: shuffledDeck.slice(42),
      discard: [],
      player1Hands: shuffledDeck.slice(0, 5),
      player2Hands: shuffledDeck.slice(5, 10),
      player1Deck: shuffledDeck.slice(10, 25),
      player2Deck: shuffledDeck.slice(25, 40),
      canPlayer1Play: true,
      canPlayer2Play: true,
      winner: null,
      state: "progress",
    });
  }, []);

  const updateTableCards = useCallback(() => {
    setGameState(prevState => {
      if (prevState.tableDeck.length < 2 && prevState.discard.length > 0) {
        const tableDeck = shuffle(prevState.discard);
        return {
          ...prevState,
          tableCards: tableDeck.slice(0, 2),
          tableDeck: tableDeck.slice(2),
          discard: prevState.tableCards,
        };
      }
      return {
        ...prevState,
        tableCards: prevState.tableDeck.slice(0, 2),
        tableDeck: prevState.tableDeck.slice(2),
        discard: [...prevState.discard, ...prevState.tableCards],
      };
    });
  }, []);

  const playCard = useCallback((player: "player1" | "player2", cardIndex: number, targetTableIndex?: number) => {
    setGameState(prevState => {
      const isPlayer1 = player === "player1";
      const hands = isPlayer1 ? prevState.player1Hands : prevState.player2Hands;
      const deck = isPlayer1 ? prevState.player1Deck : prevState.player2Deck;

      const cardToPlay = hands[cardIndex];
      if (!cardToPlay) return prevState;

      const chosenIndex = targetTableIndex ?? prevState.tableCards.findIndex(
        tableCard => isPlayable(cardToPlay, tableCard)
      );
      if (chosenIndex === -1) return prevState;

      const newTableCards = [...prevState.tableCards];
      newTableCards[chosenIndex] = cardToPlay;

      const newHands = hands.filter((_, i) => i !== cardIndex);
      if (deck[0]) {
        newHands.splice(cardIndex, 0, deck[0]);
      }
      const newDeck = deck.slice(1);

      return {
        ...prevState,
        tableCards: newTableCards,
        discard: [...prevState.discard, prevState.tableCards[chosenIndex]],
        player1Hands: isPlayer1 ? newHands : prevState.player1Hands,
        player2Hands: isPlayer1 ? prevState.player2Hands : newHands,
        player1Deck: isPlayer1 ? newDeck : prevState.player1Deck,
        player2Deck: isPlayer1 ? prevState.player2Deck : newDeck,
      };
    });
  }, []);

  useEffect(() => {
    setGameState(prevState => {
      return {
        ...prevState,
        canPlayer1Play: isPlayable(prevState.player1Hands, prevState.tableCards),
        canPlayer2Play: isPlayable(prevState.player2Hands, prevState.tableCards),
      }
    })
  }, [gameState.player1Hands, gameState.player2Hands, gameState.tableCards])

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    setGameState(prevState => {
      if (prevState.player1Hands.length === 0 && prevState.player1Deck.length === 0) {
        return { ...prevState, winner: "player1", state: "finish" };
      }
      if (prevState.player2Hands.length === 0 && prevState.player2Deck.length === 0) {
        return { ...prevState, winner: "player2", state: "finish" };
      }
      return prevState;
    });
  }, [gameState.player1Hands, gameState.player1Deck, gameState.player2Hands, gameState.player2Deck]);

  return {
    ...gameState,
    isPlayable,
    playCard,
    initializeGame,
    updateTableCards,
  };
};
