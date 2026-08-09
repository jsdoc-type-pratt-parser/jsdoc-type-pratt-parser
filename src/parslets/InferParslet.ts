import { composeParslet } from './Parslet.js'
import { Precedence } from '../Precedence.js'
import { UnexpectedTypeError } from '../errors.js'

export const inferParslet = composeParslet({
  name: 'inferParslet',
  accept: type => type === 'infer',
  parsePrefix: parser => {
    parser.consume('infer')

    const element = parser.parseIntermediateType(Precedence.NULLABLE)
    if (element.type !== 'JsdocTypeName') {
      throw new UnexpectedTypeError(element, 'A typescript infer always has to have a name.')
    }

    return {
      type: 'JsdocTypeInfer',
      element
    }
  }
})
