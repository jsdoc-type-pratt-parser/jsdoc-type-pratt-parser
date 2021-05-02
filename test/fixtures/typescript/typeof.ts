import { Fixture } from '../Fixture'

export const typeOfFixtures: Fixture[] = [
  {
    description: 'typeof name',
    input: 'typeof A',
    expected: {
      type: 'TYPE_OF',
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
    description: 'typeof',
    input: 'typeof',
    expected: {
      type: 'TYPE_OF'
    },
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'generic with typeof',
    input: 'X<typeof>',
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
        type: 'TYPE_OF'
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
    description: 'generic with typeof name',
    input: 'X<typeof A>',
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
        type: 'TYPE_OF',
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
    description: 'generic typeof name in parenthesis',
    input: '(typeof X)<A>',
    expected: {
      type: 'GENERIC',
      left: {
        type: 'TYPE_OF',
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
    description: 'typeof name in parenthesis',
    input: '(typeof A)',
    expected: {
      type: 'TYPE_OF',
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
    description: 'repeatable typeof name',
    input: '...typeof A',
    expected: {
      type: 'VARIADIC',
      element: {
        type: 'TYPE_OF',
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
    description: 'postfix repeatable typeof name',
    input: 'typeof A...',
    expected: {
      type: 'VARIADIC',
      element: {
        type: 'TYPE_OF',
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
    modes: [],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive'] // NOTE: This seems to be a JTP error
  },
  {
    description: 'union typeof name',
    input: 'typeof A | number',
    expected: {
      type: 'UNION',
      elements: [
        {
          type: 'TYPE_OF',
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
    description: 'union with typeof name',
    input: 'number | typeof A',
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
          type: 'TYPE_OF',
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
    description: 'typeof array',
    input: 'typeof N[]',
    expected: {
      type: 'TYPE_OF',
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
    description: 'typeof as function parameter without return type should fail',
    input: 'function(typeof A)',
    modes: [],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'typeof as function parameter',
    input: 'function(typeof A): void',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'TYPE_OF',
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
    description: 'typeof as first function parameter',
    input: 'function(typeof A, number): void',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'TYPE_OF',
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
    description: 'typeof as second function parameter',
    input: 'function(number, typeof A): void',
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
          type: 'TYPE_OF',
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
    description: 'typeof as return of function',
    input: 'function(): typeof A',
    expected: {
      type: 'FUNCTION',
      parameters: [],
      returnType: {
        type: 'TYPE_OF',
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
