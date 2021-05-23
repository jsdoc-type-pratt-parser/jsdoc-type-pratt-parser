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
          value: 'x'
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
          value: 'it'
        },
        {
          type: 'JsdocTypeName',
          value: 'needs'
        },
        {
          type: 'JsdocTypeName',
          value: 'to'
        },
        {
          type: 'JsdocTypeName',
          value: 'be'
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
          value: 'tuple'
        },
        {
          type: 'JsdocTypeName',
          value: 'with'
        },
        {
          type: 'JsdocTypeName',
          value: 'spaces'
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
          value: 'tuple'
        },
        {
          type: 'JsdocTypeName',
          value: 'with'
        },
        {
          type: 'JsdocTypeName',
          value: 'trailing'
        },
        {
          type: 'JsdocTypeName',
          value: 'comma'
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
        value: 'Array'
      },
      elements: [
        {
          type: 'JsdocTypeTuple',
          elements: []
        }
      ],
      meta: {
        dot: false,
        brackets: 'square'
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
        value: 'Array'
      },
      elements: [
        {
          type: 'JsdocTypeTuple',
          elements: [
            {
              type: 'JsdocTypeName',
              value: 'tuple'
            },
            {
              type: 'JsdocTypeName',
              value: 'array'
            }
          ]
        }
      ],
      meta: {
        dot: false,
        brackets: 'square'
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
          value: 'tuple'
        },
        {
          type: 'JsdocTypeName',
          value: 'with'
        },
        {
          type: 'JsdocTypeTypeof',
          element: {
            type: 'JsdocTypeName',
            value: 'foo'
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
          value: 'tuple'
        },
        {
          type: 'JsdocTypeName',
          value: 'with'
        },
        {
          type: 'JsdocTypeKeyof',
          element: {
            type: 'JsdocTypeName',
            value: 'foo'
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
          value: 'tuple'
        },
        {
          type: 'JsdocTypeName',
          value: 'with'
        },
        {
          type: 'JsdocTypeTypeof',
          element: {
            type: 'JsdocTypeName',
            value: 'foo'
          }
        },
        {
          type: 'JsdocTypeName',
          value: 'and'
        },
        {
          type: 'JsdocTypeKeyof',
          element: {
            type: 'JsdocTypeName',
            value: 'foo'
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
          value: 'variadic'
        },
        {
          type: 'JsdocTypeName',
          value: 'arguments'
        },
        {
          type: 'JsdocTypeVariadic',
          element: {
            type: 'JsdocTypeName',
            value: 'tuple'
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
          value: 'tuple'
        },
        {
          type: 'JsdocTypeName',
          value: 'with'
        },
        {
          type: 'JsdocTypeTypeof',
          element: {
            type: 'JsdocTypeName',
            value: 'foo'
          }
        },
        {
          type: 'JsdocTypeName',
          value: 'and'
        },
        {
          type: 'JsdocTypeVariadic',
          element: {
            type: 'JsdocTypeName',
            value: 'rest'
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
          value: 'tuple'
        },
        {
          type: 'JsdocTypeName',
          value: 'with'
        },
        {
          type: 'JsdocTypeKeyof',
          element: {
            type: 'JsdocTypeName',
            value: 'foo'
          }
        },
        {
          type: 'JsdocTypeName',
          value: 'and'
        },
        {
          type: 'JsdocTypeVariadic',
          element: {
            type: 'JsdocTypeName',
            value: 'rest'
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
          value: 'tuple'
        },
        {
          type: 'JsdocTypeName',
          value: 'with'
        },
        {
          type: 'JsdocTypeTypeof',
          element: {
            type: 'JsdocTypeName',
            value: 'foo'
          }
        },
        {
          type: 'JsdocTypeKeyof',
          element: {
            type: 'JsdocTypeName',
            value: 'foo'
          }
        },
        {
          type: 'JsdocTypeName',
          value: 'and'
        },
        {
          type: 'JsdocTypeVariadic',
          element: {
            type: 'JsdocTypeName',
            value: 'rest'
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
