import { expect } from 'chai'
import { Parser } from '../src/Parser'

import { NoParsletFoundError, EarlyEndOfParseError } from '../src/errors'

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

  it('should return token of error with `NoParsletFoundError.getToken`', () => {
    const parser = new Parser({
      grammar: typescriptGrammar
    })

    let error
    try {
      parser.parseText('{')
    } catch (err) {
      error = err
    }

    if (error === undefined) {
      throw new Error('Failed')
    }

    const token = (error as NoParsletFoundError).getToken()

    expect(token).to.deep.equal({
      type: 'EOF',
      text: ''
    })
  })

  it('should return token of error with `EarlyEndOfParseError.getToken`', () => {
    const error = new EarlyEndOfParseError({
      type: 'import',
      text: 'import'
    })
    const token = error.getToken()

    expect(token).to.deep.equal({
      type: 'import',
      text: 'import'
    })
  })
})
