import React from "react";
import { Star } from "@mui/icons-material";

interface IntimacyStarProps {
  intimacy: number; // 0〜100 (%)
  fillColor?: string;
  emptyColor?: string;
  size?: number;
}

const IntimacyStar: React.FC<IntimacyStarProps> = ({
  intimacy,
  fillColor = "gold",
  emptyColor = "lightgray",
  size = 48
}) => {
  const formatIntimacy = (intimacy: number): number => {
    // 入力を 0～100 の範囲にクランプ
    intimacy = Math.max(0, Math.min(100, intimacy));
  
    // セグメントの境界値と重みを定義
    const bottomBorder = 30;
    const topBorder = 85;
    const bottomWeight = 5;
    const midWeight = 2;
    const topWeight = 8;
  
    // 各セグメント全体での重みの合計を算出
    const weightedBottom = bottomBorder * bottomWeight;             // 0～20
    const weightedMid = (topBorder - bottomBorder) * midWeight;         // 20～80
    const weightedTop = (100 - topBorder) * topWeight;                  // 80～100
    const totalWeighted = weightedBottom + weightedMid + weightedTop;
  
    // 入力値に応じた重み付き値を計算
    let weightedValue: number;
    if (intimacy <= bottomBorder) {
      // 下部セグメント
      weightedValue = intimacy * bottomWeight;
    } else if (intimacy <= topBorder) {
      // 中央セグメント
      weightedValue = weightedBottom + (intimacy - bottomBorder) * midWeight;
    } else {
      // 上部セグメント
      weightedValue = weightedBottom + weightedMid + (intimacy - topBorder) * topWeight;
    }
  
    // 重み付き値を全体の割合に変換（0～100）
    return (weightedValue / totalWeighted) * 100;
  };
  
  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        width: size,
        height: size,
      }}
    >
      {/* 背景 (emptyColor) */}
      <Star
        sx={{
          fontSize: size,
          color: emptyColor,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      {/* 前景 (fillColor) */}
      <Star
        sx={{
          fontSize: size,
          color: fillColor,
          position: "absolute",
          top: 0,
          left: 0,
          overflow: "hidden",
          clipPath: `inset(${100 - formatIntimacy(intimacy)}% 0 0 0)`, // intimacy に応じて部分的に隠す
        }}
      />
    </div>
  );
};

export default IntimacyStar;
