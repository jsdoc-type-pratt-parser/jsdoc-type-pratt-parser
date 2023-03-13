// rollup.config.mjs
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'umd',
    name: 'jtpp'
  },
  plugins: [typescript({
    exclude: [
      './**/*.spec.ts'
    ]
  })]
}
