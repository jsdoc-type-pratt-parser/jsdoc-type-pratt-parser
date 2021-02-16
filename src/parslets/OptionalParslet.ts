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
    return Precedence.OPTIONAL
  }

  parse (parser: ParserEngine, left: NonTerminalResult): ParseResult {
    parser.consume('=')
    const result = assertTerminal(left)
    result.optional = true
    return result
  }
}
