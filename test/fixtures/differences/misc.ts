import { Fixture } from '../Fixture'

export const miscDiffs: Fixture[] = [
  {
    description: 'function without parenthesis',
    input: 'function',
    modes: ['jsdoc'],
    catharsisModes: ['jsdoc'],
    jtpModes: ['jsdoc', 'permissive']
  },
  {
    description: 'function without return type',
    input: 'function()',
    modes: ['jsdoc', 'closure'],
    catharsisModes: ['jsdoc', 'closure'],
    jtpModes: ['jsdoc', 'closure', 'permissive']
  },
  {
    description: 'arrow function',
    input: '() => void',
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'keyof',
    input: 'keyof A',
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'typeof',
    input: 'typeof A',
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'import',
    input: 'import("x")',
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'tuple',
    input: '[a]',
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  }
]
