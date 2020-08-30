export function Type(argument: unknown) {
    const type = typeof argument
    if (argument === null) return 'null'
    if (type === 'function') return 'object'
    return type
}

export function ToNumber(argument: unknown) {
    if (Type(argument) === 'bigint') {
        throw new TypeError('Cannot convert bigint to number value')
    }
    return Number(argument)
}

export function ToString(argument: unknown) {
    if (Type(argument) === 'symbol') {
        throw new TypeError('Cannot convert symbol to string value')
    }
    return String(argument)
}

export function StringToBigInt(argument: string) {
    if (Type(argument) !== 'string') {
        throw new TypeError('Only accept string')
    }

    try {
        return BigInt(argument)
    } catch (e) {
        return NaN
    }
}

export function ToPrimitive(
    input: unknown,
    PreferredType?: 'string' | 'number'
) {
    /* 1 不需要实现 */

    /* 2 */
    if (Type(input) === 'object') {
        let hint: 'string' | 'number' | 'default'
        /* a */
        if (PreferredType === undefined) {
            hint = 'default'
        } else if (PreferredType === 'string') {
            /* b */
            hint = 'string'
        } else {
            /* c */
            /* i */
            if (PreferredType !== 'number') {
                throw new TypeError('preferred type must be "string" or "number"')
            }

            /* ii */
            hint = 'number'
        }

        /* d */
        const exoticToPrim = GetMethod(input as object, Symbol.toPrimitive)

        /* e */
        if (exoticToPrim !== undefined) {
            /* i */
            const result = exoticToPrim.call(input, hint)

            /* i */
            if (Type(result) !== 'object') return result

            /* i */
            throw new TypeError('Cannot convert object to primitive value')
        }

        /* f */
        if (hint === 'default') hint = 'number'

        /* g */
        return OrdinaryToPrimitive(input as object, hint)
    }

    /* 3 */
    return input
}

export function OrdinaryToPrimitive(o: object, hint: 'string' | 'number') {
    /* 1 */
    if (Type(o) !== 'object') throw new TypeError('Only accept Object')

    /* 2 */
    if (Type(hint) !== 'string' || !['string', 'number'].includes(hint)) {
        throw new TypeError('Hint value must be "string" or "number"')
    }

    let methodNames: string[]
    /* 3 */
    if (hint === 'string') {
        /* a */
        methodNames = ['toString', 'valueOf']
    } else {
        /* 4 */
        /* a */
        methodNames = ['valueOf', 'toString']
    }

    /* 5 */
    for (const name of methodNames) {
        /* a */
        const method = Get(o, name)

        /* b */
        if (IsCallable(method)) {
            /* i */
            const result = method.call(o)

            /* ii */
            if (Type(result) !== 'object') return result
        }
    }

    /* 6 */
    throw new TypeError('Cannot convert object to primitive value')
}

export function GetMethod(v: object, p: string | symbol) {
    if (!isPropertyKey(p)) {
        throw new TypeError('Not valid property key')
    }
    const func = GetV(v, p)
    if (func === undefined || func === null) return undefined
    if (!IsCallable(func)) {
        throw new TypeError('Not callable')
    }
    return func
}

export function isPropertyKey(argument: unknown) {
    if (Type(argument) === 'string') return true
    if (Type(argument) === 'symbol') return true
    return false
}

export function Get(o: object, p: string | symbol) {
    if (Type(o) !== 'object') {
        throw new TypeError('Only accept object')
    }
    if (!isPropertyKey(p)) {
        throw new TypeError('Not valid property key')
    }
    return o[p]
}

export function GetV(v: any, p: string | symbol) {
    if (!isPropertyKey(p)) {
        throw new TypeError('Not valid property key')
    }
    const o = ToObject(v)
    return o[p]
}

export function IsCallable(argument: any) {
    if (Type(argument) !== 'object') return false
    if (!!argument.call) return true
    return false
}

export function ToObject(argument: unknown) {
    switch (Type(argument)) {
        case 'boolean':
            return new Boolean(argument)
        case 'number':
            return new Number(argument)
        case 'string':
            return new String(argument)
        case 'symbol':
        case 'bigint':
        case 'object':
            return argument
        default:
            throw new TypeError(
                `Cannot convert ${Type(argument)} to object value`
            )
    }
}
