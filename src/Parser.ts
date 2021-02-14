import { ParserEngine } from './ParserEngine'
import { closureGrammar } from './grammars/closureGrammar'
import { ParseResult } from './ParseResult'
import { jsdocGrammar } from './grammars/jsdocGrammar'

export type ParserMode = 'closure' | 'jsdoc'

export interface ParserOptions {
  mode?: ParserMode
}

/**
 * @public
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
    }
  }

  parse (text: string): ParseResult {
    return this.engine.parseText(text)
  }
}
