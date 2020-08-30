import { defineComponent, InputHTMLAttributes, Events, ref } from 'vue'

type StringKeyOf<T> = Extract<keyof T, string>

type EventHandlers<E> = {
    [K in StringKeyOf<E>]?: E[K] extends Function
        ? E[K]
        : (payload: E[K]) => void
}

export interface IOperationProps
    extends InputHTMLAttributes,
        EventHandlers<Events> {}

const Component = defineComponent<IOperationProps>((props, ctx) => {
    const isComposition = ref(false)

    const onChange = function (e: Event) {
        if (isComposition.value) return
        ctx.emit('change', e)
    }

    const onInput = function (e: Event) {
        if (isComposition.value) return
        ctx.emit('input', e)
    }

    const attrs: IOperationProps = {
        onChange,
        onInput,
        onCompositionstart(e) {
            isComposition.value = true
            ctx.emit('compositionstart', e)
        },
        onCompositionend(e) {
            isComposition.value = false
            ctx.emit('compositionend', e)
            onChange(e)
            onInput(e)
        },
    }

    return () => <input type="text" {...attrs} />
})

export default Component
