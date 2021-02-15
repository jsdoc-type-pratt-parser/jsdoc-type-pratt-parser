import { NonTerminalResult, ParseResult } from './ParseResult'

class NonTerminalResultError extends Error {
  constructor (result: NonTerminalResult) {
    super(`Parse ended with non terminal result: '${result.type}'`)

    Object.setPrototypeOf(this, NonTerminalResultError.prototype)
  }
}

export function assertTerminal (result: NonTerminalResult): ParseResult {
  if (result.type === 'KEY_VALUE' || result.type === 'NUMBER' || result.type === 'PARAMETER_LIST') {
    throw new NonTerminalResultError(result)
  }
  return result
}
