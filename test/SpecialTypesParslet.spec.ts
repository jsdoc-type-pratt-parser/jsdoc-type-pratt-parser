import { expect } from 'chai'

import { specialTypesParslet } from '../src/parslets/SpecialTypesParslet'
import { Parser } from '../src/Parser'
import { Precedence } from '../src/Precedence'
import { typescriptGrammar } from '../src/grammars/typescriptGrammar'

class BadParser extends Parser {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this -- Testing
  consume (): boolean {
    return false
  }
}

describe('specialTypesParslet', () => {
  it('Errs with bad parser `consume()`', () => {
    expect(() => {
      const parser = new BadParser(typescriptGrammar, 'null')
      specialTypesParslet(parser, Precedence.ALL, null)
    }).to.throw('Unacceptable token:')
  })
})
