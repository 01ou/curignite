export const delayCallback = <T>(
  callback: () => T,
  min: number,
  max?: number
): Promise<T> => {
  // maxが指定されていない場合、minで固定
  const delayMin = min
  const delayMax = max ?? min

  // minからmaxの間でランダムなディレイ時間を計算
  const delay = Math.random() * (delayMax - delayMin) + delayMin

  return new Promise((resolve) => {
    // 指定されたディレイ時間後にコールバック関数を実行
    setTimeout(() => {
      const result = callback()
      resolve(result)
    }, delay)
  })
}
