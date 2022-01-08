import { ParsletFunction } from './Parslet'
import { Precedence } from '../Precedence'
import { isQuestionMarkUnknownType } from './isQuestionMarkUnkownType'
import { assertTerminal } from '../assertTypes'

export const nullableParslet: ParsletFunction = (parser, precedence, left) => {
  const type = parser.getLexer().token().type
  const next = parser.getLexer().peek().type

  const accept = ((left == null) && type === '?' && !isQuestionMarkUnknownType(next)) ||
    ((left != null) && type === '?')

  if (!accept) {
    return null
  }

  parser.consume('?')

  if (left == null) {
    return {
      type: 'JsdocTypeNullable',
      element: parser.parseType(Precedence.NULLABLE),
      meta: {
        position: 'prefix'
      }
    }
  } else {
    return {
      type: 'JsdocTypeNullable',
      element: assertTerminal(left),
      meta: {
        position: 'suffix'
      }
    }
  }
}
