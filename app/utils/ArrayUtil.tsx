
export const localToArray = (array?: any[] | any | null): any[] => {
  if (!Array.isArray(array)) {
    return []
  }
  return array
}