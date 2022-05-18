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
})
