/**
 * hex文字列をRGBオブジェクトに変換します。
 * @param hex - "#ff0033" のようなhex文字列。短縮形 "#f03" も対応。
 * @returns { r: number, g: number, b: number } オブジェクト、無効な場合は null
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // 先頭の '#' を削除
  hex = hex.replace(/^#/, '');

  // 短縮形（例: f03）の場合、各文字を2倍に
  if (hex.length === 3) {
    hex = hex.split('').map((c) => c + c).join('');
  }

  // 長さが6でない場合は不正な入力とみなす
  if (hex.length !== 6) {
    return null;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
}

/**
 * RGB値をhex文字列に変換します。
 * @param r - 赤 (0～255)
 * @param g - 緑 (0～255)
 * @param b - 青 (0～255)
 * @returns "#rrggbb" 形式の文字列
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number): string => {
    const hex = n.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return '#' + toHex(r) + toHex(g) + toHex(b);
}