import deepMapKeys from 'deep-map-keys'

const toTitle = (str: String) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

const snakeToCamel = (key: string) => key.replace(/_(\w)/g, (match, char) => char.toUpperCase())

const keysToCamelDeep = <T, R>(data: T): R => deepMapKeys<R>(data, snakeToCamel)

export { keysToCamelDeep, toTitle }
