import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { getCenteredPosition, getTextOutline } from '../../functions/style/sxUtils';

interface StartButtonProps { }

const StartButton: React.FC<StartButtonProps> = ({}) => {

  return (
    <Box sx={{
      position: "absolute",
      ...getCenteredPosition({ x: 50, y: 75 }),
    }}>
      <Button
        sx={{
          bgcolor: "orange",
          border: 4,
          borderColor: "#E30004",
          width: 160,
          height: 65,
          paddingLeft: 4, // 左右のパディング
          paddingRight: 4,
          borderRadius: "40px", // 半円の端を作るために高さの半分の値にする
          color: "white", // 文字の色
          textTransform: "none", // 文字を大文字に変換しない
          transition: "transform 0.2s ease-in-out",
          '&:hover': {
            transform: "scale(1.1)",
            backgroundColor: "#orange", // ホバー時の背景色
          },
        }}
      >
        <Typography variant="h5" sx={{ whiteSpace: "nowrap", ...getTextOutline("#301C1C", 1), fontWeight: "bold", }}>はじめる</Typography>
      </Button>
    </Box>
  );
};

export default StartButton;