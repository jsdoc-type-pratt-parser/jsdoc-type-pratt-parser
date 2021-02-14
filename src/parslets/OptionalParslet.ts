import { InfixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { NonTerminalResult, ParseResult } from '../ParseResult'
import { Precedence } from './Precedence'
import { assertTerminal } from '../assertTerminal'

export class OptionalParslet implements InfixParslet {
  accepts (type: TokenType): boolean {
    return type === '='
  }

  getPrecedence (): number {
    return Precedence.POSTFIX
  }

  parse (parser: ParserEngine, left: NonTerminalResult): ParseResult {
    parser.consume('=')
    left.optional = true
    return assertTerminal(left)
  }
}
