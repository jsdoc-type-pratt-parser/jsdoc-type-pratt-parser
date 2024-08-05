import { testFixture } from '../Fixture'

describe('typescript assert result tests', () => {
  describe('assert as return type', () => {
    testFixture({
      input: 'asserts foo is Bar',
      expected: {
        type: 'JsdocTypeAsserts',
        left: {
          type: 'JsdocTypeName',
          value: 'foo'
        },
        right: {
          type: 'JsdocTypeName',
          value: 'Bar'
        }
      },
      modes: ['typescript']
    })
  })
})
