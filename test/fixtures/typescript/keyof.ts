import { Fixture } from '../Fixture'

export const keyofFixtures: Fixture[] = [
  {
    description: 'keyof name',
    input: 'keyof A',
    expected: {
      type: 'JsdocTypeKeyof',
      element: {
        type: 'JsdocTypeName',
        value: 'A'
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
    description: 'keyof',
    input: 'keyof',
    expected: {
      type: 'JsdocTypeName',
      value: 'keyof'
    },
    modes: ['jsdoc', 'closure'],
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'differ',
      jsdoc: 'differ',
      typescript: 'differ',
      permissive: 'differ'
    }
  },
  {
    description: 'generic with keyof',
    input: 'X<keyof>',
    expected: {
      type: 'JsdocTypeGeneric',
      left: {
        type: 'JsdocTypeName',
        value: 'X'
      },
      elements: [{
        type: 'JsdocTypeName',
        value: 'keyof'
      }],
      meta: {
        dot: false,
        brackets: 'angle'
      }
    },
    modes: ['jsdoc', 'closure'],
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'differ',
      jsdoc: 'differ',
      typescript: 'differ',
      permissive: 'differ'
    }
  },
  {
    description: 'generic with keyof name',
    input: 'X<keyof A>',
    expected: {
      type: 'JsdocTypeGeneric',
      left: {
        type: 'JsdocTypeName',
        value: 'X'
      },
      elements: [{
        type: 'JsdocTypeKeyof',
        element: {
          type: 'JsdocTypeName',
          value: 'A'
        }
      }],
      meta: {
        dot: false,
        brackets: 'angle'
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
  // {
  //   description: 'generic keyof name in parenthesis',
  //   input: '(keyof X)<A>',
  //   expected: {
  //     type: 'JsdocTypeGeneric',
  //     left: {
  //       type: 'JsdocTypeKeyof',
  //       element: {
  //         type: 'JsdocTypeName',
  //         value: 'X',
  //         meta: {
  //           reservedWord: false
  //         }
  //       }
  //     },
  //     elements: [
  //       {
  //         type: 'JsdocTypeName',
  //         value: 'A',
  //         meta: {
  //           reservedWord: false
  //         }
  //       }
  //     ],
  //     meta: {
  //       dot: false,
  //       brackets: 'angle'
  //     }
  //   },
  //   modes: ['typescript'],
  //   catharsis: {
  //     closure: 'fail',
  //     jsdoc: 'fail'
  //   },
  //   jtp: {
  //     closure: 'fail',
  //     jsdoc: 'fail',
  //     typescript: 'typescript',
  //     permissive: 'typescript'
  //   }
  // },
  {
    description: 'keyof name in parenthesis',
    input: '(keyof A)',
    expected: {
      type: 'JsdocTypeParenthesis',
      element: {
        type: 'JsdocTypeKeyof',
        element: {
          type: 'JsdocTypeName',
          value: 'A'
        }
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
    description: 'repeatable keyof name',
    input: '...keyof A',
    expected: {
      type: 'JsdocTypeVariadic',
      element: {
        type: 'JsdocTypeKeyof',
        element: {
          type: 'JsdocTypeName',
          value: 'A'
        }
      },
      meta: {
        squareBrackets: false,
        position: 'prefix'
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
    description: 'postfix repeatable keyof name',
    input: 'keyof A...',
    expected: {
      type: 'JsdocTypeVariadic',
      element: {
        type: 'JsdocTypeKeyof',
        element: {
          type: 'JsdocTypeName',
          value: 'A'
        }
      },
      meta: {
        squareBrackets: false,
        position: 'suffix'
      }
    },
    modes: [],
    catharsis: {
      closure: 'fail',
      jsdoc: 'fail'
    },
    jtp: {
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'differ',
      permissive: 'differ'
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'union keyof name',
    input: 'keyof A | number',
    expected: {
      type: 'JsdocTypeUnion',
      elements: [
        {
          type: 'JsdocTypeKeyof',
          element: {
            type: 'JsdocTypeName',
            value: 'A'
          }
        },
        {
          type: 'JsdocTypeName',
          value: 'number'
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
      typescript: 'differ',
      permissive: 'differ'
    }
  },
  {
    description: 'union with keyof name',
    input: 'number | keyof A',
    expected: {
      type: 'JsdocTypeUnion',
      elements: [
        {
          type: 'JsdocTypeName',
          value: 'number'
        },
        {
          type: 'JsdocTypeKeyof',
          element: {
            type: 'JsdocTypeName',
            value: 'A'
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
    description: 'keyof array',
    input: 'keyof N[]',
    expected: {
      type: 'JsdocTypeKeyof',
      element: {
        type: 'JsdocTypeGeneric',
        left: {
          type: 'JsdocTypeName',
          value: 'Array'
        },
        elements: [
          {
            type: 'JsdocTypeName',
            value: 'N'
          }
        ],
        meta: {
          dot: false,
          brackets: 'square'
        }
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
    description: 'keyof as function parameter without return should fail',
    input: 'function(keyof A)',
    modes: [],
    catharsis: {
      closure: 'fail',
      jsdoc: 'fail'
    },
    jtp: {
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'differ',
      permissive: 'differ'
    }
  },
  {
    description: 'keyof as function parameter',
    input: 'function(keyof A): void',
    expected: {
      type: 'JsdocTypeFunction',
      parameters: [
        {
          type: 'JsdocTypeKeyof',
          element: {
            type: 'JsdocTypeName',
            value: 'A'
          }
        }
      ],
      returnType: {
        type: 'JsdocTypeName',
        value: 'void'
      },
      arrow: false,
      parenthesis: true
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
    description: 'keyof as first function parameter',
    input: 'function(keyof A, number): void',
    expected: {
      type: 'JsdocTypeFunction',
      parameters: [
        {
          type: 'JsdocTypeKeyof',
          element: {
            type: 'JsdocTypeName',
            value: 'A'
          }
        },
        {
          type: 'JsdocTypeName',
          value: 'number'
        }
      ],
      returnType: {
        type: 'JsdocTypeName',
        value: 'void'
      },
      arrow: false,
      parenthesis: true
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
    description: 'keyof as second function parameter',
    input: 'function(number, keyof A): void',
    expected: {
      type: 'JsdocTypeFunction',
      parameters: [
        {
          type: 'JsdocTypeName',
          value: 'number'
        },
        {
          type: 'JsdocTypeKeyof',
          element: {
            type: 'JsdocTypeName',
            value: 'A'
          }
        }
      ],
      returnType: {
        type: 'JsdocTypeName',
        value: 'void'
      },
      arrow: false,
      parenthesis: true
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
    description: 'keyof as return of function',
    input: 'function(): keyof A',
    expected: {
      type: 'JsdocTypeFunction',
      parameters: [],
      returnType: {
        type: 'JsdocTypeKeyof',
        element: {
          type: 'JsdocTypeName',
          value: 'A'
        }
      },
      arrow: false,
      parenthesis: true
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
