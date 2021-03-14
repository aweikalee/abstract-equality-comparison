import { stringify } from './stringify'

function comparison(x: any, y: any) {
    return () => expect(stringify(y)).toBe(x)
}

test('undefined', comparison('undefined', undefined))
test(
    'function',
    comparison('<Function>', () => {})
)
test('NaN', comparison('NaN', NaN))
test('Infinity', comparison('Infinity', Infinity))
test('-Infinity', comparison('-Infinity', -Infinity))
test('symbol', comparison('Symbol(123)', Symbol(123)))
test('bigint', comparison('123n', BigInt(123)))

test('root circular', comparison('{"value":<Circular ~>}', (() => {
    const obj = {
        value: null
    }
    obj.value = obj
    return obj
})()))


test('together circular', comparison('{"parent":{"child":{"parent":<Circular ~.parent>}},"child":{"parent":{"child":<Circular ~.child>}}}', (() => {
    const obj = {
        parent: {
            child: null
        },
        child: {
            parent: null
        }
    }
    obj.parent.child = obj.child
    obj.child.parent = obj.parent
    return obj
})()))
