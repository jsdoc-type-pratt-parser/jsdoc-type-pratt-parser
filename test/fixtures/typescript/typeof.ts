import { Fixture } from '../Fixture'

export const typeOfFixtures: Fixture[] = [
  {
    description: 'typeof name',
    input: 'typeof A',
    expected: {
      type: 'TYPE_OF',
      value: {
        type: 'NAME',
        name: 'A'
      }
    }
  },
  {
    description: 'typeof',
    input: 'typeof',
    expected: {
      type: 'TYPE_OF'
    }
  },
  {
    description: 'generic with typeof',
    input: 'X<typeof>',
    expected: {
      type: 'GENERIC',
      subject: {
        type: 'NAME',
        name: 'X'
      },
      objects: [{
        type: 'TYPE_OF'
      }]
    }
  },
  {
    description: 'generic with typeof name',
    input: 'X<typeof A>',
    expected: {
      type: 'GENERIC',
      subject: {
        type: 'NAME',
        name: 'X'
      },
      objects: [{
        type: 'TYPE_OF',
        value: {
          type: 'NAME',
          name: 'A'
        }
      }]
    }
  },
  {
    description: 'generic typeof name in parenthesis',
    input: '(typeof X)<A>',
    expected: {
      type: 'GENERIC',
      subject: {
        type: 'TYPE_OF',
        value: {
          type: 'NAME',
          name: 'X'
        }
      },
      objects: [
        {
          type: 'NAME',
          name: 'A'
        }
      ]
    }
  },
  {
    description: 'typeof name in parenthesis',
    input: '(typeof A)',
    expected: {
      type: 'TYPE_OF',
      value: {
        type: 'NAME',
        name: 'A'
      }
    }
  },
  {
    description: 'repeatable typeof name',
    input: '...typeof A',
    expected: {
      type: 'TYPE_OF',
      repeatable: true,
      value: {
        type: 'NAME',
        name: 'A'
      }
    }
  },
  {
    description: 'postfix repeatable typeof name',
    input: 'typeof A...',
    expected: {
      type: 'TYPE_OF',
      repeatable: true,
      value: {
        type: 'NAME',
        name: 'A'
      }
    }
  },
  {
    description: 'union typeof name',
    input: 'typeof A | number',
    expected: {
      type: 'UNION',
      elements: [
        {
          type: 'TYPE_OF',
          value: {
            type: 'NAME',
            name: 'A'
          }
        },
        {
          type: 'NAME',
          name: 'number'
        }
      ]
    }
  },
  {
    description: 'union with typeof name',
    input: 'number | typeof A',
    expected: {
      type: 'UNION',
      elements: [
        {
          type: 'NAME',
          name: 'number'
        },
        {
          type: 'TYPE_OF',
          value: {
            type: 'NAME',
            name: 'A'
          }
        }
      ]
    }
  },
  {
    description: 'typeof array',
    input: 'typeof N[]',
    expected: {
      type: 'TYPE_OF',
      value: {
        type: 'GENERIC',
        subject: {
          type: 'NAME',
          name: 'Array'
        },
        objects: [
          {
            type: 'NAME',
            name: 'N'
          }
        ]
      }
    }
  },
  {
    description: 'typeof as function parameter without return type should fail',
    input: 'function(typeof A)',
    shouldFail: true
  },
  {
    description: 'typeof as function parameter',
    input: 'function(typeof A): void',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'TYPE_OF',
          value: {
            type: 'NAME',
            name: 'A'
          }
        }
      ]
    }
  },
  {
    description: 'typeof as first function parameter',
    input: 'function(typeof A, number): void',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'TYPE_OF',
          value: {
            type: 'NAME',
            name: 'A'
          }
        },
        {
          type: 'NAME',
          name: 'number'
        }
      ]
    }
  },
  {
    description: 'typeof as second function parameter',
    input: 'function(number, typeof A): void',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'NAME',
          name: 'number'
        },
        {
          type: 'TYPE_OF',
          value: {
            type: 'NAME',
            name: 'A'
          }
        }
      ]
    }
  },
  {
    description: 'typeof as return of function',
    input: 'function(): typeof A',
    expected: {
      type: 'FUNCTION',
      parameters: [],
      returnType: {
        type: 'TYPE_OF',
        value: {
          type: 'NAME',
          name: 'A'
        }
      }
    }
  }
]
