import { InfixParslet, PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { NonTerminalResult, ParseResult } from '../ParseResult'
import { Precedence } from '../Precedence'
import { assertTerminal } from '../assertTypes'

export class OptionalParslet implements PrefixParslet, InfixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === '='
  }

  getPrecedence (): Precedence {
    return Precedence.OPTIONAL
  }

  parsePrefix (parser: ParserEngine): ParseResult {
    parser.consume('=')
    return {
      type: 'OPTIONAL',
      element: parser.parseType(Precedence.OPTIONAL),
      meta: {
        position: 'PREFIX'
      }
    }
  }

  parseInfix (parser: ParserEngine, left: NonTerminalResult): ParseResult {
    parser.consume('=')
    return {
      type: 'OPTIONAL',
      element: assertTerminal(left),
      meta: {
        position: 'SUFFIX'
      }
    }
  }
}
