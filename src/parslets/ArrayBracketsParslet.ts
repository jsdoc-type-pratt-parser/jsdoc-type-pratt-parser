import { InfixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { IntermediateResult, ParserEngine } from '../ParserEngine'
import { ParseResult } from '../ParseResult'
import { Precedence } from '../Precedence'
import { assertTerminal } from '../assertTypes'

export class ArrayBracketsParslet implements InfixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === '[' && next === ']'
  }

  getPrecedence (): Precedence {
    return Precedence.ARRAY_BRACKETS
  }

  parseInfix (parser: ParserEngine, left: IntermediateResult): ParseResult {
    parser.consume('[')
    parser.consume(']')
    return {
      type: 'GENERIC',
      left: {
        type: 'NAME',
        value: 'Array',
        meta: {
          reservedWord: false
        }
      },
      elements: [
        assertTerminal(left)
      ],
      meta: {
        brackets: '[]',
        dot: false
      }
    }
  }
}
