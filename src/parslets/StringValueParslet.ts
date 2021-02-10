import { PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { Parser } from '../Parser'
import { ParseResult } from '../ParseResult'
import { Precedence } from './Precedence'

export class StringValueParslet implements PrefixParslet {
  accepts (type: TokenType): boolean {
    return type === 'StringValue'
  }

  getPrecedence (): number {
    return Precedence.PREFIX
  }

  parse (parser: Parser): ParseResult {
    const token = parser.getToken()
    parser.consume('StringValue')
    return {
      type: 'STRING_VALUE',
      value: token.text.slice(1, -1)
    }
  }
}
