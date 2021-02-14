import { expect } from 'chai'
import 'mocha'
import { ParseResult } from '../src/ParseResult'
import { Parser } from '../src/Parser'

describe('basics', () => {
  it('should parse names', () => {
    const typeString = 'sometype'
    const expected: ParseResult = {
      type: 'NAME',
      name: 'sometype'
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
          subject: {
            type: 'NAME',
            name: 'Array'
          },
          objects: [
            {
              type: 'UNION',
              elements: [
                {
                  type: 'NAME',
                  name: 'AType'
                },
                {
                  type: 'NAME',
                  name: 'OtherType'
                }
              ]
            }
          ]
        },
        {
          type: 'STRING_VALUE',
          value: 'test',
          quote: '\''
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
