import { testFixture } from '../Fixture'

describe('typescript readonly tests', () => {
  describe('should not parse readonly in front of a name', () => {
    testFixture({
      input: 'readonly x',
      modes: []
    })
  })

  describe('should parse readonly property', () => {
    testFixture({
      input: '{ readonly x: number }',
      stringified: '{readonly x: number}',
      modes: ['typescript'],
      expected: {
        type: 'JsdocTypeObject',
        meta: {
          separator: 'comma'
        },
        elements: [
          {
            type: 'JsdocTypeObjectField',
            key: 'x',
            readonly: true,
            optional: false,
            variadic: false,
            right: {
              type: 'JsdocTypeName',
              value: 'number'
            },
            meta: {
              quote: undefined
            }
          }
        ]
      }
    })
  })
})
