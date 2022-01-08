import { assertPlainKeyValue, assertTerminal } from '../assertTypes'
import { composeParslet, ParsletFunction } from './Parslet'
import { Precedence } from '../Precedence'
import { TupleResult } from '../result/TerminalResult'
import { IntermediateResult } from '../result/IntermediateResult'

export function createTupleParslet ({ allowQuestionMark }: {
  allowQuestionMark: boolean
}): ParsletFunction {
  return composeParslet({
    name: 'tupleParslet',
    accept: type => type === '[',
    parsePrefix: parser => {
      parser.consume('[')
      const result: TupleResult = {
        type: 'JsdocTypeTuple',
        elements: []
      }

      if (parser.consume(']')) {
        return result
      }

      const typeList = parser.parseIntermediateType(Precedence.ALL)
      if (typeList.type === 'JsdocTypeParameterList') {
        if (typeList.elements[0].type === 'JsdocTypeKeyValue') {
          result.elements = typeList.elements.map(assertPlainKeyValue)
        } else {
          result.elements = typeList.elements.map(assertTerminal)
        }
      } else {
        if (typeList.type === 'JsdocTypeKeyValue') {
          result.elements = [assertPlainKeyValue(typeList)]
        } else {
          result.elements = [assertTerminal(typeList)]
        }
      }

      if (!parser.consume(']')) {
        throw new Error('Unterminated \'[\'')
      }

      if (!allowQuestionMark && result.elements.some((e: IntermediateResult) => e.type === 'JsdocTypeUnknown')) {
        throw new Error('Question mark in tuple not allowed')
      }

      return result
    }
  })
}
