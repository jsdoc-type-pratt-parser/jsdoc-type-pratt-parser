import { testFixture } from '../Fixture'

describe('typescript computed method tests', () => {
  describe('simple computed method object', () => {
    testFixture({
      input: '{[someType](): AnotherType;}',
      stringified: '{[someType](): AnotherType}',
      expected: {
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
                type: 'JsdocTypeName',
                value: 'someType'
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
      },
      modes: [
        'typescript'
      ]
    })
  })

  describe('optional computed method object', () => {
    testFixture({
      input: '{[someType]?(): AnotherType;}',
      stringified: '{[someType]?(): AnotherType}',
      expected: {
        type: 'JsdocTypeObject',
        meta: {
          separator: 'semicolon'
        },
        elements: [
          {
            type: 'JsdocTypeObjectField',
            key: {
              type: 'JsdocTypeComputedMethod',
              optional: true,
              parameters: [],
              value: {
                type: 'JsdocTypeName',
                value: 'someType'
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
      },
      modes: [
        'typescript'
      ]
    })
  })

  describe('computed method object with parameters', () => {
    testFixture({
      input: '{[someType](a: string, b: number[]): AnotherType;}',
      stringified: '{[someType](a: string, b: number[]): AnotherType}',
      expected: {
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
              parameters: [
                {
                  key: 'a',
                  optional: false,
                  right: {
                    type: 'JsdocTypeName',
                    value: 'string'
                  },
                  type: 'JsdocTypeKeyValue',
                  variadic: false
                },
                {
                  key: 'b',
                  optional: false,
                  right: {
                    elements: [
                      {
                        type: 'JsdocTypeName',
                        value: 'number'
                      }
                    ],
                    left: {
                      type: 'JsdocTypeName',
                      value: 'Array'
                    },
                    meta: {
                      brackets: 'square',
                      dot: false
                    },
                    type: 'JsdocTypeGeneric'
                  },
                  type: 'JsdocTypeKeyValue',
                  variadic: false
                }
              ],
              value: {
                type: 'JsdocTypeName',
                value: 'someType'
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
      },
      modes: [
        'typescript'
      ]
    })
  })

  describe('no readonly computed method object', () => {
    testFixture({
      input: '{readonly [someType](): string;}',
      errors: {
        typescript: 'Computed method may not be readonly'
      }
    })
  })

  describe('unterminated computed method object', () => {
    testFixture({
      input: '{[someType](: string;}',
      errors: {
        // typescript: 'Unterminated computed method parenthesis'
        typescript: "No parslet found for token: ':' with value ':'"
      }
    })
  })

  describe('optional computed method object throws', () => {
    testFixture({
      input: '{[someType]()?: string;}',
      errors: {
        // typescript: 'Computed methods may not be optional'
        typescript: "Unexpected type: 'JsdocTypeParameterList'."
      }
    })
  })
})
