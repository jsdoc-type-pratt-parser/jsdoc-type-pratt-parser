import { testFixture } from '../Fixture.js'

describe('typescript call signatures', () => {
  describe('should parse a call signature', () => {
    testFixture({
      input: '{(a: string, b: number): SomeType}',
      modes: ['typescript'],
      expected: {
        type: 'JsdocTypeObject',
        meta: {
          separator: 'comma'
        },
        elements: [
          {
            type: 'JsdocTypeCallSignature',
            parameters: [
              {
                type: 'JsdocTypeKeyValue',
                key: 'a',
                right: {
                  type: 'JsdocTypeName',
                  value: 'string'
                },
                optional: false,
                variadic: false
              },
              {
                type: 'JsdocTypeKeyValue',
                key: 'b',
                right: {
                  type: 'JsdocTypeName',
                  value: 'number'
                },
                optional: false,
                variadic: false
              }
            ],
            returnType: {
              type: 'JsdocTypeName',
              value: 'SomeType'
            }
          }
        ]
      }
    })
  })
})
