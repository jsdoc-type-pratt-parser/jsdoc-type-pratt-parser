import { InfixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { Precedence } from './Precedence'
import { ParserEngine } from '../ParserEngine'
import { ParseResult } from '../ParseResult'

export class PropertyPathParslet implements InfixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === '.' && next !== '<'
  }

  getPrecedence (): number {
    return Precedence.POSTFIX
  }

  parse (parser: ParserEngine, left: ParseResult): ParseResult {
    parser.consume('.')
    const path = []
    const allowed: TokenType[] = ['Identifier', 'Number', 'StringValue']
    let next
    do {
      const token = parser.getToken()
      if (!allowed.includes(token.type)) {
        throw new Error(`The token type '${token.type}' is not allowed in a property path.`)
      }
      path.push(token.text)
      parser.consume(token.type)
      next = parser.peekToken()
    } while (next.type !== '<' && parser.consume('.'))
    return {
      type: 'PROPERTY_PATH',
      left,
      path
    }
  }
}
