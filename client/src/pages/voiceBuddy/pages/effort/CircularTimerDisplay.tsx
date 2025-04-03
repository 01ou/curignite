import React from 'react'
import { Box, Typography } from '@mui/material'
import CircularProgressWithShadow from './CircularProgressWithShadow'

interface CircularTimerDisplayProps {
  text: string // 表示するタイマーの文字
  size?: number // 円のサイズ（px）
  fontSize?: number // タイマーの文字サイズ（px）
  progress?: number // 進捗度 (0 ~ 1 の割合)
  color?: string // プログレスバーの色
  thickness?: number
  shadowColor?: string // 影の色
}

const CircularTimerDisplay: React.FC<CircularTimerDisplayProps> = ({
  text,
  size = 100,
  fontSize = 20,
  progress = 1,
  color,
  thickness = 3,
  shadowColor = 'rgba(0, 0, 0, 0.2)',
}) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      {/* 影付きの円形プログレスバー */}
      <CircularProgressWithShadow
        variant="determinate"
        value={progress * 100}
        size={size}
        shadowColor={shadowColor}
        thickness={thickness}
        sx={{ color }}
      />

      {/* タイマーのテキスト */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Typography
          variant="h6"
          fontSize={fontSize}
          color="textPrimary"
          sx={{ whiteSpace: 'nowrap' }}
        >
          {text}
        </Typography>
      </Box>
    </Box>
  )
}

export default CircularTimerDisplay
