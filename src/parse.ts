import { Parser } from './Parser'
import { jsdocGrammar } from './grammars/jsdocGrammar'
import { closureGrammar } from './grammars/closureGrammar'
import { typescriptGrammar } from './grammars/typescriptGrammar'
import type { RootResult } from './result/RootResult'

export type ParseMode = 'closure' | 'jsdoc' | 'typescript'

/**
 * This function parses the given expression in the given mode and produces a {@link RootResult}.
 * @param expression
 * @param mode
 */
export function parse (
  expression: string, mode: ParseMode, options?: {
    computedPropertyParser: (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Actual API
      text: string, options?: any
    ) => unknown
  }
): RootResult {
  switch (mode) {
    case 'closure':
      return (new Parser(closureGrammar, expression)).parse()
    case 'jsdoc':
      return (new Parser(jsdocGrammar, expression)).parse()
    case 'typescript':
      return (new Parser(typescriptGrammar, expression, undefined, options)).parse()
  }
}

/**
 * This function tries to parse the given expression in multiple modes and returns the first successful
 * {@link RootResult}. By default it tries `'typescript'`, `'closure'` and `'jsdoc'` in this order. If
 * no mode was successful it throws the error that was produced by the last parsing attempt.
 * @param expression
 * @param modes
 */
export function tryParse (expression: string, modes: ParseMode[] = ['typescript', 'closure', 'jsdoc']): RootResult {
  let error
  for (const mode of modes) {
    try {
      return parse(expression, mode)
    } catch (e) {
      error = e
    }
  }
  // eslint-disable-next-line @typescript-eslint/only-throw-error -- Ok
  throw error
}
