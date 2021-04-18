import { InfixParslet, PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { NonTerminalResult, ParseResult } from '../ParseResult'
import { Precedence } from './Precedence'
import { isQuestionMarkUnknownType } from './isQuestionMarkUnkownType'
import { assertTerminal } from '../assertTypes'

export class NullablePrefixParslet implements PrefixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === '?' && !isQuestionMarkUnknownType(next)
  }

  getPrecedence (): Precedence {
    return Precedence.NULLABLE
  }

  parsePrefix (parser: ParserEngine): ParseResult {
    parser.consume('?')
    return {
      type: 'NULLABLE',
      element: parser.parseType(Precedence.NULLABLE),
      meta: {
        position: 'PREFIX'
      }
    }
  }
}

export class NullableInfixParslet implements InfixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === '?'
  }

  getPrecedence (): Precedence {
    return Precedence.NULLABLE
  }

  parseInfix (parser: ParserEngine, left: NonTerminalResult): ParseResult {
    parser.consume('?')
    return {
      type: 'NULLABLE',
      element: assertTerminal(left),
      meta: {
        position: 'SUFFIX'
      }
    }
  }
}
