// rangeOperations.ts
import { NumRange } from "../../types/utils/rangeTypes";
import { mergeRanges } from "./rangeBasic";
import { arrayToRanges, rangesToArray } from "./rangeConversion";

/**
 * baseRanges に addRange（数値の配列または NumRange の配列）を追加し、  
 * その結果を連続する NumRange として返します。
 */
export const addRanges = (
  baseRanges: NumRange[],
  addRange: number[] | NumRange[]
): NumRange[] => {
  if (addRange.length === 0) return baseRanges;

  const baseNumbers = rangesToArray(baseRanges);
  const addNumbers =
    typeof addRange[0] === "number"
      ? (addRange as number[])
      : rangesToArray(addRange as NumRange[]);
  const combined = [...baseNumbers, ...addNumbers];
  return arrayToRanges(combined);
};

/**
 * ranges から toSubtract の範囲を除外して残りの NumRange を返します。
 */
export const subtractRanges = (
  ranges: NumRange[],
  toSubtract: NumRange[]
): NumRange[] => {
  if (ranges.length === 0) return [];
  if (toSubtract.length === 0) return ranges;

  const mergedRanges = mergeRanges(ranges);
  const mergedSubtract = mergeRanges(toSubtract);

  const result: NumRange[] = [];
  let subtractIndex = 0;

  for (const range of mergedRanges) {
    let currentRange = { ...range };

    while (subtractIndex < mergedSubtract.length) {
      const subRange = mergedSubtract[subtractIndex];

      if (subRange.max < currentRange.min) {
        subtractIndex++;
        continue;
      }
      if (subRange.min > currentRange.max) {
        break;
      }

      if (subRange.min > currentRange.min) {
        result.push({ min: currentRange.min, max: subRange.min - 1 });
      }
      if (subRange.max < currentRange.max) {
        currentRange.min = subRange.max + 1;
      } else {
        currentRange = { min: NaN, max: NaN };
        break;
      }
      subtractIndex++;
    }
    if (!isNaN(currentRange.min)) {
      result.push(currentRange);
    }
  }

  return result;
};
