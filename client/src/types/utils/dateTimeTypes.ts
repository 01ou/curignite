import { Timestamp } from 'firebase/firestore'

type OneToNine = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
export type DecimalDight = '0' | OneToNine
export type HexDigit =
  | DecimalDight
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'

export type Month = `0${DecimalDight}` | '10' | '11' | '12'
export type Days =
  | `0${DecimalDight}`
  | `1${DecimalDight}`
  | `2${DecimalDight}`
  | '30'
  | '31'
export type Hours24 =
  | `0${DecimalDight}`
  | `1${DecimalDight}`
  | '20'
  | '21'
  | '22'
  | '23'
export type ISODate = `${string}-${Month}-${Days}`
export type ISODateTime = `${ISODate}T${string}Z`

export type Week =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

export type TimeType = number | Timestamp | Date | ISODate | ISODateTime

export type TimeSizeUnit =
  | 'millis'
  | 'seconds'
  | 'minutes'
  | 'hours'
  | 'days'
  | 'years'

export enum WeekEnum {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}
