import { Fixture } from '../Fixture'

export const recordFixtures: Fixture[] = [
  {
    description: 'empty record type',
    input: '{}',
    expected: {
      type: 'JsdocTypeObject',
      elements: []
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'closure'
    }
  },
  {
    description: 'record type with 1 typed property',
    input: '{myNum: number}',
    expected: {
      type: 'JsdocTypeObject',
      elements: [
        {
          type: 'JsdocTypeKeyValue',
          optional: false,
          value: 'myNum',
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
      ]
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'closure'
    }
  },
  {
    description: 'repeatable record type with 1 typed property',
    input: '...{myNum: number}',
    expected: {
      type: 'JsdocTypeVariadic',
      element: {
        type: 'JsdocTypeObject',
        elements: [
          {
            type: 'JsdocTypeKeyValue',
            optional: false,
            value: 'myNum',
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
        ]
      },
      meta: {
        squareBrackets: false,
        position: 'prefix'
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'closure'
    }
  },
  {
    description: 'optional record type with 1 typed property',
    input: '{myNum: number}=',
    expected: {
      type: 'JsdocTypeOptional',
      element: {
        type: 'JsdocTypeObject',
        elements: [
          {
            type: 'JsdocTypeKeyValue',
            optional: false,
            value: 'myNum',
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
        ]
      },
      meta: {
        position: 'suffix'
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'closure'
    }
  },
  {
    description: 'nullable record type with 1 typed property',
    input: '?{myNum: number}',
    expected: {
      type: 'JsdocTypeNullable',
      element: {
        type: 'JsdocTypeObject',
        elements: [
          {
            type: 'JsdocTypeKeyValue',
            optional: false,
            value: 'myNum',
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
        ]
      },
      meta: {
        position: 'prefix'
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'closure'
    }
  },
  {
    description: 'non-nullable record type with 1 typed property',
    input: '!{myNum: number}',
    expected: {
      type: 'JsdocTypeNotNullable',
      element: {
        type: 'JsdocTypeObject',
        elements: [
          {
            type: 'JsdocTypeKeyValue',
            optional: false,
            value: 'myNum',
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
        ]
      },
      meta: {
        position: 'prefix'
      }
    },
    modes: ['jsdoc', 'closure'],
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'differ',
      permissive: 'closure'
    }
  },
  {
    description: 'record type with 1 typed property and 1 untyped property',
    input: '{myNum: number, myObject}',
    expected: {
      type: 'JsdocTypeObject',
      elements: [
        {
          type: 'JsdocTypeKeyValue',
          optional: false,
          value: 'myNum',
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
          value: 'myObject',
          right: undefined,
          optional: false,
          meta: {
            quote: undefined
          }
        }
      ]
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'closure'
    }
  },
  {
    description: 'record type with a property that uses a type application as a value',
    input: '{myArray: Array.<string>}',
    expected: {
      type: 'JsdocTypeObject',
      elements: [
        {
          type: 'JsdocTypeKeyValue',
          optional: false,
          value: 'myArray',
          meta: {
            quote: undefined
          },
          right: {
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
                type: 'JsdocTypeName',
                value: 'string',
                meta: {
                  reservedWord: false
                }
              }
            ],
            meta: {
              dot: true,
              brackets: 'angle'
            }
          }
        }
      ]
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'closure'
    }
  },
  {
    description: 'record type with a property that uses a type union as a value',
    input: '{myKey: (number|boolean|string)}',
    stringified: '{myKey: (number | boolean | string)}',
    expected: {
      type: 'JsdocTypeObject',
      elements: [
        {
          type: 'JsdocTypeKeyValue',
          optional: false,
          value: 'myKey',
          meta: {
            quote: undefined
          },
          right: {
            type: 'JsdocTypeParenthesis',
            element: {
              type: 'JsdocTypeUnion',
              elements: [
                {
                  type: 'JsdocTypeName',
                  value: 'number',
                  meta: {
                    reservedWord: false
                  }
                },
                {
                  type: 'JsdocTypeName',
                  value: 'boolean',
                  meta: {
                    reservedWord: false
                  }
                },
                {
                  type: 'JsdocTypeName',
                  value: 'string',
                  meta: {
                    reservedWord: false
                  }
                }
              ]
            }
          }
        }
      ]
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'closure'
    }
  },
  {
    description: 'record type with a property that uses a JavaScript keyword as a key',
    input: '{continue: string}',
    expected: {
      type: 'JsdocTypeObject',
      elements: [
        {
          type: 'JsdocTypeKeyValue',
          optional: false,
          value: 'continue',
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
      ]
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'closure'
    }
  },
  {
    description: 'record type with a property that uses a JavaScript future reserved word as a key',
    input: '{class: string}',
    expected: {
      type: 'JsdocTypeObject',
      elements: [
        {
          type: 'JsdocTypeKeyValue',
          optional: false,
          value: 'class',
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
      ]
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'closure'
    }
  },
  {
    description: 'record type with a property that uses a string representation of a JavaScript boolean literal as a key',
    input: '{true: string}',
    expected: {
      type: 'JsdocTypeObject',
      elements: [
        {
          type: 'JsdocTypeKeyValue',
          optional: false,
          value: 'true',
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
      ]
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'closure'
    }
  },
  {
    description: 'record type with a property that uses a numeric key',
    input: '{0: string}',
    expected: {
      type: 'JsdocTypeObject',
      elements: [
        {
          type: 'JsdocTypeKeyValue',
          optional: false,
          value: '0',
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
      ]
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'closure'
    }
  }
]
