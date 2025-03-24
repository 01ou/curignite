import React from "react";
import { Card, CardContent, Typography, Grid, Box, Button } from "@mui/material";
import { TrumpCard, TrumpMark } from "../types/trumpTypes";

interface SpeedDisplayProps {
  tableCards: TrumpCard[];
  player1Hands: TrumpCard[];
  player2Hands: TrumpCard[];
  player1RemainingDeck: number;
  player2RemainingDeck: number;
  canSomeonePlay: boolean;
  playCard: (player: "player1" | "player2", cardIndex: number, targetTableIndex?: number) => void;
  onUpdateTableCard: () => void;
}

const SpeedDisplay: React.FC<SpeedDisplayProps> = ({
  tableCards,
  player1Hands,
  player2Hands,
  player1RemainingDeck,
  player2RemainingDeck,
  canSomeonePlay,
  playCard,
  onUpdateTableCard
}) => {
  return (
    <Box sx={{ width: "100%", maxWidth: 600, margin: "auto", textAlign: "center", mt: 4 }}>
      {/* プレイヤー2の手札 */}
      <Grid container spacing={1} justifyContent="center">
        {player2Hands.map((card, index) => (
          <Grid key={index} item>
            <TrumpCardComponent card={card} onClick={() => playCard("player2", index)} />  
          </Grid>
        ))}
      </Grid>

      {/* 山札と場札 */}
      <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ my: 3 }}>
        <Grid item>
          <DeckDisplay remaining={player2RemainingDeck} label="P2 Deck" />
        </Grid>

        {tableCards.map((card, index) => (
          <Grid item key={index}>
            <TrumpCardComponent card={card} />
          </Grid>
        ))}

        <Grid item>
          <DeckDisplay remaining={player1RemainingDeck} label="P1 Deck" />
        </Grid>
      </Grid>

      {/* プレイヤー1の手札 */}
      <Grid container spacing={1} justifyContent="center">
        {player1Hands.map((card, index) => (
          <Grid key={index} item>
            <TrumpCardComponent card={card} onClick={() => playCard("player1", index)} />
          </Grid>
        ))}
      </Grid>

      <Button
        variant="outlined"
        disabled={canSomeonePlay}
        onClick={onUpdateTableCard}
      >
        場札を更新
      </Button>
    </Box>
  );
};

// トランプカードの表示コンポーネント
const TrumpCardComponent: React.FC<{ card: TrumpCard, onClick?: () => void }> = ({ card, onClick }) => {
  return (
    <Card sx={{ width: 90, height: 120, display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Button sx={{ width: "100%", height: "100%" }} onClick={onClick}>
        <CardContent >
          <Typography variant="h6">{getCardSymbol(card)}</Typography>
        </CardContent>
      </Button>
    </Card>
  );
};

// 山札の表示コンポーネント
const DeckDisplay: React.FC<{ remaining: number; label: string }> = ({ remaining, label }) => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Card sx={{ width: 60, height: 90, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography variant="h6">{remaining}</Typography>
      </Card>
      <Typography variant="caption">{label}</Typography>
    </Box>
  );
};

// トランプのマークを記号に変換
const getCardSymbol = (card: TrumpCard): string => {
  const suits: Record<TrumpMark, string> = {
    heart: "♥",
    spade: "♠",
    diamond: "♦",
    clover: "♣",
  };
  return `${suits[card.mark]} ${card.value}`;
};

export default SpeedDisplay;
