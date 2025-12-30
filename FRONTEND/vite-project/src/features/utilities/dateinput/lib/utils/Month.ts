import { getMonth, getYear, startOfMonth, endOfMonth } from 'date-fns'

import { Interval } from "../../lib/utils/Interval"
import { haveEqualFields } from "../../lib/utils/haveEqualFields"

export type Month = {
  year: number
  // index of month starting from 1
  month: number
}

export const areSameMonth = <T extends Month>(a: T, b: T): boolean =>
  haveEqualFields(['year', 'month'], a, b)

export const toMonth = (timestamp: number): Month => {
  const date = startOfMonth(new Date(timestamp))

  return {
    year: getYear(date),
    month: getMonth(date) + 1,
  }
}

export const fromMonth = ({ year, month }: Month): number => {
  const date = new Date(year, month - 1, 1)

  return startOfMonth(date).getTime()
}

export const monthToString = ({ year, month }: Month): string =>
  [month, year].join('-')

export const stringToMonth = (str: string): Month => {
  const [month, year] = str.split('-').map(Number)

  return { month, year }
}

export const shortMonthsNamesEN = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export const monthNamesEN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const shortMonthsNames = [
  'Jan',
  'Fev',
  'Mar',
  'Avr',
  'Mai',
  'Juin',
  'Jul',
  'Août',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export const monthNames = [
  'Janvier',
  'Fevrier',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Decembre',
]

export const getMonthInterval = (month: Month): Interval => {
  const timestamp = fromMonth(month)
  return {
    start: startOfMonth(timestamp).getTime(),
    end: endOfMonth(timestamp).getTime(),
  }
}

export const addMonths = (
  { year, month }: Month,
  monthsToAdd: number,
): Month => {
  const totalMonths = month + monthsToAdd - 1 // Adjust to zero-based index
  const newYear = year + Math.floor(totalMonths / 12)
  const newMonth = (totalMonths % 12) + 1 // Adjust back to one-based index

  return { year: newYear, month: newMonth }
}

export const subtractMonths = (
  { year, month }: Month,
  monthsToSubtract: number,
): Month => {
  const totalMonths = month - monthsToSubtract - 1 // Adjust to zero-based index
  const newYear = year + Math.floor(totalMonths / 12)
  const newMonth = (((totalMonths % 12) + 12) % 12) + 1 // Adjust back to one-based index

  return { year: newYear, month: newMonth === 0 ? 12 : newMonth }
}
