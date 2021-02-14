import { InfixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { ParseResult } from '../ParseResult'
import { Precedence } from './Precedence'

export class ArrayBracketsParslet implements InfixParslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === '[' && next === ']'
  }

  getPrecedence (): number {
    return Precedence.ARRAY_BRACKETS
  }

  parse (parser: ParserEngine, left: ParseResult): ParseResult {
    parser.consume('[')
    parser.consume(']')
    return {
      type: 'GENERIC',
      subject: {
        type: 'NAME',
        name: 'Array'
      },
      objects: [
        left
      ]
    }
  }
}
