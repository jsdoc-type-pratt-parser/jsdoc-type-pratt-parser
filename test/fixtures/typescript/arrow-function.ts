import { Fixture } from '../Fixture'

export const arrowFunctionFixtures: Fixture[] = [
  {
    description: 'arrow with special any type',
    input: '(x: *) => *',
    expected: {
      type: 'JsdocTypeFunction',
      parameters: [
        {
          type: 'JsdocTypeKeyValue',
          optional: false,
          value: 'x',
          meta: {
            quote: undefined
          },
          right: {
            type: 'JsdocTypeAny'
          }
        }
      ],
      returnType: {
        type: 'JsdocTypeAny'
      },
      arrow: true,
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
    description: 'arrow with one parameter and return type',
    input: '(x: number) => string',
    expected: {
      type: 'JsdocTypeFunction',
      parameters: [
        {
          type: 'JsdocTypeKeyValue',
          optional: false,
          value: 'x',
          meta: {
            quote: undefined
          },
          right: {
            type: 'JsdocTypeName',
            value: 'number',
            meta: {
              reservedWord: false
            }
          }
        }
      ],
      returnType: {
        type: 'JsdocTypeName',
        value: 'string',
        meta: {
          reservedWord: false
        }
      },
      arrow: true,
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
    description: 'arrow with multiple parameters and a return type',
    input: '(x: number, y: string, z: Class) => string',
    expected: {
      type: 'JsdocTypeFunction',
      parameters: [
        {
          type: 'JsdocTypeKeyValue',
          optional: false,
          value: 'x',
          meta: {
            quote: undefined
          },
          right: {
            type: 'JsdocTypeName',
            value: 'number',
            meta: {
              reservedWord: false
            }
          }
        },
        {
          type: 'JsdocTypeKeyValue',
          optional: false,
          value: 'y',
          meta: {
            quote: undefined
          },
          right: {
            type: 'JsdocTypeName',
            value: 'string',
            meta: {
              reservedWord: false
            }
          }
        },
        {
          type: 'JsdocTypeKeyValue',
          optional: false,
          value: 'z',
          meta: {
            quote: undefined
          },
          right: {
            type: 'JsdocTypeName',
            value: 'Class',
            meta: {
              reservedWord: false
            }
          }
        }
      ],
      returnType: {
        type: 'JsdocTypeName',
        value: 'string',
        meta: {
          reservedWord: false
        }
      },
      arrow: true,
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
    description: 'arrow without parameter and return type',
    input: '() => string',
    expected: {
      type: 'JsdocTypeFunction',
      parameters: [],
      returnType: {
        type: 'JsdocTypeName',
        value: 'string',
        meta: {
          reservedWord: false
        }
      },
      arrow: true,
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
    description: 'function with arrow as return type',
    input: 'function(): () => string',
    expected: {
      type: 'JsdocTypeFunction',
      parameters: [],
      returnType: {
        type: 'JsdocTypeFunction',
        parameters: [],
        returnType: {
          type: 'JsdocTypeName',
          value: 'string',
          meta: {
            reservedWord: false
          }
        },
        arrow: true,
        parenthesis: true
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
    description: 'function with arrow as parameter',
    input: 'function(() => string): void',
    expected: {
      type: 'JsdocTypeFunction',
      parameters: [
        {
          type: 'JsdocTypeFunction',
          parameters: [],
          returnType: {
            type: 'JsdocTypeName',
            value: 'string',
            meta: {
              reservedWord: false
            }
          },
          arrow: true,
          parenthesis: true
        }
      ],
      returnType: {
        type: 'JsdocTypeName',
        value: 'void',
        meta: {
          reservedWord: true
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
  },
  {
    description: 'arrow function parameter list with trailing comma',
    input: '( arrow: Function, with: TrailingComma, ) => string',
    stringified: '(arrow: Function, with: TrailingComma) => string',
    expected: {
      type: 'JsdocTypeFunction',
      parameters: [
        {
          type: 'JsdocTypeKeyValue',
          optional: false,
          value: 'arrow',
          meta: {
            quote: undefined
          },
          right: {
            type: 'JsdocTypeName',
            value: 'Function',
            meta: {
              reservedWord: false
            }
          }
        },
        {
          type: 'JsdocTypeKeyValue',
          optional: false,
          value: 'with',
          meta: {
            quote: undefined
          },
          right: {
            type: 'JsdocTypeName',
            value: 'TrailingComma',
            meta: {
              reservedWord: false
            }
          }
        }
      ],
      returnType: {
        type: 'JsdocTypeName',
        value: 'string',
        meta: {
          reservedWord: false
        }
      },
      arrow: true,
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
    description: 'arrow as generic type',
    input: 'X<() => string>',
    expected: {
      type: 'JsdocTypeGeneric',
      left: {
        type: 'JsdocTypeName',
        value: 'X',
        meta: {
          reservedWord: false
        }
      },
      elements: [
        {
          type: 'JsdocTypeFunction',
          parameters: [],
          returnType: {
            type: 'JsdocTypeName',
            value: 'string',
            meta: {
              reservedWord: false
            }
          },
          arrow: true,
          parenthesis: true
        }
      ],
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
  {
    description: 'arrow returning void',
    input: '() => void',
    expected: {
      type: 'JsdocTypeFunction',
      parameters: [],
      arrow: true,
      parenthesis: true,
      returnType: {
        type: 'JsdocTypeName',
        value: 'void',
        meta: {
          reservedWord: true
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
    description: 'arrow returning arrow',
    input: '() => () => void',
    expected: {
      type: 'JsdocTypeFunction',
      parameters: [],
      returnType: {
        type: 'JsdocTypeFunction',
        parameters: [],
        returnType: {
          type: 'JsdocTypeName',
          value: 'void',
          meta: {
            reservedWord: true
          }
        },
        arrow: true,
        parenthesis: true
      },
      arrow: true,
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
    description: 'arrow returning arrow with parameters',
    input: '(a: number) => (b: string) => boolean',
    expected: {
      type: 'JsdocTypeFunction',
      parameters: [
        {
          type: 'JsdocTypeKeyValue',
          optional: false,
          value: 'a',
          meta: {
            quote: undefined
          },
          right: {
            type: 'JsdocTypeName',
            value: 'number',
            meta: {
              reservedWord: false
            }
          }
        }
      ],
      returnType: {
        type: 'JsdocTypeFunction',
        parameters: [
          {
            type: 'JsdocTypeKeyValue',
            optional: false,
            value: 'b',
            meta: {
              quote: undefined
            },
            right: {
              type: 'JsdocTypeName',
              value: 'string',
              meta: {
                reservedWord: false
              }
            }
          }
        ],
        returnType: {
          type: 'JsdocTypeName',
          value: 'boolean',
          meta: {
            reservedWord: false
          }
        },
        arrow: true,
        parenthesis: true
      },
      arrow: true,
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
    description: 'arrow with unnamed parameters',
    input: '(number) => void',
    expected: {
      type: 'JsdocTypeFunction',
      parameters: [
        {
          type: 'JsdocTypeName',
          value: 'number',
          meta: {
            reservedWord: false
          }
        }
      ],
      returnType: {
        type: 'JsdocTypeName',
        value: 'void',
        meta: {
          reservedWord: true
        }
      },
      arrow: true,
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
      typescript: 'fail',
      permissive: 'fail'
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'arrow with unnamed parameters that are not names should fail',
    input: '(Array<string>) => void',
    modes: [],
    catharsis: {
      closure: 'fail',
      jsdoc: 'fail'
    },
    jtp: {
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'fail',
      permissive: 'fail'
    }
  }
]

// TODO:
// {new (x: number) => string} // should fail
