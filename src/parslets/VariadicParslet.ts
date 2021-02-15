import { InfixParslet, PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { NonTerminalResult, ParseResult } from '../ParseResult'
import { Precedence } from './Precedence'
import { assertTerminal } from '../assertTerminal'

export class VariadicParslet implements PrefixParslet {
  accepts (type: TokenType): boolean {
    return type === '...'
  }

  getPrecedence (): number {
    return Precedence.PREFIX
  }

  parse (parser: ParserEngine): ParseResult {
    parser.consume('...')
    const shouldClose = parser.consume('[')
    const value = parser.parseType(Precedence.PREFIX)
    if (shouldClose && !parser.consume(']')) {
      throw new Error('Unterminated variadic type. Missing \']\'')
    }
    value.repeatable = true
    return value
  }
}

export class PostfixVariadicParslet implements InfixParslet {
  accepts (type: TokenType): boolean {
    return type === '...'
  }

  getPrecedence (): number {
    return Precedence.POSTFIX
  }

  parse (parser: ParserEngine, left: NonTerminalResult): ParseResult {
    parser.consume('...')
    const result = assertTerminal(left)
    result.repeatable = true
    return result
  }
}
