/**
 * 指定した配列からランダムな要素を返します。
 * 配列が空の場合は undefined を返します。
 */
export const getRandomElement = <T>(array: T[]): T | undefined => {
  if (array.length === 0) return undefined
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

/**
 * 配列を m 個の部分配列に分割します。各部分配列は可能な限り均等なサイズとなります。
 *
 * @param array - 分割対象の配列
 * @param m - 分割する部分数（正の整数）
 * @returns 分割された配列の配列。m が 0 以下の場合は空配列を返します。
 */
export const splitArray = <T>(array: T[], m: number): T[][] => {
  if (m <= 0) {
    console.error('m には正の整数を指定してください: ', m)
    return []
  }

  const result: T[][] = []
  const len = array.length
  const quotient = Math.floor(len / m)
  const remainder = len % m

  let start = 0
  for (let i = 0; i < m; i++) {
    const size = quotient + (i < remainder ? 1 : 0)
    result.push(array.slice(start, start + size))
    start += size
  }

  return result
}
