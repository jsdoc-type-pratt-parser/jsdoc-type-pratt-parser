import { PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { NameResult, ParseResult, RecordResult } from '../ParseResult'
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
        let key: NameResult
        const token = parser.getToken()
        if (token.type === 'Number') {
          key = {
            type: 'NAME',
            name: token.text
          }
          parser.consume('Number')
        } else {
          const result = parser.parseType(Precedence.PREFIX)
          if (result.type !== 'NAME') {
            throw new Error('key of a record field must be a name or number expression')
          }
          key = result
        }

        let value
        if (parser.consume(':')) {
          value = parser.parseType(Precedence.PREFIX)
        }

        result.fields.push({
          type: 'FIELD',
          key,
          value
        })
      } while (parser.consume(','))
      if (!parser.consume('}')) {
        throw new Error('Unterminated record type. Missing \'}\'')
      }
    }
    return result
  }
}
