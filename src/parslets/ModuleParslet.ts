import { PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { Precedence } from '../Precedence'
import { ParserEngine } from '../ParserEngine'
import { ParseResult } from '../ParseResult'

export class ModuleParslet implements PrefixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === 'module'
  }

  getPrecedence (): Precedence {
    return Precedence.PREFIX
  }

  parsePrefix (parser: ParserEngine): ParseResult {
    parser.consume('module')
    if (!parser.consume(':')) {
      throw new Error('module needs to have a \':\' afterwards.')
    }
    let token = parser.getToken()
    if (parser.consume('StringValue')) {
      return {
        type: 'MODULE',
        value: token.text.slice(1, -1),
        meta: {
          quote: token.text[0] as '\'' | '"'
        }
      }
    } else {
      let result = ''
      const allowed: TokenType[] = ['Identifier', '@', '/']
      while (allowed.some(type => parser.consume(type))) {
        result += token.text
        token = parser.getToken()
      }
      return {
        type: 'MODULE',
        value: result,
        meta: {
          quote: undefined
        }
      }
    }
  }
}
