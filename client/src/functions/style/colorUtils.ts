export function hexToRgba(hex: string, alpha: number): string {
  // HEXコードのフォーマットを標準化（#付き・なし両対応）
  let cleanHex = hex.replace(/^#/, "");

  // HEXコードが3桁なら6桁に変換（例: #abc → #aabbcc）
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // HEXが6桁以外の場合はエラー
  if (cleanHex.length !== 6) {
    console.error("Invalid HEX color format");
    return "";
  }

  // RGBに変換
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  // 透明度の範囲をチェック（0〜1）
  const validAlpha = Math.min(1, Math.max(0, alpha));

  return `rgba(${r}, ${g}, ${b}, ${validAlpha})`;
}
