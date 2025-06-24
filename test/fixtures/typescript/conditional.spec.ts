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

  describe('should support `infer` within a conditional', () => {
    testFixture({
      input: 'A extends B<infer b> ? b : C',
      modes: ['typescript'],
      expected: {
        type: 'JsdocTypeConditional',
        checksType: {
          type: 'JsdocTypeName',
          value: 'A'
        },
        extendsType: {
          type: 'JsdocTypeGeneric',
          left: {
            type: 'JsdocTypeName',
            value: 'B'
          },
          infer: true,
          elements: [
            {
              type: 'JsdocTypeName',
              value: 'b'
            }
          ],
          meta: {
            brackets: 'angle',
            dot: false
          }
        },
        trueType: {
          type: 'JsdocTypeName',
          value: 'b'
        },
        falseType: {
          type: 'JsdocTypeName',
          value: 'C'
        }
      }
    })
  })
})
