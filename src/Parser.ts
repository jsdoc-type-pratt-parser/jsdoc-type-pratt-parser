import { ParserEngine } from './ParserEngine'
import { closureGrammar } from './grammars/closureGrammar'
import { ParseResult } from './ParseResult'

type ParserMode = 'closure'

interface ParserOptions {
  mode?: ParserMode
}

export class Parser {
  private readonly engine: ParserEngine

  constructor ({
    mode = 'closure'
  }: ParserOptions = {}) {
    switch (mode) {
      case 'closure':
        this.engine = new ParserEngine(closureGrammar)
    }
  }

  parse (text: string): ParseResult {
    return this.engine.parseText(text)
  }
}
