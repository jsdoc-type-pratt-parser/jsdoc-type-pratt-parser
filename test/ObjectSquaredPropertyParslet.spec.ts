import { expect } from 'chai'
import { objectSquaredPropertyParslet } from '../src/parslets/ObjectSquaredPropertyParslet'
import { Parser } from '../src/Parser'
import type { Grammar } from '../src/grammars/Grammar'
import { createObjectParslet } from '../src/parslets/ObjectParslet'

describe('`ObjectSquaredPropertyParslet`', () => {
  it('throws without base parser', () => {
    const parser = new Parser(
      [
        objectSquaredPropertyParslet,
      ],
      '[abc: string]'
    )

    expect(() => {
      parser.parse()

      // eslint-disable-next-line no-console -- Testing
      console.log(parser);
    }).to.throw('Only allowed inside object grammar')
  })

  it('throws without `:` or `in`', () => {
    const objectFieldGrammar: Grammar = [
      objectSquaredPropertyParslet
    ]

    const objectParslet = createObjectParslet({
      allowKeyTypes: true,
      objectFieldGrammar
    })

    const parser = new Parser(
      [
        objectParslet
      ],
      '{[abc]}'
    )

    expect(() => {
      parser.parse()

      // eslint-disable-next-line no-console -- Testing
      console.log(parser);
    }).to.throw('Missing \':\' or \'in\' inside square bracketed property.')
  })
})
