import React from 'react'
import { CircularProgress, Box, SxProps } from '@mui/material'
import { getCenteredPosition } from '../../../../functions/styleUtils/sxUtils'

interface CircularProgressWithShadowProps {
  value: number // 進捗度 (0 ~ 1 の割合)
  size: number // 円のサイズ（px）
  thickness: number // プログレスバーの太さ
  variant?: 'determinate' | 'indeterminate'
  color?: string // プログレスバーの色
  shadowColor?: string // 影の色
  innerShadow?: boolean
  sx?: SxProps
}

const CircularProgressWithShadow: React.FC<CircularProgressWithShadowProps> = ({
  value,
  size,
  thickness,
  variant,
  color,
  shadowColor = 'rgba(0, 0, 0, 0.2)',
  innerShadow,
  sx,
}) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <Box
        sx={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: '50%',
          boxShadow: `0px 0px 10px 4px ${shadowColor}`,
        }}
      />
      {innerShadow && (
        <Box
          sx={{
            position: 'absolute',
            ...getCenteredPosition({ x: 50, y: 50 }),
            width: size - thickness * 9,
            height: size - thickness * 9,
            borderRadius: '50%',
            boxShadow: `inset 0px 0px 10px 4px ${shadowColor}`,
          }}
        />
      )}

      {/* MUIの円形プログレスバー */}
      <CircularProgress
        variant={variant}
        value={value} // MUIは0-100の値を取る
        color={color as any}
        size={size}
        thickness={thickness}
        sx={sx}
      />
    </Box>
  )
}

export default CircularProgressWithShadow
