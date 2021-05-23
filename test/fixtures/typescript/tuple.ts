import { Fixture } from '../Fixture'

export const tupleFixtures: Fixture[] = [
  {
    description: 'Empty tuple',
    input: '[]',
    expected: {
      type: 'JsdocTypeTuple',
      elements: []
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
  },
  {
    description: 'Tuple with one element',
    input: '[x]',
    expected: {
      type: 'JsdocTypeTuple',
      elements: [
        {
          type: 'JsdocTypeName',
          value: 'x',
          meta: {
            reservedWord: false
          }
        }
      ]
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
  },
  {
    description: 'Tuple with 4 elements',
    input: '[it, needs, to, be]',
    expected: {
      type: 'JsdocTypeTuple',
      elements: [
        {
          type: 'JsdocTypeName',
          value: 'it',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'JsdocTypeName',
          value: 'needs',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'JsdocTypeName',
          value: 'to',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'JsdocTypeName',
          value: 'be',
          meta: {
            reservedWord: false
          }
        }
      ]
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
  },
  {
    description: 'Tuple with spaces',
    input: '[ tuple, with, spaces ]',
    stringified: '[tuple, with, spaces]',
    expected: {
      type: 'JsdocTypeTuple',
      elements: [
        {
          type: 'JsdocTypeName',
          value: 'tuple',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'JsdocTypeName',
          value: 'with',
          meta: {
            reservedWord: true
          }
        },
        {
          type: 'JsdocTypeName',
          value: 'spaces',
          meta: {
            reservedWord: false
          }
        }
      ]
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
  },
  {
    description: 'Tuple with spaces',
    input: '[ tuple, with, trailing, comma, ]',
    stringified: '[tuple, with, trailing, comma]',
    expected: {
      type: 'JsdocTypeTuple',
      elements: [
        {
          type: 'JsdocTypeName',
          value: 'tuple',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'JsdocTypeName',
          value: 'with',
          meta: {
            reservedWord: true
          }
        },
        {
          type: 'JsdocTypeName',
          value: 'trailing',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'JsdocTypeName',
          value: 'comma',
          meta: {
            reservedWord: false
          }
        }
      ]
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
  },
  {
    description: 'Array of empty tuples',
    input: '[][]',
    expected: {
      type: 'JsdocTypeGeneric',
      left: {
        type: 'JsdocTypeName',
        value: 'Array',
        meta: {
          reservedWord: false
        }
      },
      elements: [
        {
          type: 'JsdocTypeTuple',
          elements: []
        }
      ],
      meta: {
        dot: false,
        brackets: '[]'
      }
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
  },
  {
    description: 'Array of non empty tuples',
    input: '[tuple, array][]',
    expected: {
      type: 'JsdocTypeGeneric',
      left: {
        type: 'JsdocTypeName',
        value: 'Array',
        meta: {
          reservedWord: false
        }
      },
      elements: [
        {
          type: 'JsdocTypeTuple',
          elements: [
            {
              type: 'JsdocTypeName',
              value: 'tuple',
              meta: {
                reservedWord: false
              }
            },
            {
              type: 'JsdocTypeName',
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
  },
  {
    description: 'Tuple with typeof',
    input: '[tuple, with, typeof foo]',
    expected: {
      type: 'JsdocTypeTuple',
      elements: [
        {
          type: 'JsdocTypeName',
          value: 'tuple',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'JsdocTypeName',
          value: 'with',
          meta: {
            reservedWord: true
          }
        },
        {
          type: 'JsdocTypeTypeof',
          element: {
            type: 'JsdocTypeName',
            value: 'foo',
            meta: {
              reservedWord: false
            }
          }
        }
      ]
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
  },
  {
    description: 'Tuple with keyof',
    input: '[tuple, with, keyof foo]',
    expected: {
      type: 'JsdocTypeTuple',
      elements: [
        {
          type: 'JsdocTypeName',
          value: 'tuple',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'JsdocTypeName',
          value: 'with',
          meta: {
            reservedWord: true
          }
        },
        {
          type: 'JsdocTypeKeyof',
          element: {
            type: 'JsdocTypeName',
            value: 'foo',
            meta: {
              reservedWord: false
            }
          }
        }
      ]
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
  },
  {
    description: 'Tuple with typeof and keyof',
    input: '[ tuple, with, typeof foo, and, keyof foo]',
    stringified: '[tuple, with, typeof foo, and, keyof foo]',
    expected: {
      type: 'JsdocTypeTuple',
      elements: [
        {
          type: 'JsdocTypeName',
          value: 'tuple',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'JsdocTypeName',
          value: 'with',
          meta: {
            reservedWord: true
          }
        },
        {
          type: 'JsdocTypeTypeof',
          element: {
            type: 'JsdocTypeName',
            value: 'foo',
            meta: {
              reservedWord: false
            }
          }
        },
        {
          type: 'JsdocTypeName',
          value: 'and',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'JsdocTypeKeyof',
          element: {
            type: 'JsdocTypeName',
            value: 'foo',
            meta: {
              reservedWord: false
            }
          }
        }
      ]
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
  },
  {
    description: 'Tuple with spreaded tuple',
    input: '[variadic, arguments, ...tuple]',
    expected: {
      type: 'JsdocTypeTuple',
      elements: [
        {
          type: 'JsdocTypeName',
          value: 'variadic',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'JsdocTypeName',
          value: 'arguments',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'JsdocTypeVariadic',
          element: {
            type: 'JsdocTypeName',
            value: 'tuple',
            meta: {
              reservedWord: false
            }
          },
          meta: {
            squareBrackets: false,
            position: 'prefix'
          }
        }
      ]
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
  },
  {
    description: 'Tuple with spreaded tuple and typeof',
    input: '[ tuple, with, typeof foo, and, ...rest ]',
    stringified: '[tuple, with, typeof foo, and, ...rest]',
    expected: {
      type: 'JsdocTypeTuple',
      elements: [
        {
          type: 'JsdocTypeName',
          value: 'tuple',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'JsdocTypeName',
          value: 'with',
          meta: {
            reservedWord: true
          }
        },
        {
          type: 'JsdocTypeTypeof',
          element: {
            type: 'JsdocTypeName',
            value: 'foo',
            meta: {
              reservedWord: false
            }
          }
        },
        {
          type: 'JsdocTypeName',
          value: 'and',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'JsdocTypeVariadic',
          element: {
            type: 'JsdocTypeName',
            value: 'rest',
            meta: {
              reservedWord: false
            }
          },
          meta: {
            squareBrackets: false,
            position: 'prefix'
          }
        }
      ]
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
  },
  {
    description: 'Tuple with spreaded tuple and keyof',
    input: '[ tuple, with, keyof foo, and, ...rest ]',
    stringified: '[tuple, with, keyof foo, and, ...rest]',
    expected: {
      type: 'JsdocTypeTuple',
      elements: [
        {
          type: 'JsdocTypeName',
          value: 'tuple',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'JsdocTypeName',
          value: 'with',
          meta: {
            reservedWord: true
          }
        },
        {
          type: 'JsdocTypeKeyof',
          element: {
            type: 'JsdocTypeName',
            value: 'foo',
            meta: {
              reservedWord: false
            }
          }
        },
        {
          type: 'JsdocTypeName',
          value: 'and',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'JsdocTypeVariadic',
          element: {
            type: 'JsdocTypeName',
            value: 'rest',
            meta: {
              reservedWord: false
            }
          },
          meta: {
            squareBrackets: false,
            position: 'prefix'
          }
        }
      ]
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
  },
  {
    description: 'Tuple with spreaded tuple and typeof and keyof',
    input: '[ tuple, with, typeof foo, keyof foo, and, ...rest ]',
    stringified: '[tuple, with, typeof foo, keyof foo, and, ...rest]',
    expected: {
      type: 'JsdocTypeTuple',
      elements: [
        {
          type: 'JsdocTypeName',
          value: 'tuple',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'JsdocTypeName',
          value: 'with',
          meta: {
            reservedWord: true
          }
        },
        {
          type: 'JsdocTypeTypeof',
          element: {
            type: 'JsdocTypeName',
            value: 'foo',
            meta: {
              reservedWord: false
            }
          }
        },
        {
          type: 'JsdocTypeKeyof',
          element: {
            type: 'JsdocTypeName',
            value: 'foo',
            meta: {
              reservedWord: false
            }
          }
        },
        {
          type: 'JsdocTypeName',
          value: 'and',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'JsdocTypeVariadic',
          element: {
            type: 'JsdocTypeName',
            value: 'rest',
            meta: {
              reservedWord: false
            }
          },
          meta: {
            squareBrackets: false,
            position: 'prefix'
          }
        }
      ]
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
