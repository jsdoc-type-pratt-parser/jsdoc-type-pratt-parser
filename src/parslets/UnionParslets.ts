import { InfixParslet } from './Parslet'
import { ParserEngine } from '../ParserEngine'
import { NonTerminalResult, ParseResult } from '../ParseResult'
import { TokenType } from '../lexer/Token'
import { Precedence } from '../Precedence'
import { assertTerminal } from '../assertTypes'

export class UnenclosedUnionParslet implements InfixParslet {
  accepts (type: TokenType): boolean {
    return type === '|'
  }

  getPrecedence (): Precedence {
    return Precedence.UNION
  }

  parseInfix (parser: ParserEngine, left: NonTerminalResult): ParseResult {
    parser.consume('|')

    const elements = []
    do {
      elements.push(parser.parseType(Precedence.UNION))
    } while (parser.consume('|'))

    return {
      type: 'UNION',
      elements: [assertTerminal(left), ...elements]
    }
  }
}
