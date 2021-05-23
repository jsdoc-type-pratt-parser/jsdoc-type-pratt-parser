import { PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { Precedence } from '../Precedence'
import { assertTerminal } from '../assertTypes'
import { ParserEngine } from '../ParserEngine'
import { ParenthesisResult } from '../result/TerminalResult'
import { ParameterList } from '../result/IntermediateResult'

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
        type: 'JsdocTypeParameterList',
        elements: []
      }
    } else if (result.type === 'JsdocTypeParameterList') {
      return result
    } else if (result.type === 'JsdocTypeKeyValue' && 'value' in result) {
      return {
        type: 'JsdocTypeParameterList',
        elements: [result]
      }
    }
    return {
      type: 'JsdocTypeParenthesis',
      element: assertTerminal(result)
    }
  }
}
