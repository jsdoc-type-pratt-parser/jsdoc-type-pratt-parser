import { Fixture } from '../Fixture'

// TODO:

export const miscFixtures: Fixture[] = [
  {
    description: 'function parameter list with trailing comma',
    input: 'function( TrailingComma, ): string',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'NAME',
          value: 'TrailingComma',
          meta: {
            reservedWord: false
          }
        }
      ],
      returnType: {
        type: 'NAME',
        value: 'string',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        arrow: false
      }
    },
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  }
]
