import { KeyValueResult, NonTerminalResult, ParseResult } from './ParseResult'

class UnexpectedTypeError extends Error {
  constructor (result: NonTerminalResult) {
    super(`Unexpected type: '${result.type}'`)

    Object.setPrototypeOf(this, UnexpectedTypeError.prototype)
  }
}

export function assertTerminal (result: NonTerminalResult): ParseResult {
  if (result.type === 'KEY_VALUE' || result.type === 'NUMBER' || result.type === 'PARAMETER_LIST') {
    throw new UnexpectedTypeError(result)
  }
  return result
}

export function assertNamedKeyValueOrTerminal (result: NonTerminalResult): KeyValueResult | ParseResult {
  if (result.type === 'KEY_VALUE') {
    if (result.key.type !== 'NAME') {
      throw new UnexpectedTypeError(result)
    }
    return result as KeyValueResult
  }
  return assertTerminal(result)
}
