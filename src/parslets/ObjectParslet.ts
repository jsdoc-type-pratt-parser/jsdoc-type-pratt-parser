import { PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { ParseResult, ObjectResult } from '../ParseResult'
import { Precedence } from '../Precedence'
import { UnexpectedTypeError } from '../errors'

interface ObjectParsletOptions {
  allowKeyTypes: boolean
}

export class ObjectParslet implements PrefixParslet {
  private readonly allowKeyTypes: boolean

  constructor (opts: ObjectParsletOptions) {
    this.allowKeyTypes = opts.allowKeyTypes
  }

  accepts (type: TokenType): boolean {
    return type === '{'
  }

  getPrecedence (): Precedence {
    return Precedence.OBJECT
  }

  parsePrefix (parser: ParserEngine): ParseResult {
    parser.consume('{')
    const result: ObjectResult = {
      type: 'OBJECT',
      elements: []
    }

    if (!parser.consume('}')) {
      do {
        let field = parser.parseIntermediateType(Precedence.OBJECT)

        let optional = false
        if (field.type === 'NULLABLE') {
          optional = true
          field = field.element
        }

        if (field.type === 'NUMBER' || field.type === 'NAME' || field.type === 'STRING_VALUE') {
          let quote
          if (field.type === 'STRING_VALUE') {
            quote = field.meta.quote
          }

          result.elements.push({
            type: 'KEY_VALUE',
            value: field.value.toString(),
            right: undefined,
            optional: optional,
            meta: {
              quote
            }
          })
        } else if (field.type === 'KEY_VALUE' || field.type === 'JSDOC_OBJECT_KEY_VALUE') {
          result.elements.push(field)
        } else {
          throw new UnexpectedTypeError(field)
        }
      } while (parser.consume(','))
      if (!parser.consume('}')) {
        throw new Error('Unterminated record type. Missing \'}\'')
      }
    }
    return result
  }
}
