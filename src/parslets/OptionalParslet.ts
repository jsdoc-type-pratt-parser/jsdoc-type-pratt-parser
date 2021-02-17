import { InfixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { NonTerminalResult, ParseResult } from '../ParseResult'
import { Precedence } from './Precedence'
import { assertTerminal } from '../assertTypes'

export class OptionalParslet implements InfixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === '=' && next !== '>'
  }

  getPrecedence (): Precedence {
    return Precedence.OPTIONAL
  }

  parseInfix (parser: ParserEngine, left: NonTerminalResult): ParseResult {
    parser.consume('=')
    const result = assertTerminal(left)
    result.optional = true
    return result
  }
}
