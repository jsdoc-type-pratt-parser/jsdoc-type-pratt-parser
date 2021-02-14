import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { NonTerminalResult } from '../ParseResult'

export interface Parslet {
  accepts: (type: TokenType, next: TokenType) => boolean
  getPrecedence: () => number
}

export interface PrefixParslet extends Parslet {
  parse: (parser: ParserEngine) => NonTerminalResult
}

export interface InfixParslet extends Parslet {
  parse: (parser: ParserEngine, left: NonTerminalResult) => NonTerminalResult
}
