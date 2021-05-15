import { InfixParslet } from './Parslet'
import { ParserEngine } from '../ParserEngine'
import { NonTerminalResult, ParseResult } from '../ParseResult'
import { TokenType } from '../lexer/Token'
import { Precedence } from '../Precedence'
import { assertTerminal } from '../assertTypes'

export class IntersectionParslet implements InfixParslet {
  accepts (type: TokenType): boolean {
    return type === '&'
  }

  getPrecedence (): Precedence {
    return Precedence.INTERSECTION
  }

  parseInfix (parser: ParserEngine, left: NonTerminalResult): ParseResult {
    parser.consume('&')

    const elements = []
    do {
      elements.push(parser.parseType(Precedence.INTERSECTION))
    } while (parser.consume('&'))

    return {
      type: 'INTERSECTION',
      elements: [assertTerminal(left), ...elements]
    }
  }
}
