import { composeParslet, ParsletFunction } from './Parslet'
import { Precedence } from '../Precedence'
import { assertTerminal } from '../assertTypes'
import { NoParsletFoundError } from '../errors'

export function createVariadicParslet ({ allowPostfix, allowEnclosingBrackets }: {
  allowPostfix: boolean
  allowEnclosingBrackets: boolean
}): ParsletFunction {
  return composeParslet({
    name: 'variadicParslet',
    accept: type => type === '...',
    precedence: Precedence.PREFIX,
    parsePrefix: parser => {
      parser.consume('...')

      const brackets = allowEnclosingBrackets && parser.consume('[')

      try {
        const element = parser.parseType(Precedence.PREFIX)
        if (brackets && !parser.consume(']')) {
          throw new Error('Unterminated variadic type. Missing \']\'')
        }

        return {
          type: 'JsdocTypeVariadic',
          element: assertTerminal(element),
          meta: {
            position: 'prefix',
            squareBrackets: brackets
          }
        }
      } catch (e) {
        if (e instanceof NoParsletFoundError) {
          if (brackets) {
            throw new Error('Empty square brackets for variadic are not allowed.')
          }
          return {
            type: 'JsdocTypeVariadic',
            meta: {
              position: undefined,
              squareBrackets: false
            }
          }
        } else {
          throw e
        }
      }
    },
    parseInfix: allowPostfix
      ? (parser, left) => {
          parser.consume('...')
          return {
            type: 'JsdocTypeVariadic',
            element: assertTerminal(left),
            meta: {
              position: 'suffix',
              squareBrackets: false
            }
          }
        }
      : undefined
  })
}
