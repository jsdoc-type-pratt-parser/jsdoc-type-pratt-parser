import { PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { Precedence } from '../Precedence'
import { StringValueResult } from '../result/TerminalResult'

export class StringValueParslet implements PrefixParslet {
  accepts (type: TokenType): boolean {
    return type === 'StringValue'
  }

  getPrecedence (): Precedence {
    return Precedence.PREFIX
  }

  parsePrefix (parser: ParserEngine): StringValueResult {
    const token = parser.getToken()
    parser.consume('StringValue')
    return {
      type: 'STRING_VALUE',
      value: token.text.slice(1, -1),
      meta: {
        quote: token.text[0] as '\'' | '"'
      }
    }
  }
}
