import React from 'react';
import { Avatar, Stack, Typography, SxProps, Theme } from '@mui/material';

interface ItemCountDisplayProps {
  itemSrc: string;
  count: number;
  // 位置指定
  top?: number | string;
  left?: number | string;
  bottom?: number | string;
  right?: number | string;
  // サイズ・間隔調整
  avatarSize?: number | string; // アイコンの大きさ
  fontSize?: number | string; // テキストサイズ
  gap?: number | string; // アイコンとテキストの間隔
  // コンテナの追加スタイル
  containerSx?: SxProps<Theme>;
  // レイアウトの方向（デフォルトは横並び）
  direction?: 'row' | 'column';
}

const ItemCountDisplay: React.FC<ItemCountDisplayProps> = ({
  itemSrc,
  count,
  top,
  left,
  bottom,
  right,
  avatarSize = 40,
  fontSize = '1rem',
  gap = 1,
  containerSx,
  direction = 'row',
}) => {
  return (
    <Stack
      direction={direction}
      alignItems="center"
      justifyContent="center"
      spacing={gap}
      sx={{
        position: "absolute",
        top,
        left,
        bottom,
        right,
        ...containerSx,
      }}
    >
      <Avatar src={itemSrc} sx={{ width: avatarSize, height: avatarSize }} />
      <Typography sx={{ fontSize }}>
        × {count}
      </Typography>
    </Stack>
  );
};

export default ItemCountDisplay;
