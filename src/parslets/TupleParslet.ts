import { assertTerminal } from '../assertTypes'
import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { TupleResult } from '../ParseResult'
import { PrefixParslet } from './Parslet'
import { Precedence } from '../Precedence'

export class TupleParslet implements PrefixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === '['
  }

  getPrecedence (): Precedence {
    return Precedence.TUPLE
  }

  parsePrefix (parser: ParserEngine): TupleResult {
    parser.consume('[')
    const result: TupleResult = {
      type: 'TUPLE',
      elements: []
    }
    if (!parser.consume(']')) {
      const typeList = parser.parseNonTerminalType(Precedence.ALL)
      if (typeList.type === 'PARAMETER_LIST') {
        result.elements = typeList.elements.map(assertTerminal)
      } else {
        result.elements = [assertTerminal(typeList)]
      }
      if (!parser.consume(']')) {
        throw new Error('Unterminated \'[\'')
      }
    }
    return result
  }
}
