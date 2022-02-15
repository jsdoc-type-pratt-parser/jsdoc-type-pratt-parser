import { expect } from 'chai'

import { jsdocGrammar } from '../src/grammars/jsdocGrammar'
import { Parser } from '../src/Parser'
import { Grammar } from '../src/grammars/Grammar'

import { createObjectParslet } from '../src/parslets/ObjectParslet'
import { IntermediateResult } from '../src/result/IntermediateResult'
import { Precedence } from '../src/Precedence'
import { RootResult } from '../src/result/RootResult'

// import { createNameParslet } from '../src/parslets/NameParslet'

const pt = Parser.prototype.parseIntermediateType

describe('`ObjectParslet`', () => {
  after(() => {
    Parser.prototype.parseIntermediateType = pt
  })
  it('Recovers after failing first intermediate parsing with `allowKeyTypes`', () => {
    // Limit the field grammar so it mostly fails
    const objectFieldGrammar: Grammar = [
      ...jsdocGrammar
    ]

    const objectParslet = createObjectParslet({
      allowKeyTypes: true,
      objectFieldGrammar
    })

    const parser = new Parser({
      grammar: [
        objectParslet,
        ...jsdocGrammar
      ]
    })

    let i = 0
    Parser.prototype.parseIntermediateType = (precedence: Precedence): IntermediateResult => {
      if (i++ === 1) {
        const ret: unknown = undefined
        return ret as RootResult
      }
      return pt.call(parser, precedence)
    }

    const rootResult = parser.parseText('{abc}')

    expect(rootResult).to.deep.equal({
      elements: [
        {
          key: 'abc',
          meta: {
            hasLeftSideExpression: false,
            quote: undefined
          },
          optional: false,
          readonly: false,
          right: undefined,
          type: 'JsdocTypeKeyValue'
        }
      ],
      meta: {
        separator: 'comma'
      },
      type: 'JsdocTypeObject'
    }
    )
  })
})
