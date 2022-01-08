import { composeParslet } from './Parslet'
import { Precedence } from '../Precedence'
import { assertTerminal } from '../assertTypes'

export const optionalParslet = composeParslet({
  name: 'optionalParslet',
  accept: type => type === '=',
  precedence: Precedence.OPTIONAL,
  parsePrefix: parser => {
    parser.consume('=')
    return {
      type: 'JsdocTypeOptional',
      element: parser.parseType(Precedence.OPTIONAL),
      meta: {
        position: 'prefix'
      }
    }
  },
  parseInfix: (parser, left) => {
    parser.consume('=')
    return {
      type: 'JsdocTypeOptional',
      element: assertTerminal(left),
      meta: {
        position: 'suffix'
      }
    }
  }
})
