// rollup.config.js
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/index.ts',
  output: {
    dir: 'build',
    format: 'umd',
    name: 'jtpp'
  },
  plugins: [typescript({
    exclude: [
      './**/*.spec.ts'
    ]
  })]
}
