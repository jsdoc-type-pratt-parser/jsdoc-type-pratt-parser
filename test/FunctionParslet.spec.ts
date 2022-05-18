import { expect } from 'chai'
import { jsdocGrammar } from '../src/grammars/jsdocGrammar'
import { createFunctionParslet } from '../src/parslets/FunctionParslet'
import { Parser } from '../src/Parser'
import { Lexer } from '../src/lexer/Lexer'

function parse (text: string): void {
  // Replace other function parslet with one setting
  //   `allowNamedParameters: undefined`
  const grammar = [
    ...jsdocGrammar.filter(p => p.name !== 'functionParslet'),
    createFunctionParslet({
      allowWithoutParenthesis: true,
      allowNamedParameters: undefined,
      allowNoReturnType: true,
      allowNewAsFunctionKeyword: false
    })
  ]
  const parser = new Parser(grammar, Lexer.create(text))
  parser.parse()
}

describe('`createFunctionParslet`', () => {
  it('Errs with named parameter`', () => {
    expect(() => {
      parse('function(someName: string)')
    }).to.throw('No parameter should be named')
  })

  it('Works with unnamed parameters`', () => {
    expect(() => {
      parse('function(someName)')
    }).not.to.throw()
  })
})
