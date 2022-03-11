import { testFixture } from '../Fixture'

describe('variadic tests', () => {
  describe('should get string key value', () => {
    testFixture({
      input: '{"abc": string}',
      expected: {
        type: 'JsdocTypeObject',
        meta: {
          separator: 'comma'
        },
        elements: [
          {
            type: 'JsdocTypeKeyValue',
            key: 'abc',
            right: {
              type: 'JsdocTypeName',
              value: 'string'
            },
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
        'jsdoc',
        'closure',
        'typescript'
      ]
    })
  })
})
