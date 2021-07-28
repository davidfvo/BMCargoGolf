export const isObject = (o: any) => {
  return (!!o) && (o.constructor === Object);
}

export const localToObject = (o: any) => {
  if(!isObject(o)){
    return {}
  }
  return o
}

export const safeValExtraction = (o: any, key = 'Value') => {
  return localToObject(o)[key]
}

export const isObjectEmpty = (o: object) => {
  return Object.keys(localToObject(o)).length == 0
}