import React, { ReactNode } from 'react';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { Variant } from '@mui/material/styles/createTypography';
import { getCenteredPosition } from '../../functions/style/sxUtils';

export interface FloatingButtonProps {
  size: number;
  text?: string;
  textVariant?: Variant;
  shiftText?: number;
  src?: string;
  children?: ReactNode;
  contentsMb?: number;
  variant?: "text" | "outlined" | "contained";
  top?: number | string;
  left?: number | string;
  bottom?: number | string;
  right?: number | string;
  bgcolor?: string;
  hoverBgcolor?: string | null;
  /** ラベルの配置位置：ボタンの上、下、左、右 */
  labelPosition?: "top" | "bottom" | "left" | "right";
  /** ボタン全体のスタイルを上書きするための sx */
  buttonSx?: SxProps<Theme>;
  /** ラベルのスタイルを上書きするための sx */
  labelSx?: SxProps<Theme>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
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
  bgcolor = "#fff",
  hoverBgcolor,
  labelPosition = "bottom",
  buttonSx,
  labelSx,
  onClick
}) => {
  // IconButton の基本スタイル
  const defaultButtonSx: SxProps<Theme> = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    borderRadius: "50%",
    top,
    left,
    right,
    bottom,
    bgcolor,
    minHeight: size,
    minWidth: size,
    height: size,
    width: size,
    overflow: "visible", // ラベルなどがはみ出す場合に対応
    
  };

  // ラベルの基本スタイル（配置位置で調整）
  let defaultLabelSx: SxProps<Theme> = {
    position: "absolute",
    whiteSpace: "nowrap",
  };

  switch (labelPosition) {
    case "top":
      defaultLabelSx = { ...defaultLabelSx, top: shiftText, ...getCenteredPosition({ x: 50 }) };
      break;
    case "bottom":
      defaultLabelSx = { ...defaultLabelSx, bottom: shiftText, ...getCenteredPosition({ x: 50 }) };
      break;
    case "left":
      defaultLabelSx = { ...defaultLabelSx, left: shiftText, ...getCenteredPosition({ y: 50 }) };
      break;
    case "right":
      defaultLabelSx = { ...defaultLabelSx, right: shiftText, ...getCenteredPosition({ y: 50 }) };
      break;
    default:
      break;
  }

  return (
    <IconButton
      sx={{
        ...defaultButtonSx,
        ...buttonSx, 
        transition: "transform 0.2s ease-in-out", // 滑らかな拡大
        "&:hover": {
          transform: "scale(1.1)", // ホバー時に 1.1 倍に拡大
          bgcolor: hoverBgcolor === undefined ? bgcolor : hoverBgcolor
        }
      }}
      onClick={onClick}
    >
      {/* src が指定されている場合は Avatar を、なければ children を描画 */}
      <Box mb={contentsMb} >
        {src ? (
          <Avatar src={src} sx={{ width: size, height: size }} />
        ) : (
          children
        )}
        {text && (
          <Typography sx={{ ...defaultLabelSx, ...labelSx }} variant={textVariant}>{text}</Typography>
        )}
      </Box>
    </IconButton>
  );
};

export default FloatingButton;
