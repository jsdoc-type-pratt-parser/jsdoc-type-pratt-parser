import { Fixture } from '../Fixture'

export const intersectionFixtures: Fixture[] = [
  {
    description: 'intersection of 2 types',
    input: 'A & B',
    expected: {
      type: 'JsdocTypeIntersection',
      elements: [
        {
          type: 'JsdocTypeName',
          value: 'A'
        },
        {
          type: 'JsdocTypeName',
          value: 'B'
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
      type: 'JsdocTypeNullable',
      element: {
        type: 'JsdocTypeParenthesis',
        element: {
          type: 'JsdocTypeIntersection',
          elements: [
            {
              type: 'JsdocTypeName',
              value: 'A'
            },
            {
              type: 'JsdocTypeName',
              value: 'B'
            }
          ]
        }
      },
      meta: {
        position: 'suffix'
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
      type: 'JsdocTypeIntersection',
      elements: [
        {
          type: 'JsdocTypeFunction',
          parameters: [],
          returnType: {
            type: 'JsdocTypeName',
            value: 'void'
          },
          arrow: false,
          parenthesis: true
        },
        {
          type: 'JsdocTypeGeneric',
          left: {
            type: 'JsdocTypeName',
            value: 'A'
          },
          elements: [
            {
              type: 'JsdocTypeName',
              value: 'B'
            },
            {
              type: 'JsdocTypeName',
              value: 'C'
            }
          ],
          meta: {
            dot: false,
            brackets: 'angle'
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
      type: 'JsdocTypeIntersection',
      elements: [
        {
          type: 'JsdocTypeParenthesis',
          element: {
            type: 'JsdocTypeUnion',
            elements: [
              {
                type: 'JsdocTypeName',
                value: 'A'
              },
              {
                type: 'JsdocTypeName',
                value: 'B'
              }
            ]
          }
        },
        {
          type: 'JsdocTypeFunction',
          arrow: true,
          parenthesis: true,
          parameters: [
            {
              type: 'JsdocTypeKeyValue',
              optional: false,
              value: 'a',
              meta: {
                quote: undefined
              },
              right: {
                type: 'JsdocTypeName',
                value: 'string'
              }
            }
          ],
          returnType: {
            type: 'JsdocTypeName',
            value: 'void'
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
