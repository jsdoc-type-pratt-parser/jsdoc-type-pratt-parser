import { InfixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { Precedence } from './Precedence'
import { ParserEngine } from '../ParserEngine'
import { NonTerminalResult } from '../ParseResult'
import { assertTerminal } from '../assertTerminal'

export class KeyValueParslet implements InfixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === ':'
  }

  getPrecedence (): number {
    return Precedence.KEY_VALUE
  }

  parse (parser: ParserEngine, left: NonTerminalResult): NonTerminalResult {
    parser.consume(':')
    const value = parser.parseType(Precedence.KEY_VALUE)
    return {
      type: 'KEY_VALUE',
      key: left.type === 'NUMBER' ? left : assertTerminal(left),
      value: value
    }
  }
}
