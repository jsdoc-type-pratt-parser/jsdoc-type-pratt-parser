import { composeParslet, ParsletFunction } from './Parslet'
import { Precedence } from '../Precedence'
import { UnexpectedTypeError } from '../errors'
import { assertRootResult } from '../assertTypes'

export function createObjectFieldParslet ({ allowKeyTypes, allowReadonly, allowOptional, allowVariadic }: {
  allowKeyTypes: boolean
  allowOptional: boolean
  allowReadonly: boolean
  allowVariadic: boolean
}): ParsletFunction {
  return composeParslet({
    name: 'objectFieldParslet',
    precedence: Precedence.KEY_VALUE,
    accept: type => type === ':',
    parseInfix: (parser, left) => {
      let optional = false
      let readonlyProperty = false
      let variadic = false

      if (allowOptional && left.type === 'JsdocTypeNullable') {
        optional = true
        left = left.element
      }

      if (allowReadonly && left.type === 'JsdocTypeReadonlyProperty') {
        readonlyProperty = true
        left = left.element
      }

      if (allowVariadic && left.type === 'JsdocTypeVariadic' && left.element !== undefined) {
        variadic = true
        left = left.element
      }

      // object parslet uses a special grammar and for the value we want to switch back to the parent
      const parentParser = parser.baseParser ?? parser
      parentParser.acceptLexerState(parser)

      if (left.type === 'JsdocTypeNumber' || left.type === 'JsdocTypeName' || left.type === 'JsdocTypeStringValue') {
        parentParser.consume(':')

        let quote
        if (left.type === 'JsdocTypeStringValue') {
          quote = left.meta.quote
        }

        const right = parentParser.parseType(Precedence.KEY_VALUE)
        parser.acceptLexerState(parentParser)

        return {
          type: 'JsdocTypeObjectField',
          key: left.value.toString(),
          right,
          optional,
          readonly: readonlyProperty,
          variadic,
          meta: {
            quote
          }
        }
      } else {
        if (!allowKeyTypes) {
          throw new UnexpectedTypeError(left)
        }

        parentParser.consume(':')

        const right = parentParser.parseType(Precedence.KEY_VALUE)
        parser.acceptLexerState(parentParser)

        return {
          type: 'JsdocTypeJsdocObjectField',
          left: assertRootResult(left),
          right: right
        }
      }
    }
  })
}
