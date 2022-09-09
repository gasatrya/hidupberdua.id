import { DateTime } from 'luxon'

// Convert date to ISO
const toISO = (date: string) => DateTime.fromISO(date).toISO({ includeOffset: false, suppressMilliseconds: true })

// Conver date to locale date
const toLocaleDate = (date: string) => DateTime.fromISO(date).setLocale('id').toLocaleString(DateTime.DATE_FULL)

export { toISO, toLocaleDate }
