/**
 * 指定した開始値、終了値（または要素数）、ステップ幅に基づき数値のシーケンスを生成します。
 * 
 * - `seq(5)` → 0～4 の配列を返します。
 * - `seq(1, 6)` → 1～5 の配列を返します。
 *
 * @param start - 開始値（stop が省略された場合は終了値として扱われ、開始は 0 になります）
 * @param stop - 終了値（生成される値は stop 未満）
 * @param step - ステップ幅（デフォルトは 1）
 * @returns 生成された数値の配列
 */
export const seq = (start: number, stop?: number, step: number = 1): number[] => {
  const actualStart = stop !== undefined ? start : 0;
  const actualEnd = stop !== undefined ? stop : start;

  if (step === 0) {
    throw new Error("step must not be zero");
  }

  const length = Math.floor(Math.abs(actualEnd - actualStart - 1) / Math.abs(step)) + 1;
  return Array.from({ length }, (_, i) => actualStart + i * step);
};

/**
 * 指定した範囲内で、リストに含まれていない数値を返します。
 *
 * @param list - 存在する数値の配列
 * @param start - 範囲の開始値（stop が省略された場合は終了値として扱われ、開始は 0 になります）
 * @param stop - 範囲の終了値（この値も含む）
 * @returns 欠落している数値の配列
 */
export const findMissingNumbers = (
  list: number[],
  start: number,
  stop?: number
): number[] => {
  const actualStart = stop !== undefined ? start : 0;
  const actualEnd = stop !== undefined ? stop : start;

  const allNumbers = new Set(
    Array.from({ length: actualEnd - actualStart + 1 }, (_, i) => actualStart + i)
  );
  const listSet = new Set(list);

  return Array.from(allNumbers).filter(num => !listSet.has(num));
};

/**
 * 禁止リストに含まれる数値を除外しながら、指定個数の連続する数値を生成します。
 *
 * @param n - 生成する数値の個数
 * @param forbiddenNumbers - 生成対象から除外する数値の配列
 * @param start - 数値生成の開始値（デフォルトは 0）
 * @returns 禁止数値を除いた数値の配列
 */
export const generateNumbersWithoutForbidden = (
  n: number, 
  forbiddenNumbers: number[],
  start: number = 0
): number[] => {
  const forbiddenSet = new Set(forbiddenNumbers);
  const result: number[] = [];
  let current = start;

  while (result.length < n) {
    if (!forbiddenSet.has(current)) {
      result.push(current);
    }
    current++;
  }

  return result;
};
