import { testFixture } from '../Fixture'

describe('typescript conditional', () => {
  describe('should parse a conditional', () => {
    testFixture({
      input: 'A extends B ? C : D',
      modes: ['typescript'],
      expected: {
        type: 'JsdocTypeConditional',
        checksType: {
          type: 'JsdocTypeName',
          value: 'A'
        },
        extendsType: {
          type: 'JsdocTypeName',
          value: 'B'
        },
        trueType: {
          type: 'JsdocTypeName',
          value: 'C'
        },
        falseType: {
          type: 'JsdocTypeName',
          value: 'D'
        }
      }
    })
  })
})
