/**
 * 値を文字列に変換します。
 *
 * @param value - 文字列、数値、またはそれらの配列。null/undefined の場合は空文字を返す。
 * @param separator - 配列の場合の結合に使用する文字列（デフォルトは空文字）。
 * @returns 変換後の文字列。
 */
export const convertToString = (
  value: string | number | (string | number)[] | null | undefined,
  separator: string = ''
): string => {
  if (value == null) return ''

  // 入力が配列の場合、各要素を文字列に変換して結合
  if (Array.isArray(value)) {
    return value.map((item) => String(item)).join(separator)
  }

  // それ以外の場合は単純に文字列化
  return String(value)
}

/**
 * オブジェクトの場合はJSON形式に変換し、そうでなければ文字列に変換します。
 * ※循環参照のあるオブジェクトでは JSON.stringify に失敗するため、try/catch でフォールバックします。
 *
 * @param input - 任意の型の入力値。
 * @returns 入力値を文字列またはJSON形式の文字列に変換した結果。
 */
export const convertToStringOrJson = (input: any): string => {
  if (typeof input === 'string') {
    return input
  }

  if (typeof input === 'object' && input !== null) {
    try {
      return JSON.stringify(input)
    } catch (error) {
      console.error('JSON.stringify error:', error)
      // フォールバックとしてシンプルな文字列変換
      return String(input)
    }
  }

  return String(input)
}
