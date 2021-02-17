import { PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { ParseResult, TypeOfResult } from '../ParseResult'
import { Precedence } from './Precedence'
import { assertTerminal } from '../assertTypes'

export class TypeOfParslet implements PrefixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === 'typeof'
  }

  getPrecedence (): Precedence {
    return Precedence.KEY_OF_TYPE_OF
  }

  parsePrefix (parser: ParserEngine): ParseResult {
    parser.consume('typeof')
    const result: TypeOfResult = {
      type: 'TYPE_OF'
    }
    const value = parser.tryParseType(Precedence.KEY_OF_TYPE_OF)
    if (value !== undefined) {
      result.value = assertTerminal(value)
    }
    return result
  }
}
