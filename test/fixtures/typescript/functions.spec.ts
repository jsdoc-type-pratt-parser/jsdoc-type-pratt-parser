import { testFixture } from '../Fixture'

describe('typescript function test', () => {
  describe('allows new as function', () => {
    testFixture({
      input: 'new(number, string): SomeType',
      expected: {
        type: 'JsdocTypeFunction',
        parameters: [
          {
            type: 'JsdocTypeName',
            value: 'number'
          },
          {
            type: 'JsdocTypeName',
            value: 'string'
          }
        ],
        arrow: false,
        constructor: true,
        parenthesis: true,
        returnType: {
          type: 'JsdocTypeName',
          value: 'SomeType'
        }
      },
      modes: ['typescript']
    })
  })

  describe('allows new as an arrow function', () => {
    testFixture({
      input: 'new () => SomeType',
      expected: {
        type: 'JsdocTypeFunction',
        parameters: [],
        arrow: true,
        constructor: true,
        parenthesis: true,
        returnType: {
          type: 'JsdocTypeName',
          value: 'SomeType'
        }
      },
      modes: ['typescript']
    })
  })
})
