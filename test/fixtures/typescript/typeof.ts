import { Fixture } from '../Fixture'

export const typeOfFixtures: Fixture[] = [
  {
    description: 'typeof name',
    input: 'typeof A',
    expected: {
      type: 'TYPE_OF',
      value: {
        type: 'NAME',
        name: 'A',
        meta: {
          reservedWord: false
        }
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
        name: 'X',
        meta: {
          reservedWord: false
        }
      },
      objects: [{
        type: 'TYPE_OF'
      }],
      meta: {
        dot: false,
        brackets: '<>'
      }
    }
  },
  {
    description: 'generic with typeof name',
    input: 'X<typeof A>',
    expected: {
      type: 'GENERIC',
      subject: {
        type: 'NAME',
        name: 'X',
        meta: {
          reservedWord: false
        }
      },
      objects: [{
        type: 'TYPE_OF',
        value: {
          type: 'NAME',
          name: 'A',
          meta: {
            reservedWord: false
          }
        }
      }],
      meta: {
        dot: false,
        brackets: '<>'
      }
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
          name: 'X',
          meta: {
            reservedWord: false
          }
        }
      },
      objects: [
        {
          type: 'NAME',
          name: 'A',
          meta: {
            reservedWord: false
          }
        }
      ],
      meta: {
        dot: false,
        brackets: '<>'
      }
    }
  },
  {
    description: 'typeof name in parenthesis',
    input: '(typeof A)',
    expected: {
      type: 'TYPE_OF',
      value: {
        type: 'NAME',
        name: 'A',
        meta: {
          reservedWord: false
        }
      }
    }
  },
  {
    description: 'repeatable typeof name',
    input: '...typeof A',
    expected: {
      type: 'VARIADIC',
      element: {
        type: 'TYPE_OF',
        value: {
          type: 'NAME',
          name: 'A',
          meta: {
            reservedWord: false
          }
        }
      },
      meta: {
        squareBrackets: false,
        position: 'PREFIX'
      }
    }
  },
  {
    description: 'postfix repeatable typeof name',
    input: 'typeof A...',
    expected: {
      type: 'VARIADIC',
      element: {
        type: 'TYPE_OF',
        value: {
          type: 'NAME',
          name: 'A',
          meta: {
            reservedWord: false
          }
        }
      },
      meta: {
        squareBrackets: false,
        position: 'SUFFIX'
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
            name: 'A',
            meta: {
              reservedWord: false
            }
          }
        },
        {
          type: 'NAME',
          name: 'number',
          meta: {
            reservedWord: false
          }
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
          name: 'number',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'TYPE_OF',
          value: {
            type: 'NAME',
            name: 'A',
            meta: {
              reservedWord: false
            }
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
          name: 'Array',
          meta: {
            reservedWord: false
          }
        },
        objects: [
          {
            type: 'NAME',
            name: 'N',
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
            name: 'A',
            meta: {
              reservedWord: false
            }
          }
        }
      ],
      meta: {
        arrow: false
      }
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
            name: 'A',
            meta: {
              reservedWord: false
            }
          }
        },
        {
          type: 'NAME',
          name: 'number',
          meta: {
            reservedWord: false
          }
        }
      ],
      meta: {
        arrow: false
      }
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
          name: 'number',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'TYPE_OF',
          value: {
            type: 'NAME',
            name: 'A',
            meta: {
              reservedWord: false
            }
          }
        }
      ],
      meta: {
        arrow: false
      }
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
          name: 'A',
          meta: {
            reservedWord: false
          }
        }
      },
      meta: {
        arrow: false
      }
    }
  }
]
