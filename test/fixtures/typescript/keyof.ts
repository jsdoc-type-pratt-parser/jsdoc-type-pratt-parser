import { Fixture } from '../Fixture'

export const keyofFixtures: Fixture[] = [
  {
    description: 'keyof name',
    input: 'keyof A',
    expected: {
      type: 'KEY_OF',
      element: {
        type: 'NAME',
        value: 'A',
        meta: {
          reservedWord: false
        }
      }
    },
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'keyof',
    input: 'keyof', // is this really valid input?
    expected: {
      type: 'KEY_OF'
    },
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'generic with keyof',
    input: 'X<keyof>',
    expected: {
      type: 'GENERIC',
      left: {
        type: 'NAME',
        value: 'X',
        meta: {
          reservedWord: false
        }
      },
      elements: [{
        type: 'KEY_OF'
      }],
      meta: {
        dot: false,
        brackets: '<>'
      }
    },
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'generic with keyof name',
    input: 'X<keyof A>',
    expected: {
      type: 'GENERIC',
      left: {
        type: 'NAME',
        value: 'X',
        meta: {
          reservedWord: false
        }
      },
      elements: [{
        type: 'KEY_OF',
        element: {
          type: 'NAME',
          value: 'A',
          meta: {
            reservedWord: false
          }
        }
      }],
      meta: {
        dot: false,
        brackets: '<>'
      }
    },
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'generic keyof name in parenthesis',
    input: '(keyof X)<A>',
    expected: {
      type: 'GENERIC',
      left: {
        type: 'KEY_OF',
        element: {
          type: 'NAME',
          value: 'X',
          meta: {
            reservedWord: false
          }
        }
      },
      elements: [
        {
          type: 'NAME',
          value: 'A',
          meta: {
            reservedWord: false
          }
        }
      ],
      meta: {
        dot: false,
        brackets: '<>'
      }
    },
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'keyof name in parenthesis',
    input: '(keyof A)',
    expected: {
      type: 'KEY_OF',
      element: {
        type: 'NAME',
        value: 'A',
        meta: {
          reservedWord: false
        }
      }
    },
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'repeatable keyof name',
    input: '...keyof A',
    expected: {
      type: 'VARIADIC',
      element: {
        type: 'KEY_OF',
        element: {
          type: 'NAME',
          value: 'A',
          meta: {
            reservedWord: false
          }
        }
      },
      meta: {
        squareBrackets: false,
        position: 'PREFIX'
      }
    },
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'postfix repeatable keyof name',
    input: 'keyof A...',
    expected: {
      type: 'VARIADIC',
      element: {
        type: 'KEY_OF',
        element: {
          type: 'NAME',
          value: 'A',
          meta: {
            reservedWord: false
          }
        }
      },
      meta: {
        squareBrackets: false,
        position: 'SUFFIX'
      }
    },
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'union keyof name',
    input: 'keyof A | number',
    expected: {
      type: 'UNION',
      elements: [
        {
          type: 'KEY_OF',
          element: {
            type: 'NAME',
            value: 'A',
            meta: {
              reservedWord: false
            }
          }
        },
        {
          type: 'NAME',
          value: 'number',
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
    description: 'union with keyof name',
    input: 'number | keyof A',
    expected: {
      type: 'UNION',
      elements: [
        {
          type: 'NAME',
          value: 'number',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'KEY_OF',
          element: {
            type: 'NAME',
            value: 'A',
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
    description: 'keyof array',
    input: 'keyof N[]',
    expected: {
      type: 'KEY_OF',
      element: {
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
            type: 'NAME',
            value: 'N',
            meta: {
              reservedWord: false
            }
          }
        ],
        meta: {
          dot: false,
          brackets: '[]'
        }
      }
    },
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'keyof as function parameter without return should fail',
    input: 'function(keyof A)',
    modes: [],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'keyof as function parameter',
    input: 'function(keyof A): void',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'KEY_OF',
          element: {
            type: 'NAME',
            value: 'A',
            meta: {
              reservedWord: false
            }
          }
        }
      ],
      meta: {
        arrow: false
      }
    },
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'keyof as first function parameter',
    input: 'function(keyof A, number): void',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'KEY_OF',
          element: {
            type: 'NAME',
            value: 'A',
            meta: {
              reservedWord: false
            }
          }
        },
        {
          type: 'NAME',
          value: 'number',
          meta: {
            reservedWord: false
          }
        }
      ],
      meta: {
        arrow: false
      }
    },
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'keyof as second function parameter',
    input: 'function(number, keyof A): void',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'NAME',
          value: 'number',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'KEY_OF',
          element: {
            type: 'NAME',
            value: 'A',
            meta: {
              reservedWord: false
            }
          }
        }
      ],
      meta: {
        arrow: false
      }
    },
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'keyof as return of function',
    input: 'function(): keyof A',
    expected: {
      type: 'FUNCTION',
      parameters: [],
      returnType: {
        type: 'KEY_OF',
        element: {
          type: 'NAME',
          value: 'A',
          meta: {
            reservedWord: false
          }
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
