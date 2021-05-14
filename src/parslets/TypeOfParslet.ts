import { PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { TypeOfResult } from '../ParseResult'
import { Precedence } from '../Precedence'
import { assertTerminal } from '../assertTypes'

export class TypeOfParslet implements PrefixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === 'typeof'
  }

  getPrecedence (): Precedence {
    return Precedence.KEY_OF_TYPE_OF
  }

  parsePrefix (parser: ParserEngine): TypeOfResult {
    parser.consume('typeof')
    return {
      type: 'TYPE_OF',
      element: assertTerminal(parser.parseType(Precedence.KEY_OF_TYPE_OF))
    }
  }
}
