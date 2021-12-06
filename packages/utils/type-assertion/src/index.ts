export type Dict<T = any> = Record<string, T>

export type Nullish = null | undefined | void

/**
 * Assert is Nullish
 */
export const isNullish = (arg: unknown): arg is Nullish => arg === null || arg === undefined

/**
 * Assert is an objectLike
 * TODO: Assert the return type
 */
const isObjectLike = (arg: unknown): arg is any => !!arg && typeof arg === 'object'

/**
 * Assert is an object
 */
export const isObject = (arg: unknown): arg is Dict =>
  isObjectLike(arg) && arg.constructor === Object

/**
 * Assert is a dom element
 */
export const isElement = (arg: unknown): arg is Element =>
  isObjectLike(arg) && arg.constructor !== Object && arg.nodeType === 1

/**
 * Assert is an Promise
 */
export const isPromise = <T>(arg: unknown): arg is Promise<T> =>
  (isObjectLike(arg) || typeof arg === 'function') && typeof arg.then === 'function'

/**
 * Assert is an array
 */
export const isArray: <T>(arg: unknown) => arg is T[] = Array.isArray

/**
 * Assert is an array and `array.length > 0`
 */
export const isArrayNonEmpty = <T>(arg: unknown): arg is T[] => isArray(arg) && arg.length > 0

/**
 * Assert is numeric
 */
export const isNumeric = (arg: unknown): arg is string | number => !Number.isNaN(Number(arg))

/**
 * Assert is function
 */
export const isFunction = <T extends Function = Function>(arg: any): arg is T =>
  typeof arg === 'function'
