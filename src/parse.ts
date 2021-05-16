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

export function parse (expression: string, mode: ParserMode): ParseResult {
  return engines[mode].parseText(expression)
}

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
