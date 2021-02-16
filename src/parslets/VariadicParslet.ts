import { InfixParslet, PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { NonTerminalResult, ParseResult } from '../ParseResult'
import { Precedence } from './Precedence'
import { assertTerminal } from '../assertTerminal'

export class VariadicParslet implements PrefixParslet, InfixParslet {
  accepts (type: TokenType): boolean {
    return type === '...'
  }

  getPrecedence (): Precedence {
    return Precedence.PREFIX
  }

  parsePrefix (parser: ParserEngine): ParseResult {
    parser.consume('...')
    const shouldClose = parser.consume('[')
    const value = parser.parseType(Precedence.PREFIX)
    if (shouldClose && !parser.consume(']')) {
      throw new Error('Unterminated variadic type. Missing \']\'')
    }
    value.repeatable = true
    return value
  }

  parseInfix (parser: ParserEngine, left: NonTerminalResult): ParseResult {
    parser.consume('...')
    const result = assertTerminal(left)
    result.repeatable = true
    return result
  }
}
