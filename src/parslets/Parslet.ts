import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { ParseResult } from '../ParseResult'

export interface Parslet {
  accepts: (type: TokenType, next: TokenType) => boolean
  getPrecedence: () => number
}

export interface PrefixParslet extends Parslet {
  parse: (parser: ParserEngine) => ParseResult
}

export interface InfixParslet extends Parslet {
  parse: (parser: ParserEngine, left: ParseResult) => ParseResult
}
