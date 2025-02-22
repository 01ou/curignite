/**
 * 値の配列を、指定された範囲マップに基づいて変換します。  
 * 範囲マップは、各境界値（キー）と対応する値を持つオブジェクトで、  
 * 値がどのレンジに属するかを二分探索により判定します。  
 * 対象の値がいずれのレンジにも該当しない場合は defaultValue を返します。
 *
 * @template K - 入力値の型（string または number）
 * @template T - マッピング後の値の型
 * @param values - 変換対象の値の配列
 * @param rangeMap - 範囲マップ。キーは境界値、値はマッピングされる値。
 * @param defaultValue - 範囲に該当しなかった場合に使用するデフォルト値
 * @returns 変換後の値の配列
 */
export const mapValuesByRange = <K extends string | number, T>(
  values: K[],
  rangeMap: Record<K, T>,
  defaultValue: T
): T[] => {
  // rangeMap を [キー, 値] のエントリ配列に変換し、キーが数値の場合は数値に変換してソートする
  const mapEntries = Object.entries(rangeMap)
    .map(([key, value]) => {
      const numericKey = Number(key);
      return isNaN(numericKey) ? [key, value] as [K, T] : [numericKey as unknown as K, value] as [K, T];
    })
    .sort((a, b) => {
      if (typeof a[0] === "number" && typeof b[0] === "number") {
        return (a[0] as unknown as number) - (b[0] as unknown as number);
      } else {
        return String(a[0]).localeCompare(String(b[0]));
      }
    });

  const result: T[] = [];

  values.forEach(value => {
    let left = 0;
    let right = mapEntries.length - 1;

    // 二分探索で、value 以下の最後のエントリを探す
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const entryKey = mapEntries[mid][0];

      if (
        (typeof entryKey === "number" && typeof value === "number" && entryKey <= value) ||
        (typeof entryKey === "string" && String(entryKey) <= String(value))
      ) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    const lowerBound = mapEntries[left - 1]?.[0];
    const upperBound = mapEntries[left]?.[0];

    const isNumeric = typeof lowerBound === "number" && typeof value === "number" && typeof upperBound === "number";
    const isInRange =
      lowerBound !== undefined &&
      upperBound !== undefined &&
      ((isNumeric &&
        (lowerBound as number) <= (value as number) &&
        (value as number) < (upperBound as number)) ||
       (typeof lowerBound === "string" &&
        typeof value === "string" &&
        lowerBound <= value &&
        value < upperBound));

    if (isInRange) {
      result.push(mapEntries[left - 1]?.[1] ?? defaultValue);
    } else {
      result.push(defaultValue);
    }
  });

  return result;
};
