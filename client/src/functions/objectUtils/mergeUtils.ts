/**
 * 複数のオブジェクトをマージし、各キーの値を配列としてまとめたオブジェクトを返します。
 * 値が配列でない場合は、配列に変換してマージします。
 *
 * @template Key - キーの型（string | number | symbol）
 * @template Value - 値の型
 * @param objects - マージ対象のオブジェクト群
 * @returns 各キーに対応する値の配列を持つオブジェクト
 */
export const mergeObjects = <Key extends string | number | symbol, Value>(
  ...objects: Record<Key, Value>[]
): Record<string, Value[]> => {
  // 全オブジェクトからキーを抽出して重複を除去
  const uniqueKeys = [...new Set(objects.flatMap((obj) => Object.keys(obj)))]

  // 各キーに空配列を初期化
  const result: Record<string, Value[]> = uniqueKeys.reduce(
    (acc, key) => {
      acc[key] = []
      return acc
    },
    {} as Record<string, Value[]>
  )

  // 各オブジェクトのエントリを走査し、値を配列として結合
  objects.forEach((obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      result[key].push(...(Array.isArray(value) ? value : ([value] as Value[])))
    })
  })

  return result
}

/**
 * 複数のオブジェクト（各キーの値は配列となっている）をマージし、
 * 同じキーの値同士を結合してひとつの配列にまとめたオブジェクトを返します。
 *
 * @template Key - キーの型（string | number | symbol）
 * @template Value - 配列の要素の型
 * @param objects - マージ対象のオブジェクト群
 * @returns 各キーに対応する結合済みの配列を持つオブジェクト
 */
export const mergeArrayValueObjects = <
  Key extends string | number | symbol,
  Value,
>(
  ...objects: Record<Key, Value[]>[]
): Record<string, Value[]> => {
  const uniqueKeys = [...new Set(objects.flatMap((obj) => Object.keys(obj)))]

  const result: Record<string, Value[]> = uniqueKeys.reduce(
    (acc, key) => {
      acc[key] = []
      return acc
    },
    {} as Record<string, Value[]>
  )

  objects.forEach((obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      result[key].push(...(value as Value[]))
    })
  })

  return result
}
