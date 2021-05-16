import { InfixParslet, PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { IntermediateResult, ParserEngine } from '../ParserEngine'
import { ParseResult } from '../ParseResult'
import { Precedence } from '../Precedence'
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

  parseInfix (parser: ParserEngine, left: IntermediateResult): ParseResult {
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
