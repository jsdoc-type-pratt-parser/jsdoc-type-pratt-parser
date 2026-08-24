import commonjs from '@rollup/plugin-commonjs'

export default [
  {
    input: 'node_modules/acorn-jsx/index.js',
    external: ['acorn'],
    output: {
      format: 'esm',
      sourcemap: true,
      file: `vendor/acorn-jsx/index.esm.js`
    },
    plugins: [
      commonjs({
        esmExternals: true
      })
    ]
  }
]
