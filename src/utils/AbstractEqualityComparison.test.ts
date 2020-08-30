import { AbstractEqualityComparison } from './AbstractEqualityComparison'

function comparison(x: any, y: any) {
    return () => expect(AbstractEqualityComparison(x, y)[0]).toBe(x == y)
}

test('true == false', comparison(true, false))
test('null == undefined', comparison(null, undefined))
test('undefined == null', comparison(undefined, null))

test('0 == "0"', comparison(0, '0'))
test('"123" == 123', comparison('123', 123))

test('BigInt("123") == "123"', comparison(BigInt('123'), 123))
test('123 == BigInt("123")', comparison(123, BigInt('123')))

test('true == 1', comparison(true, 1))
test('0 == false', comparison(0, false))

test(
    '"123" == { valueOf() { return 123 } }',
    comparison('123', {
        valueOf() {
            return 123
        },
    })
)
test(
    '{ toString() { return "123" } } == BigInt("123")',
    comparison(
        {
            toString() {
                return '123'
            },
        },
        BigInt('123')
    )
)
test('"[object Object]" == {}', comparison('[object Object]', {}))

test('null == false', comparison(null, false))

test('[] == ![]', comparison([], ![]))
test('[] == []', comparison([], []))
test('null == false', comparison(null, false))

test(
    '1000000000000000000000 == BigInt("1000000000000000000000")',
    comparison(1000000000000000000000, BigInt('1000000000000000000000'))
)
test(
    '10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 == BigInt("10000000000000000159028911097599180468360808563945281389781327557747838772170381060813469985856815104")',
    comparison(
        10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000,
        BigInt(
            '10000000000000000159028911097599180468360808563945281389781327557747838772170381060813469985856815104'
        )
    )
)
