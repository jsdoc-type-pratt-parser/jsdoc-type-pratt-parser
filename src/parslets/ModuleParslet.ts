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
    let result = 'module:'
    const allowed: TokenType[] = ['Identifier', '@', '/']
    let token = parser.getToken()
    while (allowed.includes(token.type)) {
      result += token.text
      parser.consume(token.type)
      token = parser.getToken()
    }
    return {
      type: 'MODULE',
      value: result
    }
  }
}
