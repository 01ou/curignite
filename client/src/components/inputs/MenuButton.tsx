import React, { ReactNode } from 'react'
import { Avatar, Box, IconButton, Typography } from '@mui/material'
import { SxProps, Theme } from '@mui/material/styles'
import { Variant } from '@mui/material/styles/createTypography'
import { getCenteredPosition } from '../../functions/styleUtils/sxUtils'

export interface MenuButtonProps {
  size: number
  text?: string
  textVariant?: Variant
  shiftText?: number
  src?: string
  children?: ReactNode
  contentsMb?: number
  variant?: 'text' | 'outlined' | 'contained'
  top?: number | string
  left?: number | string
  bottom?: number | string
  right?: number | string
  bgcolor?: string
  hoverBgcolor?: string | null
  /** ラベルの配置位置：ボタンの上、下、左、右 */
  labelPosition?: 'top' | 'bottom' | 'left' | 'right'
  /** ボタン全体のスタイルを上書きするための sx */
  buttonSx?: SxProps<Theme>
  /** ラベルのスタイルを上書きするための sx */
  labelSx?: SxProps<Theme>
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  /** 浮遊状態で使うか（true: 絶対配置、false: 通常のレイアウト） */
  floating?: boolean
}

const MenuButton: React.FC<MenuButtonProps> = ({
  floating = true,
  size,
  text,
  textVariant,
  shiftText,
  children,
  src,
  contentsMb,
  top,
  left,
  bottom,
  right,
  bgcolor = '#fff',
  hoverBgcolor,
  labelPosition = 'bottom',
  buttonSx,
  labelSx,
  onClick,
}) => {
  if (floating) {
    // 浮遊配置の場合（従来のFloatingButtonのレイアウト）
    const defaultButtonSx: SxProps<Theme> = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      borderRadius: '50%',
      top,
      left,
      right,
      bottom,
      bgcolor,
      minHeight: size,
      minWidth: size,
      height: size,
      width: size,
      overflow: 'visible', // ラベルがはみ出す場合に対応
    }

    let defaultLabelSx: SxProps<Theme> = {
      position: 'absolute',
      whiteSpace: 'nowrap',
    }

    switch (labelPosition) {
      case 'top':
        defaultLabelSx = {
          ...defaultLabelSx,
          top: shiftText,
          ...getCenteredPosition({ x: 50 }),
        }
        break
      case 'bottom':
        defaultLabelSx = {
          ...defaultLabelSx,
          bottom: shiftText,
          ...getCenteredPosition({ x: 50 }),
        }
        break
      case 'left':
        defaultLabelSx = {
          ...defaultLabelSx,
          left: shiftText,
          ...getCenteredPosition({ y: 50 }),
        }
        break
      case 'right':
        defaultLabelSx = {
          ...defaultLabelSx,
          right: shiftText,
          ...getCenteredPosition({ y: 50 }),
        }
        break
      default:
        break
    }

    return (
      <IconButton
        sx={{
          ...defaultButtonSx,
          ...buttonSx,
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
            bgcolor: hoverBgcolor === undefined ? bgcolor : hoverBgcolor,
          },
        }}
        onClick={onClick}
      >
        <Box mb={contentsMb}>
          {src ? (
            <Avatar src={src} sx={{ width: size, height: size }} />
          ) : (
            children
          )}
          {text && (
            <Typography
              sx={{ ...defaultLabelSx, ...labelSx }}
              variant={textVariant}
            >
              {text}
            </Typography>
          )}
        </Box>
      </IconButton>
    )
  } else {
    // 通常のレイアウトの場合：ラベルをボタンの上・下・左・右に配置可能なフレックスレイアウト
    let flexDirection: 'column' | 'row' = 'column'
    let labelFirst = false // IconButton の前にラベルを表示するか

    if (labelPosition === 'top') {
      flexDirection = 'column'
      labelFirst = true
    } else if (labelPosition === 'bottom') {
      flexDirection = 'column'
      labelFirst = false
    } else if (labelPosition === 'left') {
      flexDirection = 'row'
      labelFirst = true
    } else if (labelPosition === 'right') {
      flexDirection = 'row'
      labelFirst = false
    }

    const defaultButtonSx: SxProps<Theme> = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      bgcolor,
      minHeight: size,
      minWidth: size,
      height: size,
      width: size,
      overflow: 'visible',
    }

    return (
      <Box
        display="flex"
        flexDirection={flexDirection}
        alignItems="center"
        justifyContent="center"
      >
        {labelFirst && text && (
          <Typography
            sx={{ margin: shiftText ?? 0 / 100, ...labelSx }}
            variant={textVariant}
          >
            {text}
          </Typography>
        )}
        <IconButton
          sx={{
            ...defaultButtonSx,
            ...buttonSx,
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.1)',
              bgcolor: hoverBgcolor === undefined ? bgcolor : hoverBgcolor,
            },
          }}
          onClick={onClick}
        >
          {src ? (
            <Avatar src={src} sx={{ width: size, height: size }} />
          ) : (
            children
          )}
        </IconButton>
        {!labelFirst && text && (
          <Typography
            sx={{ margin: shiftText ?? 0 / 100, ...labelSx }}
            variant={textVariant}
          >
            {text}
          </Typography>
        )}
      </Box>
    )
  }
}

export default MenuButton
