// rangeConversion.ts
import { NumRange } from "../../types/utils/rangeTypes";
import { seq } from "../arrayUtils/sequenceUtils";
import { mergeRanges } from "./rangeBasic";

/**
 * 数値の配列を連続した NumRange の配列に変換します。  
 * 例: [1,2,3,5,6] → [{ min: 1, max: 3 }, { min: 5, max: 6 }]
 */
export const arrayToRanges = (arr: number[]): NumRange[] => {
  if (arr.length === 0) return [];

  // 重複除去＆昇順ソート
  const sortedArray = [...new Set(arr)].sort((a, b) => a - b);
  const ranges: NumRange[] = [];
  let start = sortedArray[0];
  let end = sortedArray[0];

  for (let i = 1; i < sortedArray.length; i++) {
    const num = sortedArray[i];
    if (num === end + 1) {
      end = num;
    } else {
      ranges.push({ min: start, max: end });
      start = num;
      end = num;
    }
  }
  ranges.push({ min: start, max: end });
  return ranges;
};

/**
 * NumRange の配列を個々の数値の配列に変換します。  
 * includeMax が true の場合、各 NumRange の max も含みます。
 */
export const rangesToArray = (ranges: NumRange[], includeMax: boolean = true): number[] => {
  if (ranges.length === 0) return [];
  const merged = mergeRanges(ranges);
  const numberSet = new Set<number>();

  for (const range of merged) {
    // seq は [start, stop) の数値配列を返すため、max + 1 としています
    const numbers = seq(range.min, range.max + (includeMax ? 1 : 0));
    numbers.forEach(num => numberSet.add(num));
  }
  return Array.from(numberSet).sort((a, b) => a - b);
};
