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
          key: {
            type: 'NAME',
            name: 'x',
            meta: {
              reservedWord: false
            }
          },
          value: {
            type: 'ALL'
          }
        }
      ],
      returnType: {
        type: 'ALL'
      },
      meta: {
        arrow: true
      }
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
          key: {
            type: 'NAME',
            name: 'x',
            meta: {
              reservedWord: false
            }
          },
          value: {
            type: 'NAME',
            name: 'number',
            meta: {
              reservedWord: false
            }
          }
        }
      ],
      returnType: {
        type: 'NAME',
        name: 'string',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        arrow: true
      }
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
          key: {
            type: 'NAME',
            name: 'x',
            meta: {
              reservedWord: false
            }
          },
          value: {
            type: 'NAME',
            name: 'number',
            meta: {
              reservedWord: false
            }
          }
        },
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            name: 'y',
            meta: {
              reservedWord: false
            }
          },
          value: {
            type: 'NAME',
            name: 'string',
            meta: {
              reservedWord: false
            }
          }
        },
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            name: 'z',
            meta: {
              reservedWord: false
            }
          },
          value: {
            type: 'NAME',
            name: 'Class',
            meta: {
              reservedWord: false
            }
          }
        }
      ],
      returnType: {
        type: 'NAME',
        name: 'string',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        arrow: true
      }
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
        name: 'string',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        arrow: true
      }
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
          name: 'string',
          meta: {
            reservedWord: false
          }
        },
        meta: {
          arrow: true
        }
      },
      meta: {
        arrow: false
      }
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
            name: 'string',
            meta: {
              reservedWord: false
            }
          },
          meta: {
            arrow: true
          }
        }
      ],
      meta: {
        arrow: false
      }
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
          key: {
            type: 'NAME',
            name: 'arrow',
            meta: {
              reservedWord: false
            }
          },
          value: {
            type: 'NAME',
            name: 'Function',
            meta: {
              reservedWord: false
            }
          }
        },
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            name: 'with',
            meta: {
              reservedWord: true
            }
          },
          value: {
            type: 'NAME',
            name: 'TrailingComma',
            meta: {
              reservedWord: false
            }
          }
        }
      ],
      returnType: {
        type: 'NAME',
        name: 'string',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        arrow: true
      }
    }
  },
  {
    description: 'arrow as generic type',
    input: 'X<() => string>',
    expected: {
      type: 'GENERIC',
      subject: {
        type: 'NAME',
        name: 'X',
        meta: {
          reservedWord: false
        }
      },
      objects: [
        {
          type: 'FUNCTION',
          parameters: [],
          returnType: {
            type: 'NAME',
            name: 'string',
            meta: {
              reservedWord: false
            }
          },
          meta: {
            arrow: true
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
    description: 'arrow returning void',
    input: '() => void',
    expected: {
      type: 'FUNCTION',
      parameters: [],
      meta: {
        arrow: true
      }
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
        meta: {
          arrow: true
        }
      },
      meta: {
        arrow: true
      }
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
          key: {
            type: 'NAME',
            name: 'a',
            meta: {
              reservedWord: false
            }
          },
          value: {
            type: 'NAME',
            name: 'number',
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
            key: {
              type: 'NAME',
              name: 'b',
              meta: {
                reservedWord: false
              }
            },
            value: {
              type: 'NAME',
              name: 'string',
              meta: {
                reservedWord: false
              }
            }
          }
        ],
        returnType: {
          type: 'NAME',
          name: 'boolean',
          meta: {
            reservedWord: false
          }
        },
        meta: {
          arrow: true
        }
      },
      meta: {
        arrow: true
      }
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
          name: 'number',
          meta: {
            reservedWord: false
          }
        }
      ],
      meta: {
        arrow: true
      }
    }
  },
  {
    description: 'arrow with unnamed parameters that are not names should fail',
    input: '(Array<string>) => void',
    shouldFail: true
  }
]

// TODO:
// {new (x: number) => string} // should fail
