import { Fixture } from '../Fixture'

export const miscDiffs: Fixture[] = [
  {
    description: 'function without parenthesis',
    input: 'function',
    modes: ['jsdoc'],
    catharsis: {
  closure: 'fail',
  jsdoc: 'jsdoc'
},
    jtpModes: ['jsdoc', 'permissive']
  },
  {
    description: 'function without return type',
    input: 'function()',
    modes: ['jsdoc', 'closure'],
    catharsisModes: ['jsdoc', 'closure'],
    jtp: {
  closure: 'closure',
  jsdoc: 'jsdoc',
  typescript: 'fail',
  permissive: 'closure'
}
  },
  {
    description: 'arrow function',
    input: '() => void',
    modes: ['typescript'],
    catharsis: {
  closure: 'fail',
  jsdoc: 'fail'
},
    jtp: {
  closure: 'fail',
  jsdoc: 'fail',
  typescript: 'typescript',
  permissive: 'typescript'
}
  },
  {
    description: 'keyof',
    input: 'keyof A',
    modes: ['typescript'],
    catharsis: {
  closure: 'fail',
  jsdoc: 'fail'
},
    jtp: {
  closure: 'fail',
  jsdoc: 'fail',
  typescript: 'typescript',
  permissive: 'typescript'
}
  },
  {
    description: 'typeof',
    input: 'typeof A',
    modes: ['typescript'],
    catharsis: {
  closure: 'fail',
  jsdoc: 'fail'
},
    jtp: {
  closure: 'fail',
  jsdoc: 'fail',
  typescript: 'typescript',
  permissive: 'typescript'
}
  },
  {
    description: 'import',
    input: 'import("x")',
    modes: ['typescript'],
    catharsis: {
  closure: 'fail',
  jsdoc: 'fail'
},
    jtp: {
  closure: 'fail',
  jsdoc: 'fail',
  typescript: 'typescript',
  permissive: 'typescript'
}
  },
  {
    description: 'tuple',
    input: '[a]',
    modes: ['typescript'],
    catharsis: {
  closure: 'fail',
  jsdoc: 'fail'
},
    jtp: {
  closure: 'fail',
  jsdoc: 'fail',
  typescript: 'typescript',
  permissive: 'typescript'
}
  }
]
