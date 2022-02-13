import { expect } from 'chai'

import { RootResult } from '../src/result/RootResult'
import { jtpTransform } from '../src/index'

describe('transform', () => {
  it('Gets transform for `JsdocTypeNamePath` with `property-brackets`', () => {
    const expected = {
      hasEventPrefix: false,
      name: 'text',
      owner: {
        name: 'foo',
        type: 'NAME'
      },
      quoteStyle: 'double',
      type: 'MEMBER'
    }
    const parseResult = {
      type: 'JsdocTypeNamePath',
      left: {
        type: 'JsdocTypeName',
        value: 'foo'
      },
      right: {
        type: 'JsdocTypeProperty',
        value: 'text',
        meta: {
          quote: 'double'
        }
      },
      pathType: 'property-brackets'
    }
    const xform = jtpTransform(parseResult as RootResult)
    expect(xform).to.deep.equal(expected)
  })

  it('Gets transform for `JsdocTypeNamePath` with `property-brackets`', () => {
    const expected = {
      hasEventPrefix: true,
      name: 'def',
      owner: {
        name: 'abc',
        type: 'NAME'
      },
      quoteStyle: 'none',
      type: 'INSTANCE_MEMBER'
    }
    const parseResult = {
      type: 'JsdocTypeNamePath',
      left: {
        type: 'JsdocTypeName',
        value: 'abc'
      },
      right: {
        type: 'JsdocTypeSpecialNamePath',
        value: 'def',
        specialType: 'event',
        meta: {}
      },
      pathType: 'instance'
    }
    const xform = jtpTransform(parseResult as RootResult)
    expect(xform).to.deep.equal(expected)
  })

  it('Throws with `JsdocTypeKeyValue` and non-plain key', () => {
    const parseResult = {
      type: 'JsdocTypeObject',
      meta: {
        separator: 'comma'
      },
      elements: [
        {
          type: 'JsdocTypeKeyValue',
          left: {
            type: 'JsdocTypeGeneric',
            left: {
              type: 'JsdocTypeName',
              value: 'Array'
            },
            elements: [
              {
                type: 'JsdocTypeName',
                value: 'string'
              }
            ],
            meta: {
              brackets: 'angle',
              dot: true
            }
          },
          right: {
            type: 'JsdocTypeName',
            value: 'number'
          },
          meta: {
            hasLeftSideExpression: true
          }
        }
      ]
    }

    expect(() => {
      jtpTransform(parseResult as RootResult)
    }).to.throw('Keys may not be typed in jsdoctypeparser.')
  })

  it('Throws with `JsdocTypeSpecialNamePath` and external `specialType`', () => {
    const parseResult = {
      type: 'JsdocTypeSpecialNamePath',
      value: 'abc',
      specialType: 'external',
      meta: {}
    }

    expect(() => {
      jtpTransform(parseResult as RootResult)
    }).to.throw('jsdoctypeparser does not support type external at this point.')
  })
})