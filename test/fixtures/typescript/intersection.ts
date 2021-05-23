import { Fixture } from '../Fixture'

export const intersectionFixtures: Fixture[] = [
  {
    description: 'intersection of 2 types',
    input: 'A & B',
    expected: {
      type: 'INTERSECTION',
      elements: [
        {
          type: 'NAME',
          value: 'A',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'NAME',
          value: 'B',
          meta: {
            reservedWord: false
          }
        }
      ]
    },
    modes: ['typescript'],
    catharsis: {
      jsdoc: 'fail',
      closure: 'fail'
    },
    jtp: {
      jsdoc: 'fail',
      closure: 'fail',
      typescript: 'typescript',
      permissive: 'typescript'
    }
  },
  {
    description: 'nullable intersection',
    input: '(A & B)?',
    expected: {
      type: 'NULLABLE',
      element: {
        type: 'PARENTHESIS',
        element: {
          type: 'INTERSECTION',
          elements: [
            {
              type: 'NAME',
              value: 'A',
              meta: {
                reservedWord: false
              }
            },
            {
              type: 'NAME',
              value: 'B',
              meta: {
                reservedWord: false
              }
            }
          ]
        }
      },
      meta: {
        position: 'SUFFIX'
      }
    },
    modes: ['typescript'],
    catharsis: {
      jsdoc: 'fail',
      closure: 'fail'
    },
    jtp: {
      jsdoc: 'fail',
      closure: 'fail',
      typescript: 'typescript',
      permissive: 'typescript'
    }
  },
  {
    description: 'intersection of a function and generic',
    input: 'function(): void & A<B, C>',
    expected: {
      type: 'INTERSECTION',
      elements: [
        {
          type: 'FUNCTION',
          parameters: [],
          returnType: {
            type: 'NAME',
            value: 'void',
            meta: {
              reservedWord: true
            }
          },
          arrow: false,
          parenthesis: true
        },
        {
          type: 'GENERIC',
          left: {
            type: 'NAME',
            value: 'A',
            meta: {
              reservedWord: false
            }
          },
          elements: [
            {
              type: 'NAME',
              value: 'B',
              meta: {
                reservedWord: false
              }
            },
            {
              type: 'NAME',
              value: 'C',
              meta: {
                reservedWord: false
              }
            }
          ],
          meta: {
            dot: false,
            brackets: '<>'
          }
        }
      ]
    },
    modes: ['typescript'],
    catharsis: {
      jsdoc: 'fail',
      closure: 'fail'
    },
    jtp: {
      jsdoc: 'fail',
      closure: 'fail',
      typescript: 'typescript',
      permissive: 'typescript'
    }
  },
  {
    description: 'intersection of an union and an arrow',
    input: '(A | B) & (a: string) => void',
    expected: {
      type: 'INTERSECTION',
      elements: [
        {
          type: 'PARENTHESIS',
          element: {
            type: 'UNION',
            elements: [
              {
                type: 'NAME',
                value: 'A',
                meta: {
                  reservedWord: false
                }
              },
              {
                type: 'NAME',
                value: 'B',
                meta: {
                  reservedWord: false
                }
              }
            ]
          }
        },
        {
          type: 'FUNCTION',
          arrow: true,
          parenthesis: true,
          parameters: [
            {
              type: 'KEY_VALUE',
              optional: false,
              value: 'a',
              meta: {
                quote: undefined
              },
              right: {
                type: 'NAME',
                value: 'string',
                meta: {
                  reservedWord: false
                }
              }
            }
          ],
          returnType: {
            type: 'NAME',
            value: 'void',
            meta: {
              reservedWord: true
            }
          }
        }
      ]
    },
    modes: ['typescript'],
    catharsis: {
      jsdoc: 'fail',
      closure: 'fail'
    },
    jtp: {
      jsdoc: 'fail',
      closure: 'fail',
      typescript: 'typescript',
      permissive: 'typescript'
    }
  }
]
