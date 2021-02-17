import {ParseResult, ParserMode} from '../../src'

export interface Fixture {
  description: string
  input: string
  expected: ParseResult
}

export interface DiffFixture {
  description: string
  modes: {
    [K in ParserMode]: boolean
  },
  input: string
}
