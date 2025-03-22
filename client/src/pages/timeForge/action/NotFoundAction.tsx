import { Stack, Typography, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NotFoundActionProps { }

const NotFoundAction: React.FC<NotFoundActionProps> = () => {
  const navigate = useNavigate();

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: '#f5f5f5', // 背景色
        background: 'linear-gradient(135deg, #6a11cb, #2575fc)', // 背景グラデーション
        color: 'white',
        textAlign: 'center',
        p: 3, // パディングを追加
        boxSizing: 'border-box',
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', letterSpacing: 1 }}>
        アクションを選んでください
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/time-forge")}
        sx={{
          width: 200,
          height: 60,
          fontSize: 18,
          fontWeight: 'bold',
          backgroundColor: '#ff4081', // ボタンの色
          boxShadow: 3, // ボタンに影をつける
          '&:hover': {
            backgroundColor: '#ff80ab', // ホバー時の色
            boxShadow: 6, // ホバー時に影を強調
          },
          transition: 'background-color 0.3s, box-shadow 0.3s', // アニメーション効果
          borderRadius: 2, // ボタンの角を丸く
        }}
      >
        ホームに戻る
      </Button>
    </Stack>
  );
};

export default NotFoundAction;
