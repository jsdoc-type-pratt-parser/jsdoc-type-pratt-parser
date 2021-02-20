import {DiffFixture} from "../Fixture";

export const miscDiffs: DiffFixture[] = [
  {
    description: 'function without parenthesis',
    input: 'function',
    modes: {
      closure: false,
      jsdoc: true,
      typescript: false
    }
  },
  {
    description: 'function without return type',
    input: 'function()',
    modes: {
      closure: true,
      jsdoc: true,
      typescript: false
    }
  },
  {
    description: 'arrow function',
    input: '() => void',
    modes: {
      closure: false,
      jsdoc: false,
      typescript: true
    }
  },
  {
    description: 'keyof',
    input: 'keyof A',
    modes: {
      closure: false,
      jsdoc: false,
      typescript: true
    }
  },
  {
    description: 'typeof',
    input: 'typeof A',
    modes: {
      closure: false,
      jsdoc: false,
      typescript: true
    }
  },
  {
    description: 'import',
    input: 'import("x")',
    modes: {
      closure: false,
      jsdoc: false,
      typescript: true
    }
  },
  {
    description: 'tuple',
    input: '[a]',
    modes: {
      closure: false,
      jsdoc: false,
      typescript: true
    }
  }
]
