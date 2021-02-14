import { PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { Precedence } from './Precedence'
import { ParserEngine } from '../ParserEngine'
import { ParseResult } from '../ParseResult'

export class ParenthesisParslet implements PrefixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === '('
  }

  getPrecedence (): number {
    return Precedence.PREFIX
  }

  parse (parser: ParserEngine): ParseResult {
    parser.consume('(')
    const result = parser.parseType(Precedence.PREFIX)
    if (!parser.consume(')')) {
      throw new Error('Unterminated parenthesis')
    }
    return result
  }
}
