import { defineComponent } from 'vue'
import Input from './Input'

import './Operation.scss'

export interface IOperationProps {
    x: any
    y: any
    status: 0 | 1 | 2
    onXChange: (e: Event) => void
    onYChange: (e: Event) => void
}

const Component = defineComponent<IOperationProps>((props, ctx) => {
    const onXChange = (e: Event) => {
        ctx.emit('XChange', e)
    }

    const onYChange = (e: Event) => {
        ctx.emit('YChange', e)
    }

    return () => (
        <div class={['operation', ['no', 'yes'][props.status]]}>
            <div class="input">
                <label>x</label>
                <Input
                    type="text"
                    value={props.x}
                    onInput={onXChange}
                    placeholder="undefined"
                />
            </div>
            <div class="equals">==</div>
            <div class="input">
                <label>y</label>
                <Input
                    type="text"
                    value={props.y}
                    onInput={onYChange}
                    placeholder="undefined"
                />
            </div>
        </div>
    )
})

Component.props = ['x', 'y', 'status', 'onXChange', 'onYChange']

export default Component
