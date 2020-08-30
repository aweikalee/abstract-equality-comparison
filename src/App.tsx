import { defineComponent, reactive, watch, toRaw } from 'vue'
import Operation from './components/Operation'
import Steps from './components/Steps'
import {
    AbstractEqualityComparison as comparison,
    IIteration,
    stringToVariable,
    variableToString,
    Type,
} from './utils'

import './App.scss'

const CANIUSE_BIGINT = (() => {
    try {
        return BigInt('123').toString() == '123'
    } catch (e) {
        return false
    }
})()

const Component = defineComponent(() => {
    const variable = reactive({
        x: '123',
        y: `"123"`,
    })

    const state = reactive<{
        result: boolean
        iterations: IIteration[] | null
        error: Error | null
    }>({
        result: true,
        iterations: null,
        error: null,
    })

    watch(
        [variable],
        () => {
            state.iterations = null
            state.error = null

            try {
                const x = stringToVariable(variable.x)
                const y = stringToVariable(variable.y)

                const [result, iterations] = comparison(x, y)

                state.result = result
                state.iterations = iterations

                if (result !== (x == y)) {
                    state.error = new Error(
                        `the result of AbstractEqualityComparison is different from the result of "=="`
                    )
                }
            } catch (e) {
                state.error = e
            }
        },
        { immediate: true }
    )

    return () => (
        <div>
            <h1>Abstract Equality Comparison</h1>

            {!CANIUSE_BIGINT && (
                <p style="color: orange">
                    Sorry, your browser cannot support bigint.
                </p>
            )}

            <p>
                Base on{' '}
                <a href="https://felix-kling.de/js-loose-comparison">
                    JavaScript "loose" comparison step by step
                </a>
                .
            </p>

            <Operation
                x={variable.x}
                y={variable.y}
                status={state.error ? 2 : state.result ? 1 : 0}
                onXChange={(e) => {
                    variable.x = (e.target as HTMLInputElement).value
                }}
                onYChange={(e) => {
                    variable.y = (e.target as HTMLInputElement).value
                }}
            />

            {state.error && <div class="error">{state.error.message}</div>}

            {state.iterations && (
                <div class="iterations">
                    {state.iterations.map(({ x, y, status }, index) => {
                        let left = '???'
                        let right = '???'
                        try {
                            left = variableToString(toRaw(x))
                        } catch (e) {}
                        try {
                            right = variableToString(toRaw(y))
                        } catch (e) {}

                        return (
                            <details
                                open={index === 0}
                                key={`${left},${right}`}
                            >
                                <summary>
                                    <strong>Iteration {index + 1}:</strong>
                                    <div class="description">
                                        <strong>x</strong>: <em>{Type(x)}</em> ={' '}
                                        {left}
                                        <br />
                                        <strong>y</strong>: <em>{Type(y)}</em> ={' '}
                                        {right}
                                    </div>
                                </summary>

                                <Steps status={status} />
                            </details>
                        )
                    })}

                    <h3>Final result: {state.result ? 'true' : 'false'}</h3>
                </div>
            )}
        </div>
    )
})

export default Component
