import { expect } from 'chai'
import 'mocha'
import { TerminalResult } from '../src/result/TerminalResult'
import { parse } from '../src/parse'

describe('basics', () => {
  it('should parse names', () => {
    const typeString = 'sometype'
    const expected: TerminalResult = {
      type: 'JsdocTypeName',
      value: 'sometype',
      meta: {
        reservedWord: false
      }
    }
    const result = parse(typeString, 'typescript')
    expect(result).to.deep.equal(expected)
  })

  it('should parse a complex expression', () => {
    const typeString = 'Array<(AType|OtherType)>|\'test\'|undefined'
    const expected: TerminalResult = {
      type: 'JsdocTypeUnion',
      elements: [
        {
          type: 'JsdocTypeGeneric',
          left: {
            type: 'JsdocTypeName',
            value: 'Array',
            meta: {
              reservedWord: false
            }
          },
          elements: [
            {
              type: 'JsdocTypeParenthesis',
              element: {
                type: 'JsdocTypeUnion',
                elements: [
                  {
                    type: 'JsdocTypeName',
                    value: 'AType',
                    meta: {
                      reservedWord: false
                    }
                  },
                  {
                    type: 'JsdocTypeName',
                    value: 'OtherType',
                    meta: {
                      reservedWord: false
                    }
                  }
                ]
              }
            }
          ],
          meta: {
            brackets: '<>',
            dot: false
          }
        },
        {
          type: 'JsdocTypeStringValue',
          value: 'test',
          meta: {
            quote: '\''
          }
        },
        {
          type: 'JsdocTypeUndefined'
        }
      ]
    }

    const result = parse(typeString, 'typescript')
    expect(result).to.deep.equal(expected)
  })
})
