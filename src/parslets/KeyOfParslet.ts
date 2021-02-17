import { PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { KeyOfResult, ParseResult } from '../ParseResult'
import { Precedence } from './Precedence'
import { assertTerminal } from '../assertTypes'

export class KeyOfParslet implements PrefixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === 'keyof'
  }

  getPrecedence (): Precedence {
    return Precedence.KEY_OF_TYPE_OF
  }

  parsePrefix (parser: ParserEngine): ParseResult {
    parser.consume('keyof')
    const result: KeyOfResult = {
      type: 'KEY_OF'
    }
    const value = parser.tryParseType(Precedence.KEY_OF_TYPE_OF)
    if (value !== undefined) {
      result.value = assertTerminal(value)
    }
    return result
  }
}
