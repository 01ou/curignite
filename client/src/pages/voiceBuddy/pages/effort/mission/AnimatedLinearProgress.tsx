import {
  keyframes,
  LinearProgress,
  LinearProgressProps,
  SxProps,
} from '@mui/material'
import React from 'react'

interface AnimatedLinearProgressProps extends LinearProgressProps {
  baseColor: string
  flowColor: string
  stopAnimation?: boolean
  stopColor?: string
  sx?: SxProps
}

// 光が流れるようなアニメーション
const shineAnimation = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
`

const AnimatedLinearProgress: React.FC<AnimatedLinearProgressProps> = ({
  sx,
  baseColor,
  flowColor,
  stopColor,
  stopAnimation,
  ...props
}) => {
  return (
    <LinearProgress
      {...props}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        '& .MuiLinearProgress-bar': {
          background: stopAnimation
            ? (stopColor ?? baseColor)
            : `linear-gradient(90deg, 
            ${baseColor} 0%, 
            ${flowColor} 50%, 
            ${baseColor} 100%)`,
          backgroundSize: '200% 100%',
          animation: `${shineAnimation} 2s linear infinite`,
        },
        ...sx,
      }}
    />
  )
}

export default AnimatedLinearProgress
