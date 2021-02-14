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
    return Precedence.POSTFIX
  }

  parse (parser: ParserEngine, left: NonTerminalResult): NonTerminalResult {
    parser.consume(':')
    const value = parser.parseType(Precedence.POSTFIX)
    return {
      type: 'KEY_VALUE',
      key: assertTerminal(left),
      value: value
    }
  }
}
