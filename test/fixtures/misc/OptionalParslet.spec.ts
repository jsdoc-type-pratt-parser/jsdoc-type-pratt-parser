import { testFixture } from '../Fixture'

describe('OptionalParslet tests', () => {
  describe('should get optional type as prefix', () => {
    testFixture({
      input: '=abc',
      expected: {
        type: 'JsdocTypeOptional',
        element: {
          type: 'JsdocTypeName',
          value: 'abc'
        },
        meta: {
          position: 'prefix'
        }
      },
      modes: [
        'jsdoc',
        'closure',
        'typescript'
      ]
    })
  })
})
