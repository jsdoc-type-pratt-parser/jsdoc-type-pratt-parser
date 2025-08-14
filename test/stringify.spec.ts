import { expect } from 'chai'

import { stringifyRules, stringify } from '../src/index'
import type { RootResult, ObjectResult, FunctionResult, GenericResult, ParenthesisResult } from '../src/result/RootResult'
import type { KeyValueResult } from '../src/result/NonRootResult'

describe('`stringifyRules`', () => {
  it('should exist on index export', () => {
    expect(typeof stringifyRules).to.equal('function')
  })

  // Our FunctionParslet shouldn't produce, but testing here
  it('should transform a function without parentheses', () => {
    const expected = 'function'
    const rootResult: FunctionResult = {
      type: 'JsdocTypeFunction',
      parameters: [],
      arrow: false,
      constructor: false,
      parenthesis: false
    }
    const result = stringify(rootResult)
    expect(result).to.equal(expected)
  })

  it('should stringify `right` undefined `JsdocTypeKeyValue`', () => {
    const expected = 'a'
    const nonRootResult: KeyValueResult = {
      type: 'JsdocTypeKeyValue',
      key: 'a',
      right: undefined,
      optional: false,
      variadic: false
    }
    const result = stringify(nonRootResult as unknown as RootResult)
    expect(result).to.equal(expected)
  })

  // Note: Seems the union should not be possible here, at least with our
  //   grammars, as element will be wrapped in parentheses
  it('should transform a generic with a union element', () => {
    const expected = '(a | b)[]'
    const rootResult: GenericResult = {
      type: 'JsdocTypeGeneric',
      left: {
        type: 'JsdocTypeName',
        value: 'Array'
      },
      elements: [
        {
          type: 'JsdocTypeUnion',
          elements: [
            {
              type: 'JsdocTypeName',
              value: 'a'
            },
            {
              type: 'JsdocTypeName',
              value: 'b'
            }
          ]
        }
      ],
      meta: {
        brackets: 'square',
        dot: false
      }
    }
    const result = stringify(rootResult)
    expect(result).to.equal(expected)
  })

  // Note: This should not occur as the `element` should not be undefined per
  //    `ParenthesisResult`
  it('should transform a set of parentheses', () => {
    const expected = '()'
    const rootResult: unknown = {
      type: 'JsdocTypeParenthesis',
      element: undefined
    }
    const result = stringify(rootResult as ParenthesisResult)
    expect(result).to.equal(expected)
  })

  it('should transform a single object field with linebreaks', () => {
    const expected = `{
  range: boolean
}`
    const rootResult: ObjectResult = {
      type: 'JsdocTypeObject',
      meta: {
        separator: 'linebreak',
        propertyIndent: '  ',
        separatorForSingleObjectField: true
      },
      elements: [
        {
          type: 'JsdocTypeObjectField',
          key: 'range',
          optional: false,
          readonly: false,
          right: {
            type: 'JsdocTypeName',
            value: 'boolean'
          },
          meta: {
            quote: undefined
          }
        }
      ]
    }
    const result = stringify(rootResult)
    expect(result).to.equal(expected)
  })

  it('should transform a single object field with dropped comma and linebreak', () => {
    const expected = `{range: boolean}`
    const rootResult: ObjectResult = {
      type: 'JsdocTypeObject',
      meta: {
        separator: 'comma-and-linebreak',
        propertyIndent: '  ',
        separatorForSingleObjectField: false
      },
      elements: [
        {
          type: 'JsdocTypeObjectField',
          key: 'range',
          optional: false,
          readonly: false,
          right: {
            type: 'JsdocTypeName',
            value: 'boolean'
          },
          meta: {
            quote: undefined
          }
        }
      ]
    }
    const result = stringify(rootResult)
    expect(result).to.equal(expected)
  })

  it('should transform a single object field with comma and linebreak', () => {
    const expected = `{
  range: boolean,
}`
    const rootResult: ObjectResult = {
      type: 'JsdocTypeObject',
      meta: {
        separator: 'comma-and-linebreak',
        propertyIndent: '  ',
        separatorForSingleObjectField: true
      },
      elements: [
        {
          type: 'JsdocTypeObjectField',
          key: 'range',
          optional: false,
          readonly: false,
          right: {
            type: 'JsdocTypeName',
            value: 'boolean'
          },
          meta: {
            quote: undefined
          }
        }
      ]
    }
    const result = stringify(rootResult)
    expect(result).to.equal(expected)
  })

  it('should transform a single object field with comma', () => {
    const expected = `{range: boolean,}`
    const rootResult: ObjectResult = {
      type: 'JsdocTypeObject',
      meta: {
        separator: 'comma',
        propertyIndent: '  ',
        separatorForSingleObjectField: true
      },
      elements: [
        {
          type: 'JsdocTypeObjectField',
          key: 'range',
          optional: false,
          readonly: false,
          right: {
            type: 'JsdocTypeName',
            value: 'boolean'
          },
          meta: {
            quote: undefined
          }
        }
      ]
    }
    const result = stringify(rootResult)
    expect(result).to.equal(expected)
  })

  it('should transform a single object field with semicolon', () => {
    const expected = `{range: boolean;}`
    const rootResult: ObjectResult = {
      type: 'JsdocTypeObject',
      meta: {
        separator: 'semicolon',
        propertyIndent: '  ',
        separatorForSingleObjectField: true
      },
      elements: [
        {
          type: 'JsdocTypeObjectField',
          key: 'range',
          optional: false,
          readonly: false,
          right: {
            type: 'JsdocTypeName',
            value: 'boolean'
          },
          meta: {
            quote: undefined
          }
        }
      ]
    }
    const result = stringify(rootResult)
    expect(result).to.equal(expected)
  })

  it('should throw with arrow with no `returnType`', () => {
    expect(() => {
      const rootResult: FunctionResult = {
        type: 'JsdocTypeFunction',
        parameters: [],
        arrow: true,
        constructor: false,
        parenthesis: false
      }
      stringify(rootResult)
    }).to.throw('')
  })
})
