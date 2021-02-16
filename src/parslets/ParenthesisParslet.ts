import { PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { Precedence } from './Precedence'
import { ParserEngine } from '../ParserEngine'
import { NonTerminalResult } from '../ParseResult'

export class ParenthesisParslet implements PrefixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === '(' && next !== ')'
  }

  getPrecedence (): Precedence {
    return Precedence.PARENTHESIS
  }

  parsePrefix (parser: ParserEngine): NonTerminalResult {
    parser.consume('(')
    const result = parser.parseNonTerminalType(Precedence.ALL)
    if (!parser.consume(')')) {
      throw new Error('Unterminated parenthesis')
    }
    return result
  }
}
