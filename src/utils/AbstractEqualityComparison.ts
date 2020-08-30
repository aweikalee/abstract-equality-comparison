import { Type, ToNumber, StringToBigInt, ToPrimitive } from './base'

export enum STATUS {
    ignore,
    pass,
    fail,
}

export type IStep =
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | '11'
    | '12'
    | '13'
    | '1.a'
    | '6.a'
    | '6.b'
    | '6.c'
    | '12.a'
    | '12.b'

export type IStatusMap = {
    [key in IStep]?: STATUS
}

export interface IIteration {
    x: unknown
    y: unknown
    status: IStatusMap
}

export function AbstractEqualityComparison(x: unknown, y: unknown) {
    const iterations: IIteration[] = []

    function equals(x: unknown, y: unknown) {
        const iteration: IIteration = {
            x,
            y,
            status: {},
        }
        iterations.push(iteration)

        const status = iteration.status
        const pass = (s: IStep) => (status[s] = STATUS.pass)
        const fail = (s: IStep) => (status[s] = STATUS.fail)
        const resolve = (result: boolean) => {
            resolve
        }

        /* 1 */
        pass('1')
        if (Type(x) === Type(y)) {
            /* a */
            pass('1.a')
            return x === y
        }
        fail('1')

        /* 2 */
        pass('2')
        if (x === null && y === undefined) return true
        fail('2')

        /* 3 */
        pass('3')
        if (x === undefined && y === null) return true
        fail('3')

        /* 4 */
        pass('4')
        if (Type(x) === 'number' && Type(y) === 'string') {
            return equals(x, ToNumber(y))
        }
        fail('4')

        /* 5 */
        pass('5')
        if (Type(x) === 'string' && Type(y) === 'number') {
            return equals(ToNumber(x), y)
        }
        fail('5')

        /* 6 */
        pass('6')
        if (Type(x) === 'bigint' && Type(y) === 'string') {
            /* a */
            pass('6.a')
            const n = StringToBigInt(<string>y)

            /* b */
            pass('6.b')
            if (Number.isNaN(n)) return false

            /* c */
            pass('6.c')
            return equals(x, n)
        }
        fail('6')

        /* 7 */
        pass('7')
        if (Type(x) === 'string' && Type(y) === 'bigint') {
            return equals(y, x)
        }
        fail('7')

        /* 8 */
        pass('8')
        if (Type(x) === 'boolean') {
            return equals(ToNumber(x), y)
        }
        fail('8')

        /* 9 */
        pass('9')
        if (Type(y) === 'boolean') {
            return equals(x, ToNumber(y))
        }
        fail('9')

        /* 10 */
        pass('10')
        if (
            ['string', 'number', 'bigint', 'symbol'].includes(Type(x)) &&
            Type(y) === 'object'
        ) {
            return equals(x, ToPrimitive(y))
        }
        fail('10')

        /* 11 */
        pass('11')
        if (
            Type(x) === 'object' &&
            ['string', 'number', 'bigint', 'symbol'].includes(Type(y))
        ) {
            return equals(ToPrimitive(x), y)
        }
        fail('11')

        /* 12 */
        pass('12')
        if (
            (Type(x) === 'bigint' && Type(y) === 'number') ||
            (Type(x) === 'number' && Type(y) === 'bigint')
        ) {
            /* a */
            pass('12.a')
            if (
                [x, y].some((v) =>
                    [NaN, Infinity, -Infinity].includes(v as number)
                )
            ) {
                return false
            }
            fail('12.a')

            /* b */
            pass('12.b')
            return (x as number).toString(2) === (y as number).toString(2)
        }
        fail('12')

        /* 13 */
        pass('13')
        return false
    }

    return [equals(x, y), iterations]
}
