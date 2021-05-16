import { ParserEngine } from './ParserEngine'
import { jsdocGrammar } from './grammars/jsdocGrammar'
import { closureGrammar } from './grammars/closureGrammar'
import { typescriptGrammar } from './grammars/typescriptGrammar'
import { ParseResult } from './ParseResult'

export type ParserMode = 'closure' | 'jsdoc' | 'typescript'

const engines = {
  jsdoc: new ParserEngine(jsdocGrammar),
  closure: new ParserEngine(closureGrammar),
  typescript: new ParserEngine(typescriptGrammar)
}

/**
 * This function parses the given expression in the given mode and produces a {@link ParseResult}.
 * @param expression
 * @param mode
 */
export function parse (expression: string, mode: ParserMode): ParseResult {
  return engines[mode].parseText(expression)
}

/**
 * This function tries to parse the given expression in multiple modes and returns the first successful
 * {@link ParseResult}. By default it tries `'typescript'`, `'closure'` and `'jsdoc'` in this order. If
 * no mode was successful it throws the error that was produced by the last parsing attempt.
 * @param expression
 * @param modes
 */
export function tryParse (expression: string, modes: ParserMode[] = ['typescript', 'closure', 'jsdoc']): ParseResult {
  let error
  for (const mode of modes) {
    try {
      return engines[mode].parseText(expression)
    } catch (e) {
      error = e
    }
  }
  throw error
}
