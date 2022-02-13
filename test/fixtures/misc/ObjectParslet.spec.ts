import { testFixture } from '../Fixture'

describe('`ObjectParslet`', () => {
  describe('record type with numeric key and no right-hand side', () => {
    testFixture({
      input: '{123}',
      expected: {
        type: 'JsdocTypeObject',
        meta: {
          separator: 'comma'
        },
        elements: [
          {
            type: 'JsdocTypeKeyValue',
            right: undefined,
            key: '123',
            optional: false,
            readonly: false,
            meta: {
              quote: undefined,
              hasLeftSideExpression: false
            }
          }
        ]
      },
      modes: [
        'closure',
        'typescript',
        'jsdoc'
      ]
    })
  })

  describe('record type with numeric key and no right-hand side', () => {
    testFixture({
      input: '{"abc"}',
      expected: {
        type: 'JsdocTypeObject',
        meta: {
          separator: 'comma'
        },
        elements: [
          {
            type: 'JsdocTypeKeyValue',
            right: undefined,
            key: 'abc',
            optional: false,
            readonly: false,
            meta: {
              quote: 'double',
              hasLeftSideExpression: false
            }
          }
        ]
      },
      modes: [
        'closure',
        'typescript',
        'jsdoc'
      ]
    })
  })
})
