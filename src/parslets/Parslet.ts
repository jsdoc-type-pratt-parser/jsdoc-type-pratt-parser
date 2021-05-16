import { TokenType } from '../lexer/Token'
import { IntermediateResult, ParserEngine } from '../ParserEngine'
import { Precedence } from '../Precedence'

export interface Parslet {
  accepts: (type: TokenType, next: TokenType) => boolean
  getPrecedence: () => Precedence
}

export interface PrefixParslet extends Parslet {
  parsePrefix: (parser: ParserEngine) => IntermediateResult
}

export interface InfixParslet extends Parslet {
  parseInfix: (parser: ParserEngine, left: IntermediateResult) => IntermediateResult
}
