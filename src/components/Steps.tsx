import { defineComponent } from 'vue'
import { STATUS, IStatusMap, IStep } from '../utils/AbstractEqualityComparison'

import './Steps.scss'

export interface IStepsProps {
    status: IStatusMap
}

const getUrl = (value: string) => {
    return `https://ecma-international.org/ecma-262/${value}`
}

const Component = defineComponent<IStepsProps>((props) => {
    const { status } = props
    const getClass = (step: IStep) => {
        return STATUS[status[step] ?? STATUS.ignore]
    }

    return () => (
        <ol class="steps">
            <li class={getClass('1')}>
                If{' '}
                <a href={getUrl('#sec-ecmascript-data-types-and-values')}>
                    Type
                </a>
                (<var>x</var>) is the same{' '}
                <a href={getUrl('#sec-ecmascript-data-types-and-values')}>
                    Type
                </a>
                (<var>y</var>), then
                <ol>
                    <li class={getClass('1.a')}>
                        <span class="icon"></span>
                        Return the result of performing{' '}
                        <a href={getUrl('#sec-strict-equality-comparison')}>
                            Strict Equality Comparison
                        </a>{' '}
                        <var>x</var> === <var>y</var>.
                    </li>
                </ol>
            </li>
            <li class={getClass('2')}>
                If <var>x</var> is <strong>null</strong> and <var>y</var> is{' '}
                <strong>undefined</strong>, return <strong>true</strong>.
            </li>
            <li class={getClass('3')}>
                If <var>x</var> is <strong>undefined</strong> and <var>y</var>{' '}
                is <strong>null</strong>, return <strong>true</strong>.
            </li>
            <li class={getClass('4')}>
                If{' '}
                <a href={getUrl('#sec-ecmascript-data-types-and-values')}>
                    Type
                </a>
                (<var>x</var>) is Number and{' '}
                <a href={getUrl('#sec-ecmascript-data-types-and-values')}>
                    Type
                </a>
                (<var>y</var>) is String, return the result of the comparison{' '}
                <var>x</var> == <a href={getUrl('#sec-tonumber')}>ToNumber</a>(
                <var>y</var>).
            </li>
            <li class={getClass('5')}>
                If{' '}
                <a href={getUrl('#sec-ecmascript-data-types-and-values')}>
                    Type
                </a>
                (<var>x</var>) is String and{' '}
                <a href={getUrl('#sec-ecmascript-data-types-and-values')}>
                    Type
                </a>
                (<var>y</var>) is Number, return the result of the comparison{' '}
                <a href={getUrl('#sec-tonumber')}>ToNumber</a>(<var>x</var>) =={' '}
                <var>y</var>.
            </li>
            <li class={getClass('6')}>
                If{' '}
                <a href={getUrl('#sec-ecmascript-data-types-and-values')}>
                    Type
                </a>
                (<var>x</var>) is BigInt and{' '}
                <a href={getUrl('#sec-ecmascript-data-types-and-values')}>
                    Type
                </a>
                (<var>y</var>) is String, then{' '}
                <ol>
                    <li class={getClass('6.a')}>
                        Let <var>n</var> be{' '}
                        <a href={getUrl('#sec-stringtobigint')}>
                            StringToBigInt
                        </a>
                        (<var>y</var>).
                    </li>
                    <li class={getClass('6.b')}>
                        If <var>n</var> is <strong>NaN</strong>, return{' '}
                        <strong>false</strong>.
                    </li>
                    <li class={getClass('6.c')}>
                        Return the result of the comparison <var>x</var> =={' '}
                        <var>n</var>.
                    </li>
                </ol>
            </li>
            <li class={getClass('7')}>
                If{' '}
                <a href={getUrl('#sec-ecmascript-data-types-and-values')}>
                    Type
                </a>
                (<var>x</var>) is String and{' '}
                <a href={getUrl('#sec-ecmascript-data-types-and-values')}>
                    Type
                </a>
                (<var>y</var>) is BigInt, return the result of the comparison{' '}
                <var>y</var> == <var>x</var>.
            </li>
            <li class={getClass('8')}>
                If{' '}
                <a href={getUrl('#sec-ecmascript-data-types-and-values')}>
                    Type
                </a>
                (<var>x</var>) is Boolean, return the result of the comparison{' '}
                <a href={getUrl('#sec-tonumber')}>ToNumber</a>(<var>x</var>) ==
                <var>y</var>.
            </li>
            <li class={getClass('9')}>
                If{' '}
                <a href={getUrl('#sec-ecmascript-data-types-and-values')}>
                    Type
                </a>
                (<var>y</var>) is Boolean, return the result of the comparison{' '}
                <var>x</var> =={' '}
                <a href={getUrl('#sec-tonumber')}>ToNumber</a>(<var>y</var>).
            </li>
            <li class={getClass('10')}>
                If{' '}
                <a href={getUrl('#sec-ecmascript-data-types-and-values')}>
                    Type
                </a>
                (<var>x</var>) is either String, Number, BigInt, or Symbol and{' '}
                <a href={getUrl('#sec-ecmascript-data-types-and-values')}>
                    Type
                </a>
                (<var>y</var>) is Object, return the result of the comparison{' '}
                <var>x</var> =={' '}
                <a href={getUrl('#sec-toprimitive')}>ToPrimitive</a>(
                <var>y</var>
                ).
            </li>
            <li class={getClass('11')}>
                If{' '}
                <a href={getUrl('#sec-ecmascript-data-types-and-values')}>
                    Type
                </a>
                (<var>x</var>) is Object and{' '}
                <a href={getUrl('#sec-ecmascript-data-types-and-values')}>
                    Type
                </a>
                (<var>y</var>) is either String, Number, BigInt, or Symbol,{' '}
                return the result of the comparison{' '}
                <a href={getUrl('#sec-toprimitive')}>ToPrimitive</a>(
                <var>x</var>) == <var>y</var>.
            </li>
            <li class={getClass('12')}>
                If{' '}
                <a href={getUrl('#sec-ecmascript-data-types-and-values')}>
                    Type
                </a>
                (<var>x</var>) is BigInt and{' '}
                <a href={getUrl('#sec-ecmascript-data-types-and-values')}>
                    Type
                </a>
                (<var>y</var>) is Number, or if{' '}
                <a href={getUrl('#sec-ecmascript-data-types-and-values')}>
                    Type
                </a>
                (<var>x</var>) is Number and{' '}
                <a href={getUrl('#sec-ecmascript-data-types-and-values')}>
                    Type
                </a>
                (<var>y</var>) is BigInt, then
                <ol>
                    <li class={getClass('12.a')}>
                        If <var>x</var> or <var>y</var> are any of{' '}
                        <strong>NaN</strong>,<strong>+∞</strong>, or{' '}
                        <strong>-∞</strong>, return <strong>false</strong>.
                    </li>
                    <li class={getClass('12.b')}>
                        If the{' '}
                        <a href={getUrl('#mathematical-value')}>
                            mathematical value
                        </a>{' '}
                        of <var>x</var> is equal to the{' '}
                        <a href={getUrl('#mathematical-value')}>
                            mathematical value
                        </a>{' '}
                        of <var>y</var>, return <strong>true</strong>; otherwise
                        return <strong>false</strong>.
                    </li>
                </ol>
            </li>
            <li class={getClass('13')}>
                Return <strong>false</strong>.
            </li>
        </ol>
    )
})

Component.props = ['status']

export default Component
