import { PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { Parser } from '../Parser'
import { Precedence } from '../Precedence'
import { UnexpectedTypeError } from '../errors'
import { ObjectResult, TerminalResult } from '../result/TerminalResult'
import { Grammar } from '../grammars/Grammar'

interface ObjectParsletOptions {
  objectFieldGrammar: Grammar
  allowKeyTypes: boolean
}

export class ObjectParslet implements PrefixParslet {
  private readonly objectFieldGrammar: Grammar
  private readonly allowKeyTypes: boolean

  constructor ({ objectFieldGrammar, allowKeyTypes }: ObjectParsletOptions) {
    this.objectFieldGrammar = objectFieldGrammar
    this.allowKeyTypes = allowKeyTypes
  }

  accepts (type: TokenType): boolean {
    return type === '{'
  }

  getPrecedence (): Precedence {
    return Precedence.OBJECT
  }

  parsePrefix (parser: Parser): TerminalResult {
    parser.consume('{')
    const result: ObjectResult = {
      type: 'JsdocTypeObject',
      meta: {
        separator: 'comma'
      },
      elements: []
    }

    if (!parser.consume('}')) {
      let separator: 'comma' | 'semicolon' | undefined

      const lexer = parser.getLexer()

      const fieldParser = new Parser({
        grammar: this.objectFieldGrammar,
        lexer: lexer,
        parent: parser
      })

      while (true) {
        let field = fieldParser.parseIntermediateType(Precedence.OBJECT)

        if (field === undefined && this.allowKeyTypes) {
          field = parser.parseIntermediateType(Precedence.OBJECT)
        }

        let optional = false
        if (field.type === 'JsdocTypeNullable') {
          optional = true
          field = field.element
        }

        if (field.type === 'JsdocTypeNumber' || field.type === 'JsdocTypeName' || field.type === 'JsdocTypeStringValue') {
          let quote
          if (field.type === 'JsdocTypeStringValue') {
            quote = field.meta.quote
          }

          result.elements.push({
            type: 'JsdocTypeKeyValue',
            key: field.value.toString(),
            right: undefined,
            optional: optional,
            readonly: false,
            meta: {
              quote,
              hasLeftSideExpression: false
            }
          })
        } else if (field.type === 'JsdocTypeKeyValue') {
          result.elements.push(field)
        } else {
          throw new UnexpectedTypeError(field)
        }
        if (parser.consume(',')) {
          separator = 'comma'
        } else if (parser.consume(';')) {
          separator = 'semicolon'
        } else {
          break
        }
      }

      result.meta.separator = separator ?? 'comma' // TODO: use undefined here

      if (!parser.consume('}')) {
        throw new Error('Unterminated record type. Missing \'}\'')
      }
    }
    return result
  }
}
