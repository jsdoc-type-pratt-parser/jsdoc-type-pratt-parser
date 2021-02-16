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
          name: 'TrailingComma'
        }
      ],
      returnType: {
        type: 'NAME',
        name: 'string'
      }
    }
  }
]
