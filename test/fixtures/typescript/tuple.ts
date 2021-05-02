import { Fixture } from '../Fixture'

export const tupleFixtures: Fixture[] = [
  {
    description: 'Empty tuple',
    input: '[]',
    expected: {
      type: 'TUPLE',
      elements: []
    },
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'Tuple with one element',
    input: '[x]',
    expected: {
      type: 'TUPLE',
      elements: [
        {
          type: 'NAME',
          value: 'x',
          meta: {
            reservedWord: false
          }
        }
      ]
    },
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'Tuple with 4 elements',
    input: '[it, needs, to, be]',
    expected: {
      type: 'TUPLE',
      elements: [
        {
          type: 'NAME',
          value: 'it',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'NAME',
          value: 'needs',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'NAME',
          value: 'to',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'NAME',
          value: 'be',
          meta: {
            reservedWord: false
          }
        }
      ]
    },
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'Tuple with spaces',
    input: '[ tuple, with, spaces ]',
    expected: {
      type: 'TUPLE',
      elements: [
        {
          type: 'NAME',
          value: 'tuple',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'NAME',
          value: 'with',
          meta: {
            reservedWord: true
          }
        },
        {
          type: 'NAME',
          value: 'spaces',
          meta: {
            reservedWord: false
          }
        }
      ]
    },
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'Tuple with spaces',
    input: '[ tuple, with, trailing, comma, ]',
    expected: {
      type: 'TUPLE',
      elements: [
        {
          type: 'NAME',
          value: 'tuple',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'NAME',
          value: 'with',
          meta: {
            reservedWord: true
          }
        },
        {
          type: 'NAME',
          value: 'trailing',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'NAME',
          value: 'comma',
          meta: {
            reservedWord: false
          }
        }
      ]
    },
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'Array of empty tuples',
    input: '[][]',
    expected: {
      type: 'GENERIC',
      left: {
        type: 'NAME',
        value: 'Array',
        meta: {
          reservedWord: false
        }
      },
      elements: [
        {
          type: 'TUPLE',
          elements: []
        }
      ],
      meta: {
        dot: false,
        brackets: '[]'
      }
    },
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'Array of non empty tuples',
    input: '[tuple, array][]',
    expected: {
      type: 'GENERIC',
      left: {
        type: 'NAME',
        value: 'Array',
        meta: {
          reservedWord: false
        }
      },
      elements: [
        {
          type: 'TUPLE',
          elements: [
            {
              type: 'NAME',
              value: 'tuple',
              meta: {
                reservedWord: false
              }
            },
            {
              type: 'NAME',
              value: 'array',
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
    },
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'Tuple with typeof',
    input: '[tuple, with, typeof foo]',
    expected: {
      type: 'TUPLE',
      elements: [
        {
          type: 'NAME',
          value: 'tuple',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'NAME',
          value: 'with',
          meta: {
            reservedWord: true
          }
        },
        {
          type: 'TYPE_OF',
          element: {
            type: 'NAME',
            value: 'foo',
            meta: {
              reservedWord: false
            }
          }
        }
      ]
    },
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'Tuple with keyof',
    input: '[tuple, with, keyof foo]',
    expected: {
      type: 'TUPLE',
      elements: [
        {
          type: 'NAME',
          value: 'tuple',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'NAME',
          value: 'with',
          meta: {
            reservedWord: true
          }
        },
        {
          type: 'KEY_OF',
          element: {
            type: 'NAME',
            value: 'foo',
            meta: {
              reservedWord: false
            }
          }
        }
      ]
    },
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'Tuple with typeof and keyof',
    input: '[ tuple, with, typeof foo, and, keyof foo]',
    expected: {
      type: 'TUPLE',
      elements: [
        {
          type: 'NAME',
          value: 'tuple',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'NAME',
          value: 'with',
          meta: {
            reservedWord: true
          }
        },
        {
          type: 'TYPE_OF',
          element: {
            type: 'NAME',
            value: 'foo',
            meta: {
              reservedWord: false
            }
          }
        },
        {
          type: 'NAME',
          value: 'and',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'KEY_OF',
          element: {
            type: 'NAME',
            value: 'foo',
            meta: {
              reservedWord: false
            }
          }
        }
      ]
    },
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  }
]

// // this are actually spread operators, not repeatable arguments
// {[variadic, arguments, ...tuple]}
// {[ tuple, with, typeof foo, and, ...rest ]}
// {[ tuple, with, keyof foo, and, ...rest ]}
// {[ tuple, with, typeof foo, keyof foo, and, ...rest ]}
