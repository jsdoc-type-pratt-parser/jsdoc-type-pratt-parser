import { InfixParslet } from './Parslet'
import { ParserEngine } from '../ParserEngine'
import { ParseResult } from '../ParseResult'
import { TokenType } from '../lexer/Token'
import { Precedence } from './Precedence'

export class UnenclosedUnionParslet implements InfixParslet {
  accepts (type: TokenType): boolean {
    return type === '|'
  }

  getPrecedence (): number {
    return Precedence.UNION
  }

  parse (parser: ParserEngine, left: ParseResult): ParseResult {
    parser.consume('|')

    const elements = []
    do {
      elements.push(parser.parseType(Precedence.UNION))
    } while (parser.consume('|'))

    return {
      type: 'UNION',
      elements: [left, ...elements]
    }
  }
}
