import { testFixture } from '../Fixture'

describe('typescript computed property tests', () => {
  describe('simple computed property object', () => {
    testFixture({
      input: '{[someType]: string;}',
      stringified: '{[someType]: string}',
      expected: {
        type: 'JsdocTypeObject',
        meta: {
          separator: 'semicolon'
        },
        elements: [
          {
            type: 'JsdocTypeObjectField',
            key: {
              type: 'JsdocTypeComputedProperty',
              value: {
                type: 'JsdocTypeName',
                value: 'someType'
              },
            },
            optional: false,
            readonly: false,
            right: {
              type: 'JsdocTypeName',
              value: 'string'
            },
            meta: {
              quote: undefined
            }
          }
        ]
      },
      modes: [
        'typescript'
      ]
    })
  })

  describe('readonly computed property object', () => {
    testFixture({
      input: '{readonly [someType]: string;}',
      stringified: '{readonly [someType]: string}',
      expected: {
        type: 'JsdocTypeObject',
        meta: {
          separator: 'semicolon'
        },
        elements: [
          {
            type: 'JsdocTypeObjectField',
            key: {
              type: 'JsdocTypeComputedProperty',
              value: {
                type: 'JsdocTypeName',
                value: 'someType'
              },
            },
            optional: false,
            readonly: true,
            right: {
              type: 'JsdocTypeName',
              value: 'string'
            },
            meta: {
              quote: undefined
            }
          }
        ]
      },
      modes: [
        'typescript'
      ]
    })
  })

  describe('optional computed property object', () => {
    testFixture({
      input: '{[someType]?: string;}',
      stringified: '{[someType]?: string}',
      expected: {
        type: 'JsdocTypeObject',
        meta: {
          separator: 'semicolon'
        },
        elements: [
          {
            type: 'JsdocTypeObjectField',
            key: {
              type: 'JsdocTypeComputedProperty',
              value: {
                type: 'JsdocTypeName',
                value: 'someType'
              },
            },
            optional: true,
            readonly: false,
            right: {
              type: 'JsdocTypeName',
              value: 'string'
            },
            meta: {
              quote: undefined
            }
          }
        ]
      },
      modes: [
        'typescript'
      ]
    })
  })
})
