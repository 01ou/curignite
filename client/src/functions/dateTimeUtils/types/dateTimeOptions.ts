/**
 * フォーマット時のオプション
 */
export interface DurationFormatOptions {
  /** 時間部分を常に表示するか（デフォルト true） */
  showHours?: boolean;
  /** 時間部分をゼロ埋めするか（デフォルト true） */
  padHours?: boolean;
  /** 分部分を常に表示するか（デフォルト true） */
  showMinutes?: boolean;
  /** 分部分をゼロ埋めするか（デフォルト true） */
  padMinutes?: boolean;
  /** 秒部分を表示するか（デフォルト true） */
  showSeconds?: boolean;
  /** 秒部分をゼロ埋めするか（デフォルト true） */
  padSeconds?: boolean;
  /** 秒の小数点以下桁数（デフォルト 0、指定すると小数部付き） */
  fractionalDigits?: number;
  /** 各単位間のセパレーター（デフォルト " : "） */
  separator?: string;
  /** 単位ラベルを付与する場合（例: { hours: "時間", minutes: "分", seconds: "秒" }）<br>
   * 指定された場合はセパレーターではなく、各数値の後にラベルを付けて連結します。
   */
  unitLabels?: {
    hours?: string;
    minutes?: string;
    seconds?: string;
  };
  /** 時間が0の場合は表示しないか（unitLabels指定時は false 推奨、デジタル形式時は true 推奨） */
  hideZeroHours?: boolean;
}