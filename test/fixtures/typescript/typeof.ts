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
    modes: ['typescript', 'closure'],
    catharsis: {
      closure: 'fail',
      jsdoc: 'fail'
    }, // NOTE: This seems to be a Catharsis error
    jtp: {
      closure: 'closure',
      jsdoc: 'fail',
      typescript: 'typescript',
      permissive: 'closure'
    }
  },
  {
    description: 'typeof',
    input: 'typeof',
    modes: [],
    catharsis: {
      closure: 'differ',
      jsdoc: 'differ'
    },
    jtp: {
      closure: 'differ',
      jsdoc: 'differ',
      typescript: 'differ',
      permissive: 'differ'
    }
  },
  {
    description: 'generic with typeof',
    input: 'X<typeof>',
    modes: [],
    catharsis: {
      closure: 'differ',
      jsdoc: 'differ'
    },
    jtp: {
      closure: 'differ',
      jsdoc: 'differ',
      typescript: 'differ',
      permissive: 'differ'
    }
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
    modes: ['typescript', 'closure'],
    catharsis: {
      closure: 'fail',
      jsdoc: 'fail'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'fail',
      typescript: 'typescript',
      permissive: 'typescript'
    }
  },
  // {
  //   description: 'generic typeof name in parenthesis',
  //   input: '(typeof X)<A>',
  //   expected: {
  //     type: 'GENERIC',
  //     left: {
  //       type: 'TYPE_OF',
  //       element: {
  //         type: 'NAME',
  //         value: 'X',
  //         meta: {
  //           reservedWord: false
  //         }
  //       }
  //     },
  //     elements: [
  //       {
  //         type: 'NAME',
  //         value: 'A',
  //         meta: {
  //           reservedWord: false
  //         }
  //       }
  //     ],
  //     meta: {
  //       dot: false,
  //       brackets: '<>'
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
    description: 'typeof name in parenthesis',
    input: '(typeof A)',
    expected: {
      type: 'PARENTHESIS',
      element: {
        type: 'TYPE_OF',
        element: {
          type: 'NAME',
          value: 'A',
          meta: {
            reservedWord: false
          }
        }
      }
    },
    modes: ['typescript', 'closure'],
    catharsis: {
      closure: 'fail', // this seems to be a catharsis error
      jsdoc: 'fail'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'fail',
      typescript: 'typescript',
      permissive: 'typescript'
    }
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
    modes: ['closure', 'typescript'],
    catharsis: {
      closure: 'fail',
      jsdoc: 'fail'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'fail',
      typescript: 'typescript',
      permissive: 'typescript'
    }
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
    catharsis: {
      closure: 'fail',
      jsdoc: 'fail'
    },
    jtp: {
      closure: 'differ',
      jsdoc: 'fail',
      typescript: 'differ',
      permissive: 'differ'
    } // NOTE: This seems to be a JTP error
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
    modes: ['typescript', 'closure'],
    catharsis: {
      closure: 'fail',
      jsdoc: 'fail'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'fail',
      typescript: 'typescript',
      permissive: 'typescript'
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
    modes: ['typescript', 'closure'],
    catharsis: {
      closure: 'fail',
      jsdoc: 'fail'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'fail',
      typescript: 'typescript',
      permissive: 'typescript'
    }
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
    description: 'typeof as function parameter without return type should fail',
    input: 'function(typeof A)',
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
        arrow: false,
        parenthesis: true
      }
    },
    modes: ['closure'],
    catharsis: {
      closure: 'fail', // this seems to be a catharsis error
      jsdoc: 'fail'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'fail',
      typescript: 'differ',
      permissive: 'differ'
    }
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
      returnType: {
        type: 'NAME',
        value: 'void',
        meta: {
          reservedWord: true
        }
      },
      meta: {
        arrow: false,
        parenthesis: true
      }
    },
    modes: ['typescript', 'closure'],
    catharsis: {
      closure: 'fail',
      jsdoc: 'fail'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'fail',
      typescript: 'typescript',
      permissive: 'typescript'
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
      returnType: {
        type: 'NAME',
        value: 'void',
        meta: {
          reservedWord: true
        }
      },
      meta: {
        arrow: false,
        parenthesis: true
      }
    },
    modes: ['typescript', 'closure'],
    catharsis: {
      closure: 'fail', // this seems to be a catharsis error
      jsdoc: 'fail'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'fail',
      typescript: 'typescript',
      permissive: 'typescript'
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
      returnType: {
        type: 'NAME',
        value: 'void',
        meta: {
          reservedWord: true
        }
      },
      meta: {
        arrow: false,
        parenthesis: true
      }
    },
    modes: ['typescript', 'closure'],
    catharsis: {
      closure: 'fail', // this seems to be a catharsis error
      jsdoc: 'fail'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'fail',
      typescript: 'typescript',
      permissive: 'typescript'
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
        element: {
          type: 'NAME',
          value: 'A',
          meta: {
            reservedWord: false
          }
        }
      },
      meta: {
        arrow: false,
        parenthesis: true
      }
    },
    modes: ['typescript', 'closure'],
    catharsis: {
      closure: 'fail', // this seems to be a catharsis error
      jsdoc: 'fail'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'fail',
      typescript: 'typescript',
      permissive: 'typescript'
    }
  }
]
