import { expect } from 'chai'

import { specialTypesParslet } from '../src/parslets/SpecialTypesParslet.js'
import { Parser } from '../src/Parser.js'
import { Precedence } from '../src/Precedence.js'
import { typescriptGrammar } from '../src/grammars/typescriptGrammar.js'

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
