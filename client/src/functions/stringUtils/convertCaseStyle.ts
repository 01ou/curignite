export const toKebabCase = (input: string): string => {
  return input
      .replace(/_/g, '-') // アンダースコアをハイフンに置き換える
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2') // 大文字の前にハイフンを追加
      .toLowerCase(); // 小文字に変換
}