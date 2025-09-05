import { composeParslet, type ParsletFunction } from './Parslet'
import type { TokenType } from '../lexer/Token'
import { Precedence } from '../Precedence'
import { Parser } from '../Parser'
import type { SpecialNamePath, SpecialNamePathType } from '../result/RootResult'
import { assertRootResult } from '../assertTypes'
import type { Grammar } from '../grammars/Grammar'

export function createSpecialNamePathParslet ({ pathGrammar, allowedTypes }: {
  allowedTypes: SpecialNamePathType[]
  pathGrammar: Grammar
}): ParsletFunction {
  return composeParslet({
    name: 'specialNamePathParslet',
    accept: type => (allowedTypes as TokenType[]).includes(type),
    parsePrefix: parser => {
      const type = parser.lexer.current.type as SpecialNamePathType
      parser.consume(type)

      if (!parser.consume(':')) {
        return {
          type: 'JsdocTypeName',
          value: type
        }
      }

      let result: SpecialNamePath

      let token = parser.lexer.current
      if (parser.consume('StringValue')) {
        result = {
          type: 'JsdocTypeSpecialNamePath',
          value: token.text.slice(1, -1),
          specialType: type,
          meta: {
            quote: token.text.startsWith('\'') ? 'single' : 'double'
          }
        }
      } else {
        let value = ''
        const allowed: TokenType[] = ['Identifier', '@', '/']
        while (allowed.some(type => parser.consume(type))) {
          value += token.text
          token = parser.lexer.current
        }
        result = {
          type: 'JsdocTypeSpecialNamePath',
          value,
          specialType: type,
          meta: {
            quote: undefined
          }
        }
      }

      const moduleParser = new Parser(pathGrammar, parser.lexer, parser)
      const moduleResult = moduleParser.parseInfixIntermediateType(result, Precedence.ALL)
      parser.acceptLexerState(moduleParser)

      return assertRootResult(moduleResult)
    }
  })
}
