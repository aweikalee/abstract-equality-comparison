import { jsonStringify } from './json'

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
    if (value === undefined) return 'undefined'

    const prefix = '__' + Date.now()
    return jsonStringify(value, (k, v) => {
        const type = typeof v
        switch (type) {
            case 'function':
                return `${prefix}<Function>`
            case 'number':
                return Number.isNaN(v) ? `${prefix}NaN` : v
            case 'symbol':
                return `${prefix}${v.toString()}`
            case 'bigint':
                return `${prefix}${v}n`
            default:
                return v
        }
    }).replace(
        new RegExp(`"${prefix}(<Function>|NaN|Symbol\\([^)]*\\)|\\d+n)"`, 'g'),
        '$1'
    )
}
