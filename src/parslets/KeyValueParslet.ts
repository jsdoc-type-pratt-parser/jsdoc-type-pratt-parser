import { composeParslet, ParsletFunction } from './Parslet'
import { Precedence } from '../Precedence'
import { assertRootResult } from '../assertTypes'
import { UnexpectedTypeError } from '../errors'

export function createKeyValueParslet ({ allowKeyTypes, allowReadonly, allowOptional }: {
  allowKeyTypes: boolean
  allowOptional: boolean
  allowReadonly: boolean
}): ParsletFunction {
  return composeParslet({
    name: 'keyValueParslet',
    precedence: Precedence.KEY_VALUE,
    accept: type => type === ':',
    parseInfix: (parser, left) => {
      let optional = false
      let readonlyProperty = false

      if (allowOptional && left.type === 'JsdocTypeNullable') {
        optional = true
        left = left.element
      }

      if (allowReadonly && left.type === 'JsdocTypeReadonlyProperty') {
        readonlyProperty = true
        left = left.element
      }

      // object parslet uses a special grammar and for the value we want to switch back to the parent
      const parentParser = parser.parent ?? parser
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
          type: 'JsdocTypeKeyValue',
          key: left.value.toString(),
          right: right,
          optional: optional,
          readonly: readonlyProperty,
          meta: {
            quote,
            hasLeftSideExpression: false
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
          type: 'JsdocTypeKeyValue',
          left: assertRootResult(left),
          right: right,
          meta: {
            hasLeftSideExpression: true
          }
        }
      }
    }
  })
}
