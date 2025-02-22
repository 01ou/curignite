// rangeStringUtils.ts
import { NumRange } from "../../types/utils/rangeTypes";
import { arrayToRanges } from "./rangeConversion";
import { RangeToStringOptions } from "./types/rangeOptions";

/**
 * 単一の NumRange を文字列に変換します。
 * 例: { min: 3, max: 3 } → "3"  
 *     { min: 3, max: 5 } → "3~5"（オプションで単位や接続文字を変更可能）
 */
export const rangeToString = (range: NumRange, options: RangeToStringOptions = {}): string => {
  const { unit = "", connection = "~" } = options;
  return range.min === range.max
    ? `${range.min}${unit}`
    : `${range.min}${connection}${range.max}${unit}`;
};

/**
 * 複数の NumRange を文字列に変換し、delimiter で連結して返します。
 */
export const rangesToString = (ranges: NumRange[], options: RangeToStringOptions = {}): string => {
  if (ranges.length === 0) return "";
  const { delimiter = ", ", unit = "", connection = "~" } = options;
  return ranges
    .map(range => rangeToString(range, { unit, connection }))
    .join(delimiter);
};

/**
 * 数値の配列を NumRange に変換し、その結果を文字列として返します。
 */
export const arrayToRangeString = (arr: number[], options: RangeToStringOptions = {}): string => {
  if (arr.length === 0) return "";
  const { delimiter = ", ", unit = "", connection = "~" } = options;
  const ranges = arrayToRanges(arr);
  return rangesToString(ranges, { delimiter, unit, connection });
};
