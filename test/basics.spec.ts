import { expect } from 'chai'
import 'mocha'
import { TerminalResult } from '../src/result/TerminalResult'
import { parse } from '../src/parse'

describe('basics', () => {
  it('should parse names', () => {
    const typeString = 'sometype'
    const expected: TerminalResult = {
      type: 'NAME',
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
      type: 'UNION',
      elements: [
        {
          type: 'GENERIC',
          left: {
            type: 'NAME',
            value: 'Array',
            meta: {
              reservedWord: false
            }
          },
          elements: [
            {
              type: 'PARENTHESIS',
              element: {
                type: 'UNION',
                elements: [
                  {
                    type: 'NAME',
                    value: 'AType',
                    meta: {
                      reservedWord: false
                    }
                  },
                  {
                    type: 'NAME',
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
          type: 'STRING_VALUE',
          value: 'test',
          meta: {
            quote: '\''
          }
        },
        {
          type: 'UNDEFINED'
        }
      ]
    }

    const result = parse(typeString, 'typescript')
    expect(result).to.deep.equal(expected)
  })
})
