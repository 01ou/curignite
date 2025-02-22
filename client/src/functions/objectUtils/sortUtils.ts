/**
 * オブジェクトの配列を、指定したキーに基づいてソートします。  
 * ソート対象のキーの値が null/undefined または期待する型でない場合の扱いを nullsLast オプションで制御できます。
 *
 * @template T - オブジェクトの型（Record<string, any> など）
 * @param arr - ソート対象のオブジェクト配列
 * @param key - ソートの基準となるキー
 * @param ascending - 昇順にソートする場合は true、降順の場合は false（デフォルトは true）
 * @param nullsLast - null/undefined や型が一致しない値を最後に配置する場合は true（デフォルトは true）
 * @param expectedType - キーの値の期待する型（"string" | "number" | "boolean"）。null を指定すると最初の要素から判定します。
 * @returns ソート済みの新しい配列
 */
export const sortObjectArray = <T extends Record<string, any>>(
  arr: T[],
  key: keyof T,
  ascending: boolean = true,
  nullsLast: boolean = true,
  expectedType: "string" | "number" | "boolean" | null = null
): T[] => {
  if (arr.length === 0) return arr;

  const realExpectedType = expectedType ?? typeof arr[0][key];
  const orderFactor = ascending ? 1 : -1;

  return [...arr].sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    const isInvalidA = valueA == null || typeof valueA !== realExpectedType;
    const isInvalidB = valueB == null || typeof valueB !== realExpectedType;

    if (isInvalidA && isInvalidB) return 0;
    if (isInvalidA) return nullsLast ? 1 : -1;
    if (isInvalidB) return nullsLast ? -1 : 1;

    if (valueA > valueB) return orderFactor;
    if (valueA < valueB) return -orderFactor;
    return 0;
  });
};
