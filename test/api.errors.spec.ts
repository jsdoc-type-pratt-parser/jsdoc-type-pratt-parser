import { expect } from 'chai'

import { getParameters } from '../src/parslets/FunctionParslet'
import { createNamePathParslet } from '../src/parslets/NamePathParslet'
import { pathGrammar } from '../src/grammars/pathGrammar'
import { Parser } from '../src/Parser'
import { createSpecialNamePathParslet } from '../src/parslets/SpecialNamePathParslet'
import { createNameParslet } from '../src/parslets/NameParslet'
import { specialTypesParslet } from '../src/parslets/SpecialTypesParslet'

describe('API errors', () => {
  describe('`getParameters`', () => {
    it('gets error if type does not match', () => {
      expect(() => {
        getParameters({
          type: 'JsdocTypeProperty',
          value: 'test',
          meta: {
            quote: undefined
          }
        })
      }).to.throw("Unexpected type: 'JsdocTypeProperty'")
    })
  })

  describe('`NamePathParslet`', () => {
    it('Throws with non-`event` type `JsdocTypeSpecialNamePath` ', () => {
      expect(() => {
        const namePathGrammar = [
          // Ensure this gets preference over name
          createSpecialNamePathParslet({
            allowedTypes: ['module'],

            // Exclude its `createSpecialNamePathParslet` to behave like
            //    `basePathGrammar` in the `pathGrammar` file
            pathGrammar: pathGrammar.filter(p => p.name !== 'specialNamePathParslet')
          }),

          // Exclude SpecialNamePath for which we already added our own
          //   replacement above
          ...pathGrammar.filter(p => p.name !== 'specialNamePathParslet')
        ]

        const namePathParslet = createNamePathParslet({
          allowJsdocNamePaths: true,

          // Exclude name parslet
          pathGrammar: namePathGrammar
        })
        const parser = new Parser(
          [
            // These are all we need here
            namePathParslet,
            createNameParslet({
              allowedAdditionalTokens: []
            })
          ],
          'aaa.module:bbb'
        )

        parser.parse()
      }).to.throw("Unexpected type: 'JsdocTypeSpecialNamePath'. Message: Type 'JsdocTypeSpecialNamePath' is only allowed with specialType 'event'")
    })

    it('Throws with non-expected inner type toward building `JsdocTypeSpecialNamePath` ', () => {
      expect(() => {
        const namePathGrammar = [
          // Ensure this gets preference over name (for `null`)
          specialTypesParslet,

          // Exclude SpecialNamePath for which we already added our own
          //   replacement above
          ...pathGrammar.filter(p => p.name !== 'specialNamePathParslet')
        ]

        const namePathParslet = createNamePathParslet({
          allowJsdocNamePaths: true,

          // Exclude name parslet
          pathGrammar: namePathGrammar
        })
        const parser = new Parser(
          [
            // These are all we need here
            namePathParslet,
            createNameParslet({
              allowedAdditionalTokens: []
            })
          ],
          'aaa.null'
        )
        parser.parse()
      }).to.throw("Unexpected type: 'JsdocTypeNull'. Message: Expecting 'JsdocTypeName', 'JsdocTypeNumber', 'JsdocStringValue' or 'JsdocTypeSpecialNamePath")
    })
  })
})
