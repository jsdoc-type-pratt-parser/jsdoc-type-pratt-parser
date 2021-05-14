import { PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { KeyOfResult } from '../ParseResult'
import { Precedence } from '../Precedence'
import { assertTerminal } from '../assertTypes'

export class KeyOfParslet implements PrefixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === 'keyof'
  }

  getPrecedence (): Precedence {
    return Precedence.KEY_OF_TYPE_OF
  }

  parsePrefix (parser: ParserEngine): KeyOfResult {
    parser.consume('keyof')
    return {
      type: 'KEY_OF',
      element: assertTerminal(parser.parseType(Precedence.KEY_OF_TYPE_OF))
    }
  }
}
