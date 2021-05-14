import { PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { ParseResult } from '../ParseResult'
import { Precedence } from '../Precedence'
import { isQuestionMarkUnknownType } from './isQuestionMarkUnkownType'

export class SpecialTypesParslet implements PrefixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return (type === '?' && isQuestionMarkUnknownType(next)) || type === 'null' || type === 'undefined' || type === '*'
  }

  getPrecedence (): Precedence {
    return Precedence.SPECIAL_TYPES
  }

  parsePrefix (parser: ParserEngine): ParseResult {
    if (parser.consume('null')) {
      return {
        type: 'NULL'
      }
    }

    if (parser.consume('undefined')) {
      return {
        type: 'UNDEFINED'
      }
    }

    if (parser.consume('*')) {
      return {
        type: 'ANY'
      }
    }

    if (parser.consume('?')) {
      return {
        type: 'UNKNOWN'
      }
    }

    throw new Error('Unacceptable token: ' + parser.getToken().text)
  }
}
