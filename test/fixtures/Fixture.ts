import { ParseResult } from '../../src'

export interface Fixture {
  description: string
  input: string
  expected: ParseResult
}
