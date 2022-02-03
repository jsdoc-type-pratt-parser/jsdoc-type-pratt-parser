import { expect } from 'chai'
import { composeParslet, ComposeParsletOptions } from '../src/parslets/Parslet'

import { Parser } from '../src/Parser'
import { Precedence } from '../src/Precedence'
import { typescriptGrammar } from '../src/grammars/typescriptGrammar'

describe('Parser', () => {
  it('should avoid parslet name defining if name missing on options', () => {
    const parslet = composeParslet(
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- Force missing key
      {

      } as ComposeParsletOptions
    )
    const parser = new Parser({
      grammar: typescriptGrammar
    })
    parser.parseText('123')
    const result = parslet(parser, Precedence.ALL, null)

    expect(result).to.equal(null)
  })
})
