import { differenceInDays } from 'date-fns'
import { TimeTypes, TimeSizeUnit } from '../../types/utils/dateTimeTypes'
import { getMidnightDate } from './dateTimeUtils'
import { MINUTES_IN_MILLISECOND } from '../../constants/dateTimeConstants'
import { DurationFormatOptions } from './types/dateTimeOptions'
import { convertToMilliseconds, getMsPerUnit } from './timeConversion'

/**
 * ミリ秒を分解して、時間、分、秒、ミリ秒を返す
 * @param ms - ミリ秒
 * @returns { hours, minutes, seconds, milliseconds } のオブジェクト
 */
export const decomposeMilliseconds = (
  ms: number
): {
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
} => {
  const hours = Math.floor(ms / 3600000)
  const minutes = Math.floor((ms % 3600000) / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  const milliseconds = ms % 1000
  return { hours, minutes, seconds, milliseconds }
}

/**
 * ミリ秒を指定したオプションに基づきフォーマットする関数
 * ・デジタル形式（例："01 : 05 : 09" または "1 : 5 : 9"）
 * ・unitLabels を指定すればローカライズ形式（例："1時間 05分 09秒"）にも対応可能
 *
 * @param ms - ミリ秒
 * @param options - フォーマットオプション
 * @returns フォーマットされた時間文字列
 */
export const formatDuration = (
  ms: number,
  options?: DurationFormatOptions
): string => {
  const {
    showHours = true,
    padHours = true,
    showMinutes = true,
    padMinutes = true,
    showSeconds = true,
    padSeconds = true,
    fractionalDigits = 0,
    separator = ' : ',
    unitLabels,
    hideZeroHours = unitLabels ? false : true,
  } = options || {}

  const { hours, minutes, seconds, milliseconds } = decomposeMilliseconds(ms)

  // 数値を文字列に変換（ゼロ埋めも含む）
  const hoursStr = padHours ? String(hours).padStart(2, '0') : String(hours)
  const minutesStr = padMinutes
    ? String(minutes).padStart(2, '0')
    : String(minutes)
  let secondsStr = padSeconds
    ? String(seconds).padStart(2, '0')
    : String(seconds)

  if (fractionalDigits > 0) {
    const fraction = (milliseconds / 1000).toFixed(fractionalDigits).slice(2)
    secondsStr += `.${fraction}`
  }

  // 単位ラベルが指定されている場合は、数値の後にラベルを付与する形式で連結
  if (unitLabels) {
    const parts: string[] = []
    if (showHours && (hours > 0 || !hideZeroHours)) {
      parts.push(`${hours}${unitLabels.hours ?? ''}`)
    }
    if (showMinutes) {
      parts.push(`${minutes}${unitLabels.minutes ?? ''}`)
    }
    if (showSeconds) {
      parts.push(`${secondsStr}${unitLabels.seconds ?? ''}`)
    }
    return parts.join(' ')
  } else {
    // デジタル形式の場合はセパレーターで連結
    const parts: string[] = []
    if (showHours && (hours > 0 || !hideZeroHours)) {
      parts.push(hoursStr)
    }
    if (showMinutes) {
      parts.push(minutesStr)
    }
    if (showSeconds) {
      parts.push(secondsStr)
    }
    return parts.join(separator)
  }
}

/**
 * ミリ秒の時間を省略表示する関数
 * 60分未満の場合は「min」、60分以上の場合は「h」（小数点1桁）で表示する。
 *
 * @param ms - ミリ秒
 * @param options - ラベルのカスタマイズオプション
 * @returns 省略フォーマットされた時間文字列
 */
export const formatAbbreviatedDuration = (
  ms: number,
  options?: Partial<{ minuteLabel: string; hourLabel: string }>
): string => {
  const minuteLabel = options?.minuteLabel ?? 'min'
  const hourLabel = options?.hourLabel ?? 'h'
  const totalMinutes = Math.floor(ms / MINUTES_IN_MILLISECOND)
  if (totalMinutes >= 60) {
    const hours = (totalMinutes / 60).toFixed(1)
    return `${hours}${hourLabel}`
  } else {
    return `${totalMinutes}${minuteLabel}`
  }
}

/**
 * 指定した日付と基準日との日数差をフォーマットする関数
 * ・未来の場合はデフォルトで "d日後"、過去の場合は "d日前" と表示する。<br>
 * ・フォーマット文字列中の "d" が日数に置換される。
 *
 * @param targetDate - 比較対象の日付
 * @param options - フォーマット（futureFormat, pastFormat）や基準日（baseDate）のオプション
 * @returns フォーマットされた日付差文字列
 */
export const formatDayDifference = (
  targetDate: TimeTypes,
  options?: Partial<{
    futureFormat: string
    pastFormat: string
    baseDate: TimeTypes
  }>
): string => {
  const futureFormat = options?.futureFormat ?? 'd日後'
  const pastFormat = options?.pastFormat ?? 'd日前'
  const baseDate = options?.baseDate ?? new Date()

  const daysDifference = differenceInDays(
    getMidnightDate(targetDate),
    getMidnightDate(baseDate)
  )
  const formatStr = daysDifference < 0 ? pastFormat : futureFormat
  return formatStr.replace(/d/g, String(Math.abs(daysDifference)))
}

export const shiftDateTime = (
  base: TimeTypes,
  shift: number,
  unit: TimeSizeUnit
): number => {
  const ms = convertToMilliseconds(base) + getMsPerUnit(unit) * shift
  return ms
}
