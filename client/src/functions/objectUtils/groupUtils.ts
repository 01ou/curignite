import { convertToStringOrJson } from '../stringUtils/stringUtils'

/**
 * オブジェクトの配列を、指定したキーの値ごとにグループ化します。
 * キーの値は文字列（または JSON 文字列）に変換され、グループのキーとして使用されます。
 *
 * @template T - オブジェクトの型（Record<string, any> など）
 * @param objectArray - グループ化対象のオブジェクト配列
 * @param key - グループ化に使用するオブジェクトのキー
 * @returns グループ化されたオブジェクト。キーは変換後の文字列、値は該当するオブジェクトの配列
 */
export const groupByKey = <T extends Record<string, any>>(
  objectArray: T[],
  key: keyof T
): Record<string, T[]> => {
  return objectArray.reduce(
    (acc, obj) => {
      if (obj == null) return acc

      const groupKey = obj[key]
      const validKey: string = convertToStringOrJson(groupKey)

      if (!acc[validKey]) {
        acc[validKey] = []
      }
      acc[validKey].push(obj)
      return acc
    },
    {} as Record<string, T[]>
  )
}

/**
 * オブジェクトの配列を、指定したキーを基に辞書（オブジェクト）に変換します。
 * 変換後のオブジェクトのキーは、各アイテムの指定キーの文字列表現となります。
 *
 * @template T - オブジェクトの型
 * @param array - 変換対象のオブジェクト配列
 * @param key - 辞書のキーとして使用するオブジェクトのキー
 * @returns 指定キーを基にした辞書オブジェクト
 */
export const objectArrayToDict = <T extends Record<string, any>>(
  array: T[],
  key: keyof T
): Record<string, T> => {
  return array.reduce(
    (acc, item) => {
      acc[String(item[key])] = item
      return acc
    },
    {} as Record<string, T>
  )
}

/**
 * 与えられたオブジェクトの各キーの値を、そのキー自身に置き換えたミラーオブジェクトを生成します。
 *
 * @template T - オブジェクトの型
 * @param obj - ミラー化する対象のオブジェクト
 * @returns 各キーの値がキーと同じになっているオブジェクト
 */
export type KeyMirrorObject<T> = { [K in keyof T]: K }

export const keyMirror = <T extends object>(obj: T): KeyMirrorObject<T> => {
  return Object.keys(obj).reduce((mirrored, key) => {
    mirrored[key as keyof T] = key as keyof T
    return mirrored
  }, {} as KeyMirrorObject<T>)
}
