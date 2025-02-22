/**
 * 配列内のアイテムを、指定された順序に基づいて並び替えます。
 * 
 * order 配列に含まれる値（または orderKey で取得した値）と一致するアイテムはその順序に従い、
 * それ以外は後ろにそのままの順序で配置されます。
 *
 * @param array - ソート対象の配列
 * @param order - 並び替えに使用する順序を指定する配列
 * @param orderKey - オブジェクトの場合、並び替えの基準となるキー（オプション）
 * @returns 並び替えられた配列
 */
export const sortByOrder = <T>(array: T[], order: T[keyof T][], orderKey?: keyof T): T[] => {
  const groupedItems: Record<number, T[]> = {};

  array.forEach(item => {
    const value = orderKey ? item[orderKey] : item;
    const index = order.indexOf(value as T[keyof T]);
    // index が -1 の場合は、order に存在しないアイテムとして扱う
    const key = index !== -1 ? index : -1;
    if (!groupedItems[key]) {
      groupedItems[key] = [];
    }
    groupedItems[key].push(item);
  });

  // order に従って並び替え、order にないアイテムは末尾に追加
  const sortedArray = order.flatMap((_, index) => groupedItems[index] || []);
  return [...sortedArray, ...(groupedItems[-1] || [])];
};

/**
 * 配列を昇順または降順にソートします。
 * 元の配列を変更しないため、新しい配列を返します。
 *
 * @param arr - ソート対象の配列
 * @param ascending - 昇順にソートする場合は true、降順の場合は false（デフォルトは true）
 * @returns ソートされた配列
 */
export const sortArray = <T>(arr: T[], ascending: boolean = true): T[] => {
  return [...arr].sort((a, b) => {
    if (a < b) return ascending ? -1 : 1;
    if (a > b) return ascending ? 1 : -1;
    return 0;
  });
};
