import { PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { Precedence } from '../Precedence'
import { ParameterList, ParserEngine } from '../ParserEngine'
import { ParenthesisResult } from '../ParseResult'
import { assertTerminal } from '../assertTypes'

export class ParenthesisParslet implements PrefixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === '('
  }

  getPrecedence (): Precedence {
    return Precedence.PARENTHESIS
  }

  parsePrefix (parser: ParserEngine): ParenthesisResult | ParameterList {
    parser.consume('(')
    const result = parser.tryParseType(Precedence.ALL)
    if (!parser.consume(')')) {
      throw new Error('Unterminated parenthesis')
    }
    if (result === undefined) {
      return {
        type: 'PARAMETER_LIST',
        elements: []
      }
    } else if (result.type === 'PARAMETER_LIST') {
      return result
    } else if (result.type === 'KEY_VALUE') {
      return {
        type: 'PARAMETER_LIST',
        elements: [result]
      }
    }
    return {
      type: 'PARENTHESIS',
      element: assertTerminal(result)
    }
  }
}
