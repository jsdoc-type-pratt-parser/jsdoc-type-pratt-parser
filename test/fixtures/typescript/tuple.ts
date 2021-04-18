import { Fixture } from '../Fixture'

export const tupleFixtures: Fixture[] = [
  {
    description: 'Empty tuple',
    input: '[]',
    expected: {
      type: 'TUPLE',
      elements: []
    }
  },
  {
    description: 'Tuple with one element',
    input: '[x]',
    expected: {
      type: 'TUPLE',
      elements: [
        {
          type: 'NAME',
          name: 'x',
          meta: {
            reservedWord: false
          }
        }
      ]
    }
  },
  {
    description: 'Tuple with 4 elements',
    input: '[it, needs, to, be]',
    expected: {
      type: 'TUPLE',
      elements: [
        {
          type: 'NAME',
          name: 'it',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'NAME',
          name: 'needs',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'NAME',
          name: 'to',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'NAME',
          name: 'be',
          meta: {
            reservedWord: false
          }
        }
      ]
    }
  },
  {
    description: 'Tuple with spaces',
    input: '[ tuple, with, spaces ]',
    expected: {
      type: 'TUPLE',
      elements: [
        {
          type: 'NAME',
          name: 'tuple',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'NAME',
          name: 'with',
          meta: {
            reservedWord: true
          }
        },
        {
          type: 'NAME',
          name: 'spaces',
          meta: {
            reservedWord: false
          }
        }
      ]
    }
  },
  {
    description: 'Tuple with spaces',
    input: '[ tuple, with, trailing, comma, ]',
    expected: {
      type: 'TUPLE',
      elements: [
        {
          type: 'NAME',
          name: 'tuple',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'NAME',
          name: 'with',
          meta: {
            reservedWord: true
          }
        },
        {
          type: 'NAME',
          name: 'trailing',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'NAME',
          name: 'comma',
          meta: {
            reservedWord: false
          }
        }
      ]
    }
  },
  {
    description: 'Array of empty tuples',
    input: '[][]',
    expected: {
      type: 'GENERIC',
      subject: {
        type: 'NAME',
        name: 'Array',
        meta: {
          reservedWord: false
        }
      },
      objects: [
        {
          type: 'TUPLE',
          elements: []
        }
      ],
      meta: {
        dot: false,
        brackets: '[]'
      }
    }
  },
  {
    description: 'Array of non empty tuples',
    input: '[tuple, array][]',
    expected: {
      type: 'GENERIC',
      subject: {
        type: 'NAME',
        name: 'Array',
        meta: {
          reservedWord: false
        }
      },
      objects: [
        {
          type: 'TUPLE',
          elements: [
            {
              type: 'NAME',
              name: 'tuple',
              meta: {
                reservedWord: false
              }
            },
            {
              type: 'NAME',
              name: 'array',
              meta: {
                reservedWord: false
              }
            }
          ]
        }
      ],
      meta: {
        dot: false,
        brackets: '[]'
      }
    }
  },
  {
    description: 'Tuple with typeof',
    input: '[tuple, with, typeof foo]',
    expected: {
      type: 'TUPLE',
      elements: [
        {
          type: 'NAME',
          name: 'tuple',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'NAME',
          name: 'with',
          meta: {
            reservedWord: true
          }
        },
        {
          type: 'TYPE_OF',
          value: {
            type: 'NAME',
            name: 'foo',
            meta: {
              reservedWord: false
            }
          }
        }
      ]
    }
  },
  {
    description: 'Tuple with keyof',
    input: '[tuple, with, keyof foo]',
    expected: {
      type: 'TUPLE',
      elements: [
        {
          type: 'NAME',
          name: 'tuple',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'NAME',
          name: 'with',
          meta: {
            reservedWord: true
          }
        },
        {
          type: 'KEY_OF',
          value: {
            type: 'NAME',
            name: 'foo',
            meta: {
              reservedWord: false
            }
          }
        }
      ]
    }
  },
  {
    description: 'Tuple with typeof and keyof',
    input: '[ tuple, with, typeof foo, and, keyof foo]',
    expected: {
      type: 'TUPLE',
      elements: [
        {
          type: 'NAME',
          name: 'tuple',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'NAME',
          name: 'with',
          meta: {
            reservedWord: true
          }
        },
        {
          type: 'TYPE_OF',
          value: {
            type: 'NAME',
            name: 'foo',
            meta: {
              reservedWord: false
            }
          }
        },
        {
          type: 'NAME',
          name: 'and',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'KEY_OF',
          value: {
            type: 'NAME',
            name: 'foo',
            meta: {
              reservedWord: false
            }
          }
        }
      ]
    }
  }
]

// // this are actually spread operators, not repeatable arguments
// {[variadic, arguments, ...tuple]}
// {[ tuple, with, typeof foo, and, ...rest ]}
// {[ tuple, with, keyof foo, and, ...rest ]}
// {[ tuple, with, typeof foo, keyof foo, and, ...rest ]}
