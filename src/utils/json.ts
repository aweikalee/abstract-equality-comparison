export type IReplacer = (k: string | number | symbol, v: unknown) => any

const PLACEHOLDER = {
    circular: '<Circular>',
}

/**
 * 同 JSON.stringify，但针对 循环引用 进行了优化。
 * @param value
 * @param replacer
 * @param space
 */
export function jsonStringify(
    value: unknown,
    replacer?: IReplacer,
    space?: string | number
) {
    const stack = []
    const replacerFunction: IReplacer =
        replacer ??
        function (k, v) {
            return v
        }
    let gap = ''

    if (typeof space === 'number') {
        space = Math.max(0, Math.min(10, Math.floor(space)))
        gap = new Array(space + 1).join(' ')
    } else if (typeof space === 'string') {
        gap = space.substr(0, 10)
    }

    function stringify(
        parent: object,
        key: string | number | symbol,
        node: unknown,
        level: number
    ) {
        const indent = gap ? `\n${new Array(level + 1).join(gap)}` : ''
        const colon = space ? ': ' : ':'
        const n = replacerFunction.call(parent, key, node)

        if (typeof n !== 'object' || n === null) {
            return JSON.stringify(n)
        }

        if (Array.isArray(n)) {
            const output: string[] = n.map((v, i) => {
                return `${indent}${gap}${stringify(n, i, v, level + 1)}`
            })
            if (output.length === 0) return '[]'
            return `[${output.join(',')}${indent}]`
        }

        if (stack.includes(n)) return PLACEHOLDER.circular

        if (n.toJSON) return JSON.stringify(n.toJSON())

        stack.push(n)

        const keys = Object.keys(n)
        const output: string[] = []
        keys.forEach((k) => {
            const key = JSON.stringify(k)
            const value = stringify(n, k, n[k], level + 1)
            if (key === undefined || value === undefined) return
            output.push(`${indent}${gap}${key}${colon}${value}`)
        })

        stack.splice(stack.lastIndexOf(n), 1)
        if (output.length === 0) return '{}'
        return `{${output.join(',')}${indent}}`
    }

    return stringify({ '': value }, '', value, 0)
}
