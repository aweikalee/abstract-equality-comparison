import { stringify } from './stringify'

/**
 * 将字符串转成 ECMAScript 值
 */
export function stringToVariable<T = any>(value: string): T {
    return new Function(`return ${value}`)()
}

/**
 * 将 ECMAScript 值转成字符串用于显示
 */
export function variableToString(value: unknown): string {
    return stringify(value)
}
