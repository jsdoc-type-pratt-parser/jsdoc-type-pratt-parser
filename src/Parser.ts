import { ParserEngine } from './ParserEngine'
import { closureGrammar } from './grammars/closureGrammar'
import { ParseResult } from './ParseResult'
import { jsdocGrammar } from './grammars/jsdocGrammar'
import { typescriptGrammar } from './grammars/typescriptGrammar'

export type ParserMode = 'closure' | 'jsdoc' | 'typescript'

export interface ParserOptions {
  mode?: ParserMode
}

/**
 * Objects of this class are parsers for a {@link ParserMode}. It maintains a parser engine working on a grammar corresponding to the mode.
 */
export class Parser {
  private readonly engine: ParserEngine

  constructor ({
    mode = 'closure'
  }: ParserOptions = {}) {
    switch (mode) {
      case 'closure':
        this.engine = new ParserEngine(closureGrammar)
        break
      case 'jsdoc':
        this.engine = new ParserEngine(jsdocGrammar)
        break
      case 'typescript':
        this.engine = new ParserEngine(typescriptGrammar)
    }
  }

  /**
   * Parses the given type expression and produces a {@link ParseResult}
   * @param text
   */
  parse (text: string): ParseResult {
    return this.engine.parseText(text)
  }
}
