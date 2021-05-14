import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { NonTerminalResult } from '../ParseResult'
import { Precedence } from '../Precedence'

export interface Parslet {
  accepts: (type: TokenType, next: TokenType) => boolean
  getPrecedence: () => Precedence
}

export interface PrefixParslet extends Parslet {
  parsePrefix: (parser: ParserEngine) => NonTerminalResult
}

export interface InfixParslet extends Parslet {
  parseInfix: (parser: ParserEngine, left: NonTerminalResult) => NonTerminalResult
}
