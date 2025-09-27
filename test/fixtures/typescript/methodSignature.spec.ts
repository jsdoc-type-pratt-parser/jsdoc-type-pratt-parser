import { testFixture } from '../Fixture.js'

describe('typescript method signatures', () => {
  describe('should parse a method signature', () => {
    testFixture({
      input: '{someName(a: string, b: number): SomeType}',
      modes: ['typescript'],
      expected: {
        type: 'JsdocTypeObject',
        meta: {
          separator: 'comma'
        },
        elements: [
          {
            type: 'JsdocTypeMethodSignature',
            name: 'someName',
            meta: {
              quote: undefined
            },
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

  describe('should parse a method signature with double quotes', () => {
    testFixture({
      input: '{"new"(a: string, b: number): SomeType}',
      modes: ['typescript'],
      expected: {
        type: 'JsdocTypeObject',
        meta: {
          separator: 'comma'
        },
        elements: [
          {
            type: 'JsdocTypeMethodSignature',
            name: 'new',
            meta: {
              quote: "double"
            },
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

  describe('should parse a method signature with single quotes', () => {
    testFixture({
      input: "{'some-method'(a: string, b: number): SomeType}",
      modes: ['typescript'],
      expected: {
        type: 'JsdocTypeObject',
        meta: {
          separator: 'comma'
        },
        elements: [
          {
            type: 'JsdocTypeMethodSignature',
            name: 'some-method',
            meta: {
              quote: "single"
            },
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
