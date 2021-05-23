import { TerminalResult } from './TerminalResult'

/**
 * A parse sub result that might not be a valid type expression on its own.
 */
export type NonTerminalResult =
  TerminalResult
  | KeyValueResult
  | JsdocObjectKeyValueResult
  | NumberResult

/**
 * A key value pair represented by a `:`. Can occur as a named parameter of a {@link FunctionResult} or as an entry for
 * an {@link ObjectResult}. Is a {@link NonTerminalResult}.
 */
export interface KeyValueResult {
  type: 'KEY_VALUE'
  value: string
  right: TerminalResult | undefined
  optional: boolean
  meta: {
    quote: '\'' | '"' | undefined
  }
}

export interface JsdocObjectKeyValueResult {
  type: 'JSDOC_OBJECT_KEY_VALUE'
  left: TerminalResult
  right: TerminalResult
}

/**
 * A number. Can be the key of an {@link ObjectResult} entry or the parameter of a {@link SymbolResult}.
 * Is a {@link NonTerminalResult}.
 */
export interface NumberResult {
  type: 'NUMBER'
  value: number
}
