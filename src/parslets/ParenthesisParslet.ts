import { PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { Precedence } from '../Precedence'
import { ParserEngine } from '../ParserEngine'
import { ParenthesisResult } from '../ParseResult'

export class ParenthesisParslet implements PrefixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === '('
  }

  getPrecedence (): Precedence {
    return Precedence.PARENTHESIS
  }

  parsePrefix (parser: ParserEngine): ParenthesisResult {
    parser.consume('(')
    const result = parser.tryParseType(Precedence.ALL)
    if (!parser.consume(')')) {
      throw new Error('Unterminated parenthesis')
    }
    return {
      type: 'PARENTHESIS',
      element: result // NOTE: this can only be non-terminal or undefined if it is a parameter list
    }
  }
}
