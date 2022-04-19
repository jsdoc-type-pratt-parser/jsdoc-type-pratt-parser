import { createFunctionParslet } from '../src/parslets/FunctionParslet'
import { Lexer } from '../src/lexer/Lexer'
import { expect } from 'chai'
import { Parser } from '../src/Parser'
import { createParameterListParslet } from '../src/parslets/ParameterListParslet'
import { createNameParslet } from '../src/parslets/NameParslet'
import { createObjectParslet } from '../src/parslets/ObjectParslet'
import { parenthesisParslet } from '../src/parslets/ParenthesisParslet'

describe('ParameterListParslet', () => {
  it('rethrows errors', () => {
    const parser = new Parser(
      [
        createFunctionParslet({
          allowWithoutParenthesis: false,
          allowNamedParameters: undefined,
          allowNoReturnType: true
        }),
        createParameterListParslet({
          allowTrailingComma: false
        }),
        createNameParslet({
          allowedAdditionalTokens: []
        }),
        createObjectParslet({
          allowKeyTypes: false,
          objectFieldGrammar: []
        }),
        parenthesisParslet
      ],
      Lexer.create('function(a, b, ")')
    )
    expect(() => {
      parser.parse()
    }).to.throw('Unterminated String')
  })
})
