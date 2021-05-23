import { PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { Precedence } from '../Precedence'
import { ParserEngine } from '../ParserEngine'
import { NonTerminalResult } from '../result/NonTerminalResult'

export class NumberParslet implements PrefixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === 'Number'
  }

  getPrecedence (): Precedence {
    return Precedence.PREFIX
  }

  parsePrefix (parser: ParserEngine): NonTerminalResult {
    const token = parser.getToken()
    parser.consume('Number')
    return {
      type: 'NUMBER',
      value: parseInt(token.text, 10)
    }
  }
}
