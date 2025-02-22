import { format, startOfDay, isSameMinute, isBefore } from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import { TimeTypes, Days } from '../../types/utils/dateTimeTypes';
import { convertToDate, convertToMilliseconds } from './timeConversion';

export const isMidnight = (dateTime: TimeTypes) => {
    const date = convertToDate(dateTime);
    const midnight = new Date(date);
    midnight.setHours(0, 0, 0, 0);
    return isSameMinute(date, midnight);
}

export const isMatchDay = (date: TimeTypes, targetDay: Days | Days[]) => {
    const formatDate = format(convertToDate(date), "dd") as Days;
    return typeof targetDay === "string" ? formatDate === targetDay : targetDay.includes(formatDate); 
}

export const isEqualDate = (...days: TimeTypes[]): boolean => {
    const check = convertToMilliseconds(startOfDay(convertToDate(days[0])));
    const isDiff = days.some(day => check !== convertToMilliseconds(startOfDay(convertToDate(day))));
    return !isDiff;
}

/**
 * 比較対象の日付が基準の日付よりも過去かを判断する
 * @param baseDateTime - 基準となる日付と時間
 * @param targetDateTime - 比較対象の日付と時間
 * @param includesEqual - 基準日付と等しい場合も含めるかどうか
 * @returns 比較結果（ターゲット日付が基準日付よりも過去の場合はtrue、そうでない場合はfalse）
 */
export const isBeforeDateTime = (baseDateTime: TimeTypes, dateTimeToCompare: TimeTypes = new Date(), includesEqual: boolean = false, convertToMidnight = false) => {
    const baseDate = convertToMidnight ? getMidnightDate(baseDateTime) : convertToDate(baseDateTime);
    const dateToCompare = convertToMidnight ? getMidnightDate(dateTimeToCompare) : convertToDate(dateTimeToCompare);
    if (includesEqual && baseDate === dateToCompare) return true;
    return isBefore(baseDate, dateToCompare);
}

/**
 * 特定の日付の0時0分のタイムスタンプを返します。
 * @param date 対象の日付
 * @returns 0時0分のタイムスタンプ
 */
export const getMidnightTimestamp = (date: TimeTypes = new Date()): Timestamp => {
    return Timestamp.fromDate(getMidnightDate(date));
};

export const getMidnightDate = (date: TimeTypes = new Date()): Date => {
    const midnight = startOfDay(convertToDate(date));
    return midnight;
}
