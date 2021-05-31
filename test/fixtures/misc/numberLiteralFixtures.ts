import { Fixture } from '../Fixture'

export const numberLiteralFixtures: Fixture[] = [
  {
    description: 'should accept numbers as types',
    input: '123',
    expected: {
      type: 'JsdocTypeNumber',
      value: 123
    },
    modes: ['jsdoc', 'closure', 'typescript'],
    jtp: {
      jsdoc: 'jsdoc',
      closure: 'closure',
      typescript: 'typescript',
      permissive: 'jsdoc'
    },
    catharsis: {
      jsdoc: 'jsdoc',
      closure: 'closure'
    }
  },
  {
    description: 'should accept numbers in type unions',
    input: '123 | 456',
    expected: {
      type: 'JsdocTypeUnion',
      elements: [
        {
          type: 'JsdocTypeNumber',
          value: 123
        },
        {
          type: 'JsdocTypeNumber',
          value: 456
        }
      ]
    },
    modes: ['jsdoc', 'closure', 'typescript'],
    jtp: {
      jsdoc: 'jsdoc',
      closure: 'closure',
      typescript: 'typescript',
      permissive: 'jsdoc'
    },
    catharsis: {
      jsdoc: 'jsdoc',
      closure: 'closure'
    }
  },
  {
    description: 'should accept numbers as generic parameters',
    input: 'SomeType<123 & 456>',
    expected: {
      type: 'JsdocTypeGeneric',
      left: {
        type: 'JsdocTypeName',
        value: 'SomeType'
      },
      elements: [
        {
          type: 'JsdocTypeIntersection',
          elements: [
            {
              type: 'JsdocTypeNumber',
              value: 123
            },
            {
              type: 'JsdocTypeNumber',
              value: 456
            }
          ]
        }
      ],
      meta: {
        brackets: 'angle',
        dot: false
      }
    },
    modes: ['typescript'],
    jtp: {
      jsdoc: 'fail',
      closure: 'fail',
      typescript: 'typescript',
      permissive: 'typescript'
    },
    catharsis: {
      jsdoc: 'fail',
      closure: 'fail'
    }
  }
]
