import { isEmpty } from "./ValidationUtil";

export function localToString(s: any): string {
  if (!s) {
    return ""
  }
  return String(s)
}

export function cleanString(s: any): string {
  if (!s) {
    return ""
  }
  return String(s).trim()
}

export function isStringEmpty(s: any) {
  if (!s || String(s).length == 0) {
    return false
  }
  return s
}

export function cleanNumberWithDecimal(n: number | string): string {
  if (!n) {
    return ''
  }
  return `${n}`.replace(/[^0-9.]/g, '')
}

export function searchInString(string = '', query = '') {
  const _string = localToString(string).toLowerCase().replace(/\s/g, '')
  const _query = localToString(query).toLowerCase().replace(/\s/g, '')

  return _string.includes(_query)
}