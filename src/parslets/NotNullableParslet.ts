import { InfixParslet, PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { NonTerminalResult, ParseResult } from '../ParseResult'
import { Precedence } from './Precedence'
import { assertTerminal } from '../assertTypes'

export class NotNullableParslet implements PrefixParslet, InfixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === '!'
  }

  getPrecedence (): Precedence {
    return Precedence.NULLABLE
  }

  parsePrefix (parser: ParserEngine): ParseResult {
    parser.consume('!')
    return {
      type: 'NOT_NULLABLE',
      element: parser.parseType(Precedence.NULLABLE),
      meta: {
        position: 'PREFIX'
      }
    }
  }

  parseInfix (parser: ParserEngine, left: NonTerminalResult): ParseResult {
    parser.consume('!')
    return {
      type: 'NOT_NULLABLE',
      element: assertTerminal(left),
      meta: {
        position: 'SUFFIX'
      }
    }
  }
}
