import { Fixture } from '../Fixture'

export const arrowFunctionFixtures: Fixture[] = [
  {
    description: 'arrow with special any type',
    input: '(x: *) => *',
    expected: {
      type: 'FUNCTION',
      arrow: true,
      parameters: [
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            name: 'x'
          },
          value: {
            type: 'ALL'
          }
        }
      ],
      returnType: {
        type: 'ALL'
      }
    }
  },
  {
    description: 'arrow with one parameter and return type',
    input: '(x: number) => string',
    expected: {
      type: 'FUNCTION',
      arrow: true,
      parameters: [
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            name: 'x'
          },
          value: {
            type: 'NAME',
            name: 'number'
          }
        }
      ],
      returnType: {
        type: 'NAME',
        name: 'string'
      }
    }
  },
  {
    description: 'arrow with multiple parameters and a return type',
    input: '(x: number, y: string, z: Class) => string',
    expected: {
      type: 'FUNCTION',
      arrow: true,
      parameters: [
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            name: 'x'
          },
          value: {
            type: 'NAME',
            name: 'number'
          }
        },
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            name: 'y'
          },
          value: {
            type: 'NAME',
            name: 'string'
          }
        },
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            name: 'z'
          },
          value: {
            type: 'NAME',
            name: 'Class'
          }
        }
      ],
      returnType: {
        type: 'NAME',
        name: 'string'
      }
    }
  },
  {
    description: 'arrow without parameter and return type',
    input: '() => string',
    expected: {
      type: 'FUNCTION',
      arrow: true,
      parameters: [],
      returnType: {
        type: 'NAME',
        name: 'string'
      }
    }
  },
  {
    description: 'function with arrow as return type',
    input: 'function(): () => string',
    expected: {
      type: 'FUNCTION',
      parameters: [],
      returnType: {
        type: 'FUNCTION',
        arrow: true,
        parameters: [],
        returnType: {
          type: 'NAME',
          name: 'string'
        }
      }
    }
  },
  {
    description: 'function with arrow as parameter',
    input: 'function(() => string): void',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'FUNCTION',
          arrow: true,
          parameters: [],
          returnType: {
            type: 'NAME',
            name: 'string'
          }
        }
      ]
    }
  },
  {
    description: 'arrow function parameter list with trailing comma',
    input: '( arrow: Function, with: TrailingComma, ) => string',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            name: 'arrow'
          },
          value: {
            type: 'NAME',
            name: 'Function'
          }
        },
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            name: 'with'
          },
          value: {
            type: 'NAME',
            name: 'TrailingComma'
          }
        }
      ]
    }
  },
  {
    description: 'arrow as generic type',
    input: 'X<() => string>',
    expected: {
      type: 'GENERIC',
      subject: {
        type: 'NAME',
        name: 'X'
      },
      objects: [
        {
          type: 'FUNCTION',
          arrow: true,
          parameters: [],
          returnType: {
            type: 'NAME',
            name: 'string'
          }
        }
      ]
    }
  },
  {
    description: 'arrow returning void',
    input: '() => void',
    expected: {
      type: 'FUNCTION',
      arrow: true,
      parameters: []
    }
  },
  {
    description: 'arrow returning arrow',
    input: '() => () => void',
    expected: {
      type: 'FUNCTION',
      arrow: true,
      parameters: [],
      returnType: {
        type: 'FUNCTION',
        arrow: true,
        parameters: []
      }
    }
  },
  {
    description: 'arrow returning arrow with paramters',
    input: '(a: number) => (b: string) => boolean',
    expected: {
      type: 'FUNCTION',
      arrow: true,
      parameters: [
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            name: 'a'
          },
          value: {
            type: 'NAME',
            name: 'number'
          }
        }
      ],
      returnType: {
        type: 'FUNCTION',
        arrow: true,
        parameters: [
          {
            type: 'KEY_VALUE',
            key: {
              type: 'NAME',
              name: 'b'
            },
            value: {
              type: 'NAME',
              name: 'string'
            }
          }
        ],
        returnType: {
          type: 'NAME',
          name: 'boolean'
        }
      }
    }
  }
]

// TODO:
// {new (x: number) => string} // should fail
