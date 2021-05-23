import { Fixture } from '../Fixture'

export const objectsFixtures: Fixture[] = [
  {
    description: 'optional entry',
    input: '{ object?: string, key: string }',
    stringified: '{object?: string, key: string}',
    diffExpected: {
      typescript: {
        type: 'OBJECT',
        elements: [
          {
            type: 'KEY_VALUE',
            value: 'object',
            meta: {
              quote: undefined
            },
            right: {
              type: 'NAME',
              value: 'string',
              meta: {
                reservedWord: false
              }
            },
            optional: true
          },
          {
            type: 'KEY_VALUE',
            value: 'key',
            meta: {
              quote: undefined
            },
            right: {
              type: 'NAME',
              value: 'string',
              meta: {
                reservedWord: false
              }
            },
            optional: false
          }
        ]
      },
      jsdoc: {
        type: 'OBJECT',
        elements: [
          {
            type: 'KEY_VALUE',
            left: {
              type: 'NULLABLE',
              element: {
                type: 'NAME',
                value: 'object',
                meta: {
                  reservedWord: false
                }
              },
              meta: {
                position: 'SUFFIX'
              }
            },
            right: {
              type: 'NAME',
              value: 'string',
              meta: {
                reservedWord: false
              }
            }
          },
          {
            type: 'KEY_VALUE',
            value: 'key',
            meta: {
              quote: undefined
            },
            right: {
              type: 'NAME',
              value: 'string',
              meta: {
                reservedWord: false
              }
            },
            optional: false
          }
        ]
      }
    },
    modes: ['jsdoc', 'typescript'],
    catharsis: {
      closure: 'fail',
      jsdoc: 'fail' // this seems to be a catharsis error: https://github.com/hegemonic/catharsis/blob/222e8fc4350c346b47ca8395c37512290979df12/lib/parser.pegjs#L555
    },
    jtp: {
      closure: 'differ',
      jsdoc: 'differ',
      typescript: 'typescript',
      permissive: 'typescript'
    }
  }
]
