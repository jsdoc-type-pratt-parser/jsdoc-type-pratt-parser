import { InfixParslet, PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { NonTerminalResult, ParseResult, VariadicResult } from '../ParseResult'
import { Precedence } from './Precedence'
import { assertTerminal } from '../assertTypes'

export class VariadicParslet implements PrefixParslet, InfixParslet {
  accepts (type: TokenType): boolean {
    return type === '...'
  }

  getPrecedence (): Precedence {
    return Precedence.PREFIX
  }

  parsePrefix (parser: ParserEngine): VariadicResult<ParseResult> {
    parser.consume('...')

    const brackets = parser.consume('[')
    const value = parser.tryParseType(Precedence.PREFIX)
    if (brackets && !parser.consume(']')) {
      throw new Error('Unterminated variadic type. Missing \']\'')
    }

    if (value !== undefined) {
      return {
        type: 'VARIADIC',
        element: assertTerminal(value),
        meta: {
          position: 'PREFIX',
          squareBrackets: brackets
        }
      }
    } else {
      return {
        type: 'VARIADIC',
        meta: {
          position: 'ONLY_DOTS',
          squareBrackets: false
        }
      }
    }
  }

  parseInfix (parser: ParserEngine, left: NonTerminalResult): ParseResult {
    parser.consume('...')
    return {
      type: 'VARIADIC',
      element: assertTerminal(left),
      meta: {
        position: 'SUFFIX',
        squareBrackets: false
      }
    }
  }
}
