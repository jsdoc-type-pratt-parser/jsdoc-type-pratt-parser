import { Fixture } from '../Fixture'

export const keyofFixtures: Fixture[] = [
  {
    description: 'keyof name',
    input: 'keyof A',
    expected: {
      type: 'KEY_OF',
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
    description: 'keyof',
    input: 'keyof', // is this really valid input?
    expected: {
      type: 'KEY_OF'
    }
  },
  {
    description: 'generic with keyof',
    input: 'X<keyof>',
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
        type: 'KEY_OF'
      }],
      meta: {
        dot: false,
        brackets: '<>'
      }
    }
  },
  {
    description: 'generic with keyof name',
    input: 'X<keyof A>',
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
        type: 'KEY_OF',
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
    description: 'generic keyof name in parenthesis',
    input: '(keyof X)<A>',
    expected: {
      type: 'GENERIC',
      subject: {
        type: 'KEY_OF',
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
    description: 'keyof name in parenthesis',
    input: '(keyof A)',
    expected: {
      type: 'KEY_OF',
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
    description: 'repeatable keyof name',
    input: '...keyof A',
    expected: {
      type: 'VARIADIC',
      element: {
        type: 'KEY_OF',
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
    description: 'postfix repeatable keyof name',
    input: 'keyof A...',
    expected: {
      type: 'VARIADIC',
      element: {
        type: 'KEY_OF',
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
    description: 'union keyof name',
    input: 'keyof A | number',
    expected: {
      type: 'UNION',
      elements: [
        {
          type: 'KEY_OF',
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
    description: 'union with keyof name',
    input: 'number | keyof A',
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
          type: 'KEY_OF',
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
    description: 'keyof array',
    input: 'keyof N[]',
    expected: {
      type: 'KEY_OF',
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
    description: 'keyof as function parameter without return should fail',
    input: 'function(keyof A)',
    shouldFail: true
  },
  {
    description: 'keyof as function parameter',
    input: 'function(keyof A): void',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'KEY_OF',
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
    description: 'keyof as first function parameter',
    input: 'function(keyof A, number): void',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'KEY_OF',
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
    description: 'keyof as second function parameter',
    input: 'function(number, keyof A): void',
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
          type: 'KEY_OF',
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
    description: 'keyof as return of function',
    input: 'function(): keyof A',
    expected: {
      type: 'FUNCTION',
      parameters: [],
      returnType: {
        type: 'KEY_OF',
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
