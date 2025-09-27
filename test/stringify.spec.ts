import { expect } from 'chai'

import { stringifyRules, stringify } from '../src/index.js'
import type { RootResult, ObjectResult, FunctionResult, GenericResult, ParenthesisResult } from '../src/result/RootResult.js'
import type { KeyValueResult } from '../src/result/NonRootResult.js'

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

  it('should transform a generic with a union element with no spacing', () => {
    const expected = '(a|b)[]'
    const rootResult: GenericResult = {
      type: 'JsdocTypeGeneric',
      left: {
        type: 'JsdocTypeName',
        value: 'Array'
      },
      elements: [
        {
          type: 'JsdocTypeUnion',
          meta: {
            spacing: ''
          },
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

  it('should transform a generic with a union element with explicit spacing', () => {
    const expected = '(a  |  b)[]'
    const rootResult: GenericResult = {
      type: 'JsdocTypeGeneric',
      left: {
        type: 'JsdocTypeName',
        value: 'Array'
      },
      elements: [
        {
          type: 'JsdocTypeUnion',
          meta: {
            spacing: '  '
          },
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

  it('should transform a single object field with dropped comma and linebreak (no trailingPunctuation)', () => {
    const expected = `{range: boolean}`
    const rootResult: ObjectResult = {
      type: 'JsdocTypeObject',
      meta: {
        separator: 'comma-and-linebreak',
        propertyIndent: '  ',
        trailingPunctuation: false
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

  it('should transform multiple object fields with comma and linebreak (trailing)', () => {
    const expected = `{
  range: boolean,
  loc: boolean,
}`
    const rootResult: ObjectResult = {
      type: 'JsdocTypeObject',
      meta: {
        separator: 'comma-and-linebreak',
        propertyIndent: '  ',
        trailingPunctuation: true
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
        },
        {
          type: 'JsdocTypeObjectField',
          key: 'loc',
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

  it('should transform multiple object fields with semicolon and linebreak (trailing)', () => {
    const expected = `{
  range: boolean;
  loc: boolean;
}`
    const rootResult: ObjectResult = {
      type: 'JsdocTypeObject',
      meta: {
        separator: 'semicolon-and-linebreak',
        propertyIndent: '  ',
        trailingPunctuation: true
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
        },
        {
          type: 'JsdocTypeObjectField',
          key: 'loc',
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

  it('should transform multiple object fields with linebreak (trailing)', () => {
    const expected = `{
  range: boolean
  loc: boolean
}`
    const rootResult: ObjectResult = {
      type: 'JsdocTypeObject',
      meta: {
        separator: 'linebreak',
        propertyIndent: '  ',
        trailingPunctuation: true
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
        },
        {
          type: 'JsdocTypeObjectField',
          key: 'loc',
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

  it('should transform multiple object fields with comma and linebreak (non-trailing)', () => {
    const expected = `{
  range: boolean,
  loc: boolean
}`
    const rootResult: ObjectResult = {
      type: 'JsdocTypeObject',
      meta: {
        separator: 'comma-and-linebreak',
        propertyIndent: '  ',
        trailingPunctuation: false
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
        },
        {
          type: 'JsdocTypeObjectField',
          key: 'loc',
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

  it('should transform a single object field with comma and linebreak and trailing punctuation', () => {
    const expected = `{range: boolean,}`
    const rootResult: ObjectResult = {
      type: 'JsdocTypeObject',
      meta: {
        separator: 'comma-and-linebreak',
        propertyIndent: '  ',
        trailingPunctuation: true
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

  it('should transform a single object field with comma (trailingPunctuation)', () => {
    const expected = `{range: boolean,}`
    const rootResult: ObjectResult = {
      type: 'JsdocTypeObject',
      meta: {
        separator: 'comma',
        propertyIndent: '  ',
        trailingPunctuation: true
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

  it('should throw with `JsdocTypeComputedMethod` of non-JSDocType and no custom stringifier', () => {
    expect(() => {
      const rootResult: RootResult = {
        type: 'JsdocTypeObject',
        meta: {
          separator: 'semicolon'
        },
        elements: [
          {
            type: 'JsdocTypeObjectField',
            key: {
              type: 'JsdocTypeComputedMethod',
              optional: false,
              parameters: [],
              value: {
                body: [
                  {
                    end: 21,
                    expression: {
                      arguments: [],
                      callee: {
                        computed: false,
                        end: 19,
                        object: {
                          // @ts-expect-error Not the same `Identifier`
                          end: 10,
                          name: 'SomeObject',
                          start: 0,
                          type: 'Identifier'
                        },
                        property: {
                          // @ts-expect-error Not the same `Identifier`
                          end: 19,
                          name: 'someType',
                          start: 11,
                          type: 'Identifier'
                        },
                        start: 0,
                        type: 'MemberExpression'
                      },
                      end: 21,
                      start: 0,
                      type: 'CallExpression'
                    },
                    start: 0,
                    type: 'ExpressionStatement'
                  }
                ],
                end: 21,
                sourceType: 'script',
                start: 0,
                type: 'Program'
              },
              returnType: {
                type: 'JsdocTypeName',
                value: 'AnotherType'
              }
            },
            optional: false,
            readonly: false,
            right: undefined,
            meta: {
              quote: undefined
            }
          }
        ]
      }

      stringify(rootResult)
    }).to.throw('')
  })

  it('should throw with `JsdocTypeComputedProperty` of non-JSDocType and no custom stringifier', () => {
    expect(() => {
      const rootResult: RootResult = {
        type: 'JsdocTypeObject',
        meta: {
          separator: 'semicolon'
        },
        elements: [
          {
            type: 'JsdocTypeObjectField',
            key: {
              type: 'JsdocTypeComputedProperty',
              value: {
                body: [
                  {
                    end: 21,
                    expression: {
                      arguments: [],
                      callee: {
                        computed: false,
                        end: 19,
                        object: {
                          // @ts-expect-error Not the same `Identifier`
                          end: 10,
                          name: 'SomeObject',
                          start: 0,
                          type: 'Identifier'
                        },
                        property: {
                          // @ts-expect-error Not the same `Identifier`
                          end: 19,
                          name: 'someType',
                          start: 11,
                          type: 'Identifier'
                        },
                        start: 0,
                        type: 'MemberExpression'
                      },
                      end: 21,
                      start: 0,
                      type: 'CallExpression'
                    },
                    start: 0,
                    type: 'ExpressionStatement'
                  }
                ],
                end: 21,
                sourceType: 'script',
                start: 0,
                type: 'Program'
              },
            },
            optional: false,
            readonly: false,
            right: {
              type: 'JsdocTypeName',
              value: 'string'
            },
            meta: {
              quote: undefined
            }
          }
        ]
      }

      stringify(rootResult)
    }).to.throw('')
  })
})
