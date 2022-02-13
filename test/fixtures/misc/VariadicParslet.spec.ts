import { testFixture } from '../Fixture'

describe('`VariadicParslet` tests', () => {
  describe('should get postfix result', () => {
    testFixture({
      input: 'b...',
      expected: {
        type: 'JsdocTypeVariadic',
        element: {
          type: 'JsdocTypeName',
          value: 'b'
        },
        meta: {
          position: 'suffix',
          squareBrackets: false
        }
      },
      modes: [
        'jsdoc'
      ]
    })
  })
})
