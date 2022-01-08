import { composeParslet } from './Parslet'
import { Precedence } from '../Precedence'
import { assertPlainKeyValueOrName } from '../assertTypes'
import { getParameters } from './FunctionParslet'

export const arrowFunctionParslet = composeParslet({
  name: 'arrowFunctionParslet',
  precedence: Precedence.ARROW,
  accept: type => type === '=>',
  parseInfix: (parser, left) => {
    parser.consume('=>')
    return {
      type: 'JsdocTypeFunction',
      parameters: getParameters(left).map(assertPlainKeyValueOrName),
      arrow: true,
      parenthesis: true,
      returnType: parser.parseType(Precedence.ALL)
    }
  }
})
