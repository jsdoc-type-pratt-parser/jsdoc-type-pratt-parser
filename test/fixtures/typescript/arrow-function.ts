import { Fixture } from '../Fixture'

export const arrowFunctionFixtures: Fixture[] = [
  {
    description: 'arrow with special any type',
    input: '(x: *) => *',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'KEY_VALUE',
          left: {
            type: 'NAME',
            value: 'x',
            meta: {
              reservedWord: false
            }
          },
          right: {
            type: 'ANY'
          }
        }
      ],
      returnType: {
        type: 'ANY'
      },
      meta: {
        arrow: true,
        parenthesis: true
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
    description: 'arrow with one parameter and return type',
    input: '(x: number) => string',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'KEY_VALUE',
          left: {
            type: 'NAME',
            value: 'x',
            meta: {
              reservedWord: false
            }
          },
          right: {
            type: 'NAME',
            value: 'number',
            meta: {
              reservedWord: false
            }
          }
        }
      ],
      returnType: {
        type: 'NAME',
        value: 'string',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        arrow: true,
        parenthesis: true
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
    description: 'arrow with multiple parameters and a return type',
    input: '(x: number, y: string, z: Class) => string',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'KEY_VALUE',
          left: {
            type: 'NAME',
            value: 'x',
            meta: {
              reservedWord: false
            }
          },
          right: {
            type: 'NAME',
            value: 'number',
            meta: {
              reservedWord: false
            }
          }
        },
        {
          type: 'KEY_VALUE',
          left: {
            type: 'NAME',
            value: 'y',
            meta: {
              reservedWord: false
            }
          },
          right: {
            type: 'NAME',
            value: 'string',
            meta: {
              reservedWord: false
            }
          }
        },
        {
          type: 'KEY_VALUE',
          left: {
            type: 'NAME',
            value: 'z',
            meta: {
              reservedWord: false
            }
          },
          right: {
            type: 'NAME',
            value: 'Class',
            meta: {
              reservedWord: false
            }
          }
        }
      ],
      returnType: {
        type: 'NAME',
        value: 'string',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        arrow: true,
        parenthesis: true
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
    description: 'arrow without parameter and return type',
    input: '() => string',
    expected: {
      type: 'FUNCTION',
      parameters: [],
      returnType: {
        type: 'NAME',
        value: 'string',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        arrow: true,
        parenthesis: true
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
    description: 'function with arrow as return type',
    input: 'function(): () => string',
    expected: {
      type: 'FUNCTION',
      parameters: [],
      returnType: {
        type: 'FUNCTION',
        parameters: [],
        returnType: {
          type: 'NAME',
          value: 'string',
          meta: {
            reservedWord: false
          }
        },
        meta: {
          arrow: true,
          parenthesis: true
        }
      },
      meta: {
        arrow: false,
        parenthesis: true
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
    description: 'function with arrow as parameter',
    input: 'function(() => string): void',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'FUNCTION',
          parameters: [],
          returnType: {
            type: 'NAME',
            value: 'string',
            meta: {
              reservedWord: false
            }
          },
          meta: {
            arrow: true,
            parenthesis: true
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
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'KEY_VALUE',
          left: {
            type: 'NAME',
            value: 'arrow',
            meta: {
              reservedWord: false
            }
          },
          right: {
            type: 'NAME',
            value: 'Function',
            meta: {
              reservedWord: false
            }
          }
        },
        {
          type: 'KEY_VALUE',
          left: {
            type: 'NAME',
            value: 'with',
            meta: {
              reservedWord: true
            }
          },
          right: {
            type: 'NAME',
            value: 'TrailingComma',
            meta: {
              reservedWord: false
            }
          }
        }
      ],
      returnType: {
        type: 'NAME',
        value: 'string',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        arrow: true,
        parenthesis: true
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
    description: 'arrow as generic type',
    input: 'X<() => string>',
    expected: {
      type: 'GENERIC',
      left: {
        type: 'NAME',
        value: 'X',
        meta: {
          reservedWord: false
        }
      },
      elements: [
        {
          type: 'FUNCTION',
          parameters: [],
          returnType: {
            type: 'NAME',
            value: 'string',
            meta: {
              reservedWord: false
            }
          },
          meta: {
            arrow: true,
            parenthesis: true
          }
        }
      ],
      meta: {
        dot: false,
        brackets: '<>'
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
      type: 'FUNCTION',
      parameters: [],
      meta: {
        arrow: true,
        parenthesis: true
      },
      returnType: {
        type: 'NAME',
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
      type: 'FUNCTION',
      parameters: [],
      returnType: {
        type: 'FUNCTION',
        parameters: [],
        returnType: {
          type: 'NAME',
          value: 'void',
          meta: {
            reservedWord: true
          }
        },
        meta: {
          arrow: true,
          parenthesis: true
        }
      },
      meta: {
        arrow: true,
        parenthesis: true
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
    description: 'arrow returning arrow with parameters',
    input: '(a: number) => (b: string) => boolean',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'KEY_VALUE',
          left: {
            type: 'NAME',
            value: 'a',
            meta: {
              reservedWord: false
            }
          },
          right: {
            type: 'NAME',
            value: 'number',
            meta: {
              reservedWord: false
            }
          }
        }
      ],
      returnType: {
        type: 'FUNCTION',
        parameters: [
          {
            type: 'KEY_VALUE',
            left: {
              type: 'NAME',
              value: 'b',
              meta: {
                reservedWord: false
              }
            },
            right: {
              type: 'NAME',
              value: 'string',
              meta: {
                reservedWord: false
              }
            }
          }
        ],
        returnType: {
          type: 'NAME',
          value: 'boolean',
          meta: {
            reservedWord: false
          }
        },
        meta: {
          arrow: true,
          parenthesis: true
        }
      },
      meta: {
        arrow: true,
        parenthesis: true
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
    description: 'arrow with unnamed parameters',
    input: '(number) => void',
    expected: {
      type: 'FUNCTION',
      parameters: [
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
        arrow: true,
        parenthesis: true
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
