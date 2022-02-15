import { expect } from 'chai'

import { RootResult } from '../src/result/RootResult'
import { catharsisTransform } from '../src/transforms/catharsisTransform'

describe('transform', () => {
  it('Gets transform for suffixed `JsdocTypeVariadic`', () => {
    const expected = {
      name: 'B(c...)',
      type: 'NameExpression'
    }
    const parseResult = {
      type: 'JsdocTypeSymbol',
      value: 'B',
      element: {
        type: 'JsdocTypeVariadic',
        element: {
          type: 'JsdocTypeName',
          value: 'c'
        },
        meta: {
          position: 'suffix',
          squareBrackets: false
        }
      }
    }
    const xform = catharsisTransform(parseResult as RootResult)
    expect(xform).to.deep.equal(expected)
  })

  it('should reshape non-keyvalue to FieldType container', () => {
    // The object parslet should reshape this into a JsdocTypeKeyValue container,
    //   should shouldn't be feasible (nor apparently needed on the
    //   `KeyValueResult` or `JsdocObjectKeyValueResult` TS types)
    const expected = {
      type: 'RecordType',
      fields: [
        {
          type: 'FieldType',
          key: {
            name: '100',
            type: 'NameExpression'
          },
          value: undefined
        }
      ]
    }
    const parseResult = {
      type: 'JsdocTypeObject',
      elements: [
        {
          type: 'JsdocTypeNumber',
          value: 100
        }
      ],
      meta: {
        separator: undefined
      }
    }
    const xform = catharsisTransform(parseResult as RootResult)
    expect(xform).to.deep.equal(expected)
  })

  it('Gets transform for suffixed `JsdocTypeVariadic`', () => {
    const parseResult = {
      type: 'JsdocTypeVariadic',
      meta: {
        squareBrackets: false
      }
    }
    expect(() => {
      catharsisTransform(parseResult as RootResult)
    }).to.throw('dots without value are not allowed in catharsis mode')
  })
})
