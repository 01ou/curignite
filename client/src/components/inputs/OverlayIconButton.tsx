import { Avatar, Box, IconButton, SxProps, Theme } from '@mui/material';
import React, { ReactNode } from 'react';
import { hexToRgba } from '../../functions/style/colorUtils';

interface OverlayIconButtonProps {
  /** ボタンの一辺のサイズ */
  size: number;
  /** オーバーレイの元となる HEX カラー（デフォルトは黒） */
  overlayHexColor?: string;
  /** オーバーレイの透明度（0〜1、デフォルトは0.3） */
  overlayAlpha?: number;
  /** 背景として利用する任意の ReactNode。これが指定されると src は無視されます */
  background?: ReactNode;
  /** 背景画像のソース。background 未指定の場合に Avatar で表示します */
  src?: string;
  /** 背景画像のサイズ倍率（Avatar 利用時のみ有効。デフォルトは1） */
  imageScale?: number;
  /** オーバーレイ内に表示する要素 */
  children?: ReactNode;
  /** ボタンコンテナのスタイル上書き */
  containerSx?: SxProps<Theme>;
  /** 背景部分のスタイル上書き */
  backgroundSx?: SxProps<Theme>;
  /** オーバーレイ部分のスタイル上書き */
  overlaySx?: SxProps<Theme>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const OverlayIconButton: React.FC<OverlayIconButtonProps> = ({
  size,
  overlayHexColor = '#000000',
  overlayAlpha = 0.3,
  background,
  src,
  imageScale = 1,
  children,
  containerSx,
  backgroundSx,
  overlaySx,
  onClick
}) => {
  const avatarSize = size * imageScale;
  const overlayColor = hexToRgba(overlayHexColor, overlayAlpha);

  // 背景部分の内容。background が指定されていればそれを使用、
  // そうでなければ src を利用した Avatar、さらに無ければデフォルトの Box を返す
  const backgroundContent = background ?? (
    src ? (
      <Avatar
        src={src}
        sx={{
          width: size,
          height: size,
        }}
        slotProps={{
          img: {
            style: {
              width: avatarSize,
              height: avatarSize,
              objectFit: 'cover',      // コンテナ全体を覆うように調整
              objectPosition: 'center'   // 画像を中央に配置
            }
          }
        }}
      />
    ) : (
      <Box
        sx={{
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: '#e0e0e0',
        }}
      />
    )
  );

  return (
    <IconButton 
      sx={{
        width: size,
        height: size,
        position: 'relative',
        p: 0,
        transition: "transform 0.2s ease-in-out",
        ":hover": {
          transform: "scale(1.1)",
        },
        ...containerSx,
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          position: 'relative',
          width: size,
          height: size,
          ...backgroundSx,
        }}
      >
        {backgroundContent}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: overlayColor,
            borderRadius: '50%',
            ...overlaySx,
          }}
        >
          {children}
        </Box>
      </Box>
    </IconButton>
  );
};

export default OverlayIconButton;
