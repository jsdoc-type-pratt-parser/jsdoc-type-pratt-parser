import { PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { ParseResult, RecordResult } from '../ParseResult'
import { Precedence } from './Precedence'

export class RecordParslet implements PrefixParslet {
  accepts (type: TokenType): boolean {
    return type === '{'
  }

  getPrecedence (): number {
    return Precedence.PREFIX
  }

  parse (parser: ParserEngine): ParseResult {
    parser.consume('{')
    const result: RecordResult = {
      type: 'RECORD',
      fields: []
    }

    if (!parser.consume('}')) {
      do {
        const field = parser.parseNonTerminalType(Precedence.PREFIX)
        if (field.type !== 'NAME' && field.type !== 'NUMBER' && field.type !== 'KEY_VALUE') {
          throw new Error('records may only contain \'NAME\', \'NUMBER\' or \'KEY_VALUE\' fields.')
        }

        result.fields.push(field)
      } while (parser.consume(','))
      if (!parser.consume('}')) {
        throw new Error('Unterminated record type. Missing \'}\'')
      }
    }
    return result
  }
}
