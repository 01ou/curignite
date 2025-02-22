export const getTextOutline = (color: string, size: number = 1): Record<"textShadow", string> => {
  const outlines = [
    `${size}px ${size}px 0 ${color}`,
    `-${size}px -${size}px 0 ${color}`,
    `-${size}px ${size}px 0 ${color}`,
    `${size}px -${size}px 0 ${color}`,
  ].join(", ");
  return { ["textShadow"]: outlines }
};

interface CenteredPositionOptions {
  x?: number; // 水平方向の配置（%）
  y?: number; // 垂直方向の配置（%）
  shiftWidth?: number;  // 水平方向に中央からずらす量(px)
  shiftHeight?: number; // 垂直方向に中央からずらす量(px)
  originalTransform?: string;
}

export const getCenteredPosition = ({
  x,
  y,
  shiftWidth,
  shiftHeight,
  originalTransform 
}: CenteredPositionOptions = {}): Record<string, string> => {
  const styles: Record<string, string> = {};
  const transforms: string[] = originalTransform ? [originalTransform] : [];

  if (x !== undefined) {
    styles.left = `${x}%`;
    transforms.push(
      shiftWidth !== undefined
        ? `translateX(calc(-50% + ${shiftWidth}px))`
        : "translateX(-50%)"
    );
  }

  if (y !== undefined) {
    styles.top = `${y}%`;
    transforms.push(
      shiftHeight !== undefined
        ? `translateY(calc(-50% + ${shiftHeight}px))`
        : "translateY(-50%)"
    );
  }

  if (transforms.length) {
    styles.transform = transforms.join(" ");
  }

  return styles;
};
