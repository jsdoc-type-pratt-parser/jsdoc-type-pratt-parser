import { PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { ParseResult } from '../ParseResult'
import { Precedence } from './Precedence'

export class StringValueParslet implements PrefixParslet {
  accepts (type: TokenType): boolean {
    return type === 'StringValue'
  }

  getPrecedence (): Precedence {
    return Precedence.PREFIX
  }

  parsePrefix (parser: ParserEngine): ParseResult {
    const token = parser.getToken()
    parser.consume('StringValue')
    return {
      type: 'STRING_VALUE',
      value: token.text.slice(1, -1),
      quote: token.text[0]
    }
  }
}
