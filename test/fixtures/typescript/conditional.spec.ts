import { expect } from 'chai'
import { testFixture } from '../Fixture.js'
import { parse } from '../../../src/index.js'

describe('typescript conditional', () => {
  describe('should parse a conditional', () => {
    testFixture({
      input: 'A extends B ? C : D',
      modes: ['typescript'],
      expected: {
        type: 'JsdocTypeConditional',
        checksType: {
          type: 'JsdocTypeName',
          value: 'A'
        },
        extendsType: {
          type: 'JsdocTypeName',
          value: 'B'
        },
        trueType: {
          type: 'JsdocTypeName',
          value: 'C'
        },
        falseType: {
          type: 'JsdocTypeName',
          value: 'D'
        }
      }
    })
  })

  describe('should parse a conditional with keyof', () => {
    testFixture({
      input: 'K extends keyof Abc ? Abc[K] : Def',
      modes: ['typescript'],
      expected: {
        type: 'JsdocTypeConditional',
        checksType: {
          type: 'JsdocTypeName',
          value: 'K'
        },
        extendsType: {
          type: 'JsdocTypeKeyof',
          element: {
            type: 'JsdocTypeName',
            value: 'Abc'
          }
        },
        trueType: {
          type: 'JsdocTypeNamePath',
          left: {
            type: 'JsdocTypeName',
            value: 'Abc'
          },
          right: {
            type: 'JsdocTypeProperty',
            value: 'K',
            meta: {
              quote: undefined
            }
          },
          pathType: 'property-brackets'
        },
        falseType: {
          type: 'JsdocTypeName',
          value: 'Def'
        }
      }
    })
  })

  describe('should support `infer` within a conditional', () => {
    testFixture({
      input: 'A extends B<infer b> ? b : C',
      modes: ['typescript'],
      expected: {
        type: 'JsdocTypeConditional',
        checksType: {
          type: 'JsdocTypeName',
          value: 'A'
        },
        extendsType: {
          type: 'JsdocTypeGeneric',
          left: {
            type: 'JsdocTypeName',
            value: 'B'
          },
          elements: [
            {
              type: 'JsdocTypeInfer',
              element: {
                type: 'JsdocTypeName',
                value: 'b'
              }
            }
          ],
          meta: {
            brackets: 'angle',
            dot: false
          }
        },
        trueType: {
          type: 'JsdocTypeName',
          value: 'b'
        },
        falseType: {
          type: 'JsdocTypeName',
          value: 'C'
        }
      }
    })
  })

  describe('should support `infer` in a non-initial generic parameter', () => {
    testFixture({
      input: 'T extends Map<any, infer V> ? V : never',
      modes: ['typescript'],
      expected: {
        type: 'JsdocTypeConditional',
        checksType: { type: 'JsdocTypeName', value: 'T' },
        extendsType: {
          type: 'JsdocTypeGeneric',
          left: { type: 'JsdocTypeName', value: 'Map' },
          elements: [
            { type: 'JsdocTypeName', value: 'any' },
            { type: 'JsdocTypeInfer', element: { type: 'JsdocTypeName', value: 'V' } }
          ],
          meta: { brackets: 'angle', dot: false }
        },
        trueType: { type: 'JsdocTypeName', value: 'V' },
        falseType: { type: 'JsdocTypeName', value: 'never' }
      }
    })
  })

  it('should parse an intersection in a nested conditional true branch', () => {
    const result = parse(`A extends {$custom: infer C}
      ? (C extends object
        ? Omit<A, '$custom'> & {$custom?: C & ThisType<E & C>}
        : A)
      : A`, 'typescript')

    expect(result).to.have.nested.property(
      'trueType.element.trueType.type',
      'JsdocTypeIntersection'
    )
  })

  describe('should parse nested indexed access in the true branch', () => {
    testFixture({
      input: 'T extends [keyof HTMLElementTagNameMap, any?, any?, any?] ? HTMLElementTagNameMap[T[0]] : JamilihReturn',
      modes: ['typescript'],
      expected: {
        type: 'JsdocTypeConditional',
        checksType: {
          type: 'JsdocTypeName',
          value: 'T'
        },
        extendsType: {
          type: 'JsdocTypeTuple',
          elements: [
            {
              type: 'JsdocTypeKeyof',
              element: {
                type: 'JsdocTypeName',
                value: 'HTMLElementTagNameMap'
              }
            },
            {
              type: 'JsdocTypeNullable',
              element: {
                type: 'JsdocTypeName',
                value: 'any'
              },
              meta: {
                position: 'suffix'
              }
            },
            {
              type: 'JsdocTypeNullable',
              element: {
                type: 'JsdocTypeName',
                value: 'any'
              },
              meta: {
                position: 'suffix'
              }
            },
            {
              type: 'JsdocTypeNullable',
              element: {
                type: 'JsdocTypeName',
                value: 'any'
              },
              meta: {
                position: 'suffix'
              }
            }
          ]
        },
        trueType: {
          type: 'JsdocTypeNamePath',
          left: {
            type: 'JsdocTypeName',
            value: 'HTMLElementTagNameMap'
          },
          right: {
            type: 'JsdocTypeIndexedAccessIndex',
            right: {
              type: 'JsdocTypeNamePath',
              left: {
                type: 'JsdocTypeName',
                value: 'T'
              },
              right: {
                type: 'JsdocTypeProperty',
                value: '0',
                meta: {
                  quote: undefined
                }
              },
              pathType: 'property-brackets'
            }
          },
          pathType: 'property-brackets'
        },
        falseType: {
          type: 'JsdocTypeName',
          value: 'JamilihReturn'
        }
      }
    })
  })

  describe('should throw with bad `infer` within a conditional', () => {
    it('throws the TypeScript-specific error', () => {
      expect(() => {
        parse('A extends B<infer 5> ? b : C', 'typescript')
      }).to.throw(
        "Unexpected type: 'JsdocTypeNumber'. Message: A typescript infer always has to have a name."
      )
    })

    testFixture({
      input: 'A extends B<infer 5> ? b : C',
      modes: [],
      expected: {
        type: 'JsdocTypeConditional',
        checksType: {
          type: 'JsdocTypeName',
          value: 'A'
        },
        extendsType: {
          type: 'JsdocTypeGeneric',
          left: {
            type: 'JsdocTypeName',
            value: 'B'
          },
          elements: [
            {
              type: 'JsdocTypeInfer',
              element: {
                type: 'JsdocTypeName',
                value: 'b'
              }
            }
          ],
          meta: {
            brackets: 'angle',
            dot: false
          }
        },
        trueType: {
          type: 'JsdocTypeName',
          value: 'b'
        },
        falseType: {
          type: 'JsdocTypeName',
          value: 'C'
        }
      }
    })
  })
})
