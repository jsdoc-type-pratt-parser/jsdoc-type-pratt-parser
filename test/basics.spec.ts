import { expect } from 'chai'
import 'mocha'
import { ParseResult } from '../src/ParseResult'
import { Parser } from '../src/Parser'

describe('basics', () => {
  it('should parse names', () => {
    const typeString = 'sometype'
    const expected: ParseResult = {
      type: 'NAME',
      value: 'sometype',
      meta: {
        reservedWord: false
      }
    }
    const parser = new Parser()
    const result = parser.parse(typeString)
    expect(result).to.deep.equal(expected)
  })

  it('should parse a complex expression', () => {
    const typeString = 'Array<(AType|OtherType)>|\'test\'|undefined'
    const expected: ParseResult = {
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

    const parser = new Parser({
      mode: 'typescript'
    })
    const result = parser.parse(typeString)
    expect(result).to.deep.equal(expected)
  })
})
