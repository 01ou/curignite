import React from 'react';
import character from "../../../assets/sample-character-idle.png";
import { Avatar, Box } from '@mui/material';
import { getCenteredPosition } from '../../../functions/style/sxUtils';
import { keyframes } from '@mui/system';

// keyframes を使って上下に揺れるアニメーションを定義
const swayAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

interface CharacterDisplayProps {
  size?: number;
}

const CharacterDisplay: React.FC<CharacterDisplayProps> = ({ size = 160 }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        ...getCenteredPosition({ x: 50, y: 45 })
      }}
    >
      <Avatar 
        src={character} 
        sx={{ 
          width: size, 
          height: size,
          animation: `${swayAnimation} 2s ease-in-out infinite`
        }} 
      />
    </Box>
  );
};

export default CharacterDisplay;
