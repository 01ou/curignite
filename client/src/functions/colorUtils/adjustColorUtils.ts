import { ColorFormat, Hex, RGBA } from "../../types/utils/colorTypes";
import { getRgbElements, rgbElementsToHex } from "./colorConversionUtils";

/**
 * 透明度を調整します。
 * @param color - "#ff0033", "rgb(255, 0, 51)", "rgba(255, 0, 51, 0.5)"
 * @param alpha - 透明度 (0～1)
 * @returns "rgba(r, g, b, a)" 形式
 */
export function setAlpha(color: ColorFormat, alpha: number): RGBA {
  const { r, g, b } = getRgbElements(color);
  return `rgba(${r}, ${g}, ${b}, ${Math.min(1, Math.max(0, alpha))})`;
}

/**
 * 明度を調整します。
 * @param color - "#ff0033", "rgb(255, 0, 51)", "rgba(255, 0, 51, 0.5)"
 * @param factor - 明るさの倍率 (0.5 で50%暗く、1.5 で50%明るく)
 * @returns 調整後のHex文字列
 */
export function adjustBrightness(color: ColorFormat, factor: number): Hex {
  let { r, g, b } = getRgbElements(color);

  // 明度を調整（範囲制限）
  r = Math.min(255, Math.max(0, Math.round(r * factor)));
  g = Math.min(255, Math.max(0, Math.round(g * factor)));
  b = Math.min(255, Math.max(0, Math.round(b * factor)));

  return rgbElementsToHex(r, g, b);
}
