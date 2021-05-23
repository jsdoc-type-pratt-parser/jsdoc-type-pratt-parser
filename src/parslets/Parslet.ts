import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { Precedence } from '../Precedence'
import { IntermediateResult } from '../result/IntermediateResult'

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
