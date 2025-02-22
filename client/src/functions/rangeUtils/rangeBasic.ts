// rangeBasic.ts
import { NumRange } from "../../types/utils/rangeTypes";

/**
 * 2 つの数値から、順序を正規化した NumRange を返します。
 */
export const getRange = (start: number, end: number): NumRange => {
  const [min, max] = end > start ? [start, end] : [end, start];
  return { min, max };
};

/**
 * 複数の NumRange がすべて同じ値を持つかを判定します。
 */
export const isSameRange = (...ranges: NumRange[]): boolean => {
  if (ranges.length < 2) return true;
  const { min: baseMin, max: baseMax } = ranges[0];
  return ranges.every(range => range.min === baseMin && range.max === baseMax);
};

/**
 * 複数の NumRange が表す要素数の合計を返します。  
 * 各 NumRange の要素数は (max - min + 1) として計算されます。
 */
export const sumRanges = (ranges: NumRange[]): number => {
  return ranges.reduce((sum, { min, max }) => {
    if (typeof min === "number" && typeof max === "number" && max >= min) {
      return sum + (max - min + 1);
    }
    return sum;
  }, 0);
};

/**
 * 重なりや連続している NumRange を結合してマージ済みの NumRange 配列を返します。
 */
export const mergeRanges = (ranges: NumRange[]): NumRange[] => {
  if (ranges.length === 0) return [];

  // min 値で昇順ソート
  const sortedRanges = [...ranges].sort((a, b) => a.min - b.min);
  const result: NumRange[] = [];
  let currentRange = { ...sortedRanges[0] };

  for (let i = 1; i < sortedRanges.length; i++) {
    const nextRange = sortedRanges[i];
    // 現在の NumRange と次の NumRange が重なっている、または連続している場合は結合
    if (currentRange.max >= nextRange.min - 1) {
      currentRange.max = Math.max(currentRange.max, nextRange.max);
    } else {
      result.push(currentRange);
      currentRange = { ...nextRange };
    }
  }
  result.push(currentRange);
  return result;
};

/**
 * 指定した数値が NumRange または NumRange 配列内に含まれるかどうかを判定します。
 * includeMax が true の場合は NumRange の max も含みます。
 */
export const isNumberInRange = (
  ranges: NumRange[] | NumRange,
  numberToCheck: number,
  includeMax: boolean = true
): boolean => {
  const inRange = (min: number, max: number, value: number) =>
    value >= min && (value < max || (includeMax && value === max));

  if (Array.isArray(ranges)) {
    return ranges.some(range => inRange(range.min, range.max, numberToCheck));
  } else {
    return inRange(ranges.min, ranges.max, numberToCheck);
  }
};
