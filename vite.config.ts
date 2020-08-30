import { BuildConfig } from 'vite'

const config: BuildConfig = {
    esbuildTarget: 'es6',
    base: '.',
    assetsDir: "assets"
}

export default config
