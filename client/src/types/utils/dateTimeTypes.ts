import { Timestamp } from "firebase/firestore";

type OneToNine = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type ZeroToNine = "0" | OneToNine;

export type Month = `0${OneToNine}` | "10" | "11" | "12";
export type Days = `0${OneToNine}` | `1${ZeroToNine}` | `2${ZeroToNine}` | "30" | "31";
export type Hours24 = `0${ZeroToNine}` | `1${ZeroToNine}` | "20" | "21" | "22" | "23";
export type ISODate = `${string}-${Month}-${Days}`;
export type ISODateTime = `${ISODate}T${string}Z`;

export type Week = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

export type TimeTypes = number | Timestamp | Date | ISODate | ISODateTime;

export type TimeSizeUnit = "millis" | "seconds" | "minutes" | "hours" | "days" | "years";

export enum WeekEnum {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
}