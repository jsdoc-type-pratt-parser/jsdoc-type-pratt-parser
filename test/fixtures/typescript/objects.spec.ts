import { testFixture } from '../Fixture'

describe('typescript objects tests', () => {
  describe('optional entry', () => {
  // there seems to be a catharsis error: https://github.com/hegemonic/catharsis/blob/222e8fc4350c346b47ca8395c37512290979df12/lib/parser.pegjs#L555
    testFixture({
      input: '{ object?: string, key: string }',
      stringified: '{object?: string, key: string}',
      diffExpected: {
        typescript: {
          type: 'JsdocTypeObject',
          elements: [
            {
              type: 'JsdocTypeKeyValue',
              value: 'object',
              meta: {
                quote: undefined
              },
              right: {
                type: 'JsdocTypeName',
                value: 'string'
              },
              optional: true
            },
            {
              type: 'JsdocTypeKeyValue',
              value: 'key',
              meta: {
                quote: undefined
              },
              right: {
                type: 'JsdocTypeName',
                value: 'string'
              },
              optional: false
            }
          ]
        },
        jsdoc: {
          type: 'JsdocTypeObject',
          elements: [
            {
              type: 'JsdocTypeKeyValue',
              left: {
                type: 'JsdocTypeNullable',
                element: {
                  type: 'JsdocTypeName',
                  value: 'object'
                },
                meta: {
                  position: 'suffix'
                }
              },
              right: {
                type: 'JsdocTypeName',
                value: 'string'
              }
            },
            {
              type: 'JsdocTypeKeyValue',
              value: 'key',
              meta: {
                quote: undefined
              },
              right: {
                type: 'JsdocTypeName',
                value: 'string'
              },
              optional: false
            }
          ]
        }
      },
      modes: [
        'jsdoc',
        'typescript'
      ],
      catharsis: {
        closure: 'fail',
        jsdoc: 'fail'
      },
      jtp: {
        closure: 'differ',
        jsdoc: 'differ',
        typescript: 'typescript',
        permissive: 'typescript'
      }
    })
  })

  describe('An object with unenclosed union as type', () => {
    testFixture({
      input: '{message: string|undefined}',
      stringified: '{message: string | undefined}',
      expected: {
        type: 'JsdocTypeObject',
        elements: [
          {
            type: 'JsdocTypeKeyValue',
            value: 'message',
            right: {
              type: 'JsdocTypeUnion',
              elements: [
                {
                  type: 'JsdocTypeName',
                  value: 'string'
                },
                {
                  type: 'JsdocTypeUndefined'
                }
              ]
            },
            optional: false,
            meta: {
              quote: undefined
            }
          }
        ]
      },
      modes: [
        'jsdoc',
        'closure',
        'typescript'
      ],
      catharsis: {
        jsdoc: 'jsdoc',
        closure: 'closure'
      },
      jtp: {
        jsdoc: 'jsdoc',
        closure: 'closure',
        typescript: 'typescript',
        permissive: 'typescript'
      }
    })
  })

  describe('An object an optional field without a type', () => {
    testFixture({
      input: '{ message?} ',
      stringified: '{message?}',
      expected: {
        type: 'JsdocTypeObject',
        elements: [
          {
            type: 'JsdocTypeKeyValue',
            value: 'message',
            right: undefined,
            optional: true,
            meta: {
              quote: undefined
            }
          }
        ]
      },
      modes: [
        'jsdoc', // TODO: should this fail in closure or jsdoc?
        'closure',
        'typescript'
      ],
      catharsis: {
        jsdoc: 'fail',
        closure: 'fail'
      },
      jtp: {
        jsdoc: 'fail',
        closure: 'fail',
        typescript: 'fail',
        permissive: 'fail'
      }
    })
  })
})
