import { ParseResult, ParserMode } from '../../src'

export interface Fixture {
  description: string
  input: string
  expected?: ParseResult
  shouldFail?: true
}

export interface DiffFixture {
  description: string
  modes: {
    [K in ParserMode]: boolean
  }
  input: string
}

// export interface Fixture {
//   description: string
//   modes: ParserMode[]
//   jtpModes: Array<'jsdoc' | 'closure' | 'typescript' | 'permissive'>
//   catharsisModes: Array<'jsdoc' | 'closure'>
//   expected?: ParseResult
//   input: string
// }
