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
      arrow: false,
      parenthesis: true
    },
    modes: ['typescript'],
    catharsis: {
      closure: 'fail',
      jsdoc: 'fail'
    },
    jtp: {
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'typescript',
      permissive: 'typescript'
    }
  }
]
