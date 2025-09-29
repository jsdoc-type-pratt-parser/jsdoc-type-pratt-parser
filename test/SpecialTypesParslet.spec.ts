import { expect } from 'chai'

import { specialTypesParslet } from '../src/parslets/SpecialTypesParslet.js'
import { Parser } from '../src/Parser.js'
import { Precedence } from '../src/Precedence.js'
import { createTypescriptGrammars } from '../src/grammars/typescriptGrammar.js'
import { Lexer } from '../src/lexer/Lexer.js'
import { rules } from '../src/lexer/LexerRules.js'

const {
  typescriptGrammar
} = createTypescriptGrammars({
  module: true,
  strictMode: true,
  asyncFunctionBody: true
})

class BadParser extends Parser {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this -- Testing
  consume (): boolean {
    return false
  }
}

describe('specialTypesParslet', () => {
  it('Errs with bad parser `consume()`', () => {
    expect(() => {
      const parser = new BadParser(typescriptGrammar, Lexer.create(rules, 'null'))
      specialTypesParslet(parser, Precedence.ALL, null)
    }).to.throw('Unacceptable token:')
  })
})
