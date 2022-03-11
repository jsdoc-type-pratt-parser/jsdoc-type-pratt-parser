import { expect } from 'chai'
import { assertRootResult, assertPlainKeyValueResult, assertNumberOrVariadicNameResult } from '../src/assertTypes'
import { IntermediateResult } from '../src/result/IntermediateResult'

describe('assertTypes', () => {
  it('should see `assertRootResult` throw with an undefined result', () => {
    expect(() => {
      assertRootResult(undefined)
    }).to.throw('Unexpected undefined')
  })

  it('should see `assertPlainKeyValueResult` throw with a left side `JsdocTypeKeyValue` expression ``', () => {
    const objectWithKeyValue = {
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
      assertPlainKeyValueResult(objectWithKeyValue.elements[0] as IntermediateResult)
    }).to.throw('Expecting no left side expression.')
  })

  it('should see `assertNumberOrVariadicNameResult` throw with a non-name `JsdocTypeVariadic`', () => {
    expect(() => {
      assertNumberOrVariadicNameResult({
        type: 'JsdocTypeVariadic',
        element: {
          type: 'JsdocTypeGeneric',
          left: {
            type: 'JsdocTypeName',
            value: 'Array'
          },
          elements: [
            {
              type: 'JsdocTypeName',
              value: 'abc'
            }
          ],
          meta: {
            brackets: 'angle',
            dot: false
          }
        },
        meta: {
          position: 'prefix',
          squareBrackets: false
        }
      })
    }).to.throw("Unexpected type: 'JsdocTypeVariadic'.")
  })

  it('should see `assertNumberOrVariadicNameResult` throw with empty variadic', () => {
    expect(() => {
      assertNumberOrVariadicNameResult({
        type: 'JsdocTypeVariadic',
        meta: {
          position: undefined,
          squareBrackets: false
        }
      })
    }).to.throw("Unexpected type: 'JsdocTypeVariadic'.")
  })

  it('should see `assertNumberOrVariadicNameResult` throw with other non-numeric, non-name types', () => {
    expect(() => {
      assertNumberOrVariadicNameResult({
        type: 'JsdocTypeNull'
      })
    }).to.throw("Unexpected type: 'JsdocTypeNull'.")
  })
})
