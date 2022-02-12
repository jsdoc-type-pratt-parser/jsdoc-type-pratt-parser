import { expect } from 'chai'

import { specialTypesParslet } from '../src/parslets/SpecialTypesParslet'
import { Parser } from '../src/Parser'
import { Precedence } from '../src/Precedence'
import { typescriptGrammar } from '../src/grammars/typescriptGrammar'

class BadParser extends Parser {
  consume (): boolean {
    return false
  }
}

describe('specialTypesParslet', () => {
  it('Errs with bad parser `consume()`', () => {
    expect(() => {
      const parser = new BadParser({
        grammar: typescriptGrammar
      })
      parser.parseText('null')
      specialTypesParslet(parser, Precedence.ALL, null)
    }).to.throw('Unacceptable token:')
  })
})
