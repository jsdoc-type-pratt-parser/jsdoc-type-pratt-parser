import { expect } from 'chai'
import 'mocha'
import type { RootResult } from '../src/result/RootResult.js'
import { parse, parseNamePath } from '../src/parse.js'

describe('basics', () => {
  it('should parse names', () => {
    const typeString = 'sometype'
    const expected: RootResult = {
      type: 'JsdocTypeName',
      value: 'sometype'
    }
    const result = parse(typeString, 'typescript')
    expect(result).to.deep.equal(expected)
  })

  it('should parse a complex expression', () => {
    const typeString = 'Array<(AType|OtherType)>|\'test\'|undefined'
    const expected: RootResult = {
      type: 'JsdocTypeUnion',
      elements: [
        {
          type: 'JsdocTypeGeneric',
          left: {
            type: 'JsdocTypeName',
            value: 'Array'
          },
          elements: [
            {
              type: 'JsdocTypeParenthesis',
              element: {
                type: 'JsdocTypeUnion',
                elements: [
                  {
                    type: 'JsdocTypeName',
                    value: 'AType'
                  },
                  {
                    type: 'JsdocTypeName',
                    value: 'OtherType'
                  }
                ]
              }
            }
          ],
          meta: {
            brackets: 'angle',
            dot: false
          }
        },
        {
          type: 'JsdocTypeStringValue',
          value: 'test',
          meta: {
            quote: 'single'
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

  it('should parse bigint literals', () => {
    const typeString = '123n'
    const expected: RootResult = {
      type: 'JsdocTypeBigInt',
      value: 123n
    }

    const result = parse(typeString, 'typescript')
    expect(result).to.deep.equal(expected)
  })

  it('should reject bigint literals in typescript namepaths', () => {
    expect(() => parseNamePath('Foo[1n]', 'typescript')).to.throw()
  })

  it('should reject bigint literals as typescript object keys', () => {
    expect(() => parse('{123n: string}', 'typescript')).to.throw("Unexpected type: 'JsdocTypeBigInt'.")
    expect(() => parse('{123n}', 'typescript')).to.throw("Unexpected type: 'JsdocTypeBigInt'.")
  })
})
