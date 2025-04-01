import { ColorFormat, Hex, RGBA } from '../../types/utils/colorTypes'

/**
 * hex文字列をRGBオブジェクトに変換します。
 * @param hex - "#ff0033" のようなhex文字列。短縮形 "#f03" も対応。
 * @returns { r: number, g: number, b: number } オブジェクト、無効な場合は null
 */
export function hexToRgbElements(hex: string): {
  r: number
  g: number
  b: number
} {
  // 先頭の '#' を削除
  hex = hex.replace(/^#/, '')

  // 短縮形の場合（例: "f03"）、各文字を2倍に
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('')
  }

  // 長さが6でなければ不正な入力と判断
  if (hex.length !== 6) {
    console.error('不正なカラーコードが入力されました: ', hex)
    return { r: 0, g: 0, b: 0 }
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return { r, g, b }
}

/**
 * RGB要素からhex文字列に変換します。
 * @param r - 赤 (0～255)
 * @param g - 緑 (0～255)
 * @param b - 青 (0～255)
 * @returns "#rrggbb" 形式の文字列
 */
export function rgbElementsToHex(r: number, g: number, b: number): Hex {
  const toHex = (n: number): string => {
    const hex = n.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

/**
 * RGB要素を抽出します。
 * @param color - Hex rgb rgba
 * @returns { r: number, g: number, b: number } オブジェクト、形式が不正な場合は null
 */
export function getRgbElements(color: ColorFormat): {
  r: number
  g: number
  b: number
} {
  if (color.startsWith('#')) {
    return hexToRgbElements(color)
  }

  const match = color.match(
    /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/
  )
  if (!match) {
    console.error('不正な形式の色が入力されました: ', color)
    return { r: 0, g: 0, b: 0 }
  }

  const r = Number(match[1])
  const g = Number(match[2])
  const b = Number(match[3])

  return { r, g, b }
}

/**
 * カラーフォーマットを判定します。
 * @param color - 色文字列 (例: "rgb(255, 0, 51)", "rgba(255, 0, 51, 0.5)", "#ff0033")
 * @returns "RGB" | "RGBA" | "Hex" | null
 */
export function detectColorFormat(
  color: string
): 'RGB' | 'RGBA' | 'Hex' | null {
  if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(color)) {
    return 'Hex'
  } else if (/^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/.test(color)) {
    return 'RGB'
  } else if (
    /^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|1|0?\.\d+)\s*\)$/.test(
      color
    )
  ) {
    return 'RGBA'
  }
  return null
}

/**
 * HexまたはRGBをRGBAに変換します。
 * @param color - "#ff0033" または "rgb(255, 0, 51)" の形式の文字列
 * @param alpha - 透明度 (0～1) デフォルト: 1
 * @returns "rgba(r, g, b, a)" 形式の文字列、または null
 */
export function convertToRgba(
  color: ColorFormat,
  alpha: number = 1
): RGBA | null {
  let r: number, g: number, b: number

  if (color.startsWith('#')) {
    const rgb = hexToRgbElements(color)
    if (!rgb) return null
    ;({ r, g, b } = rgb)
  } else {
    const rgb = getRgbElements(color)
    if (!rgb) return null
    ;({ r, g, b } = rgb)
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/**
 * RGBまたはRGBAをHexに変換します。
 * @param color - "rgb(255, 0, 51)" や "rgba(255, 0, 51, 0.5)" の形式の文字列
 * @returns Hex文字列 ("#ff0033")、または null
 */
export function convertToHex(color: ColorFormat): Hex | null {
  if (color.startsWith('#')) {
    return color as Hex
  }

  const rgb = getRgbElements(color)
  if (!rgb) return null

  return rgbElementsToHex(rgb.r, rgb.g, rgb.b)
}
