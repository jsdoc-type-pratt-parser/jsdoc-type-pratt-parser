import { expect } from 'chai'
import { Parser } from '../src/Parser'

import { typescriptGrammar } from '../src/grammars/typescriptGrammar'

describe('Parser', () => {
  it('should consume an array of tokens', () => {
    const parser = new Parser({
      grammar: typescriptGrammar
    })
    parser.parseText('[test]')

    const twoTokens = parser.consume(['[', 'Identifier'])
    const finalTokens = parser.consume([']', 'EOF'])

    expect(twoTokens).to.equal(false)
    expect(finalTokens).to.equal(true)
  })
})
