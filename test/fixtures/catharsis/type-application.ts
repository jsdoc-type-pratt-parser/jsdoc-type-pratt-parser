import { Fixture } from '../Fixture'

export const genericFixtures: Fixture[] = [
  {
    description: 'array of strings, without a dot separator',
    input: 'Array<string>',
    expected: {
      type: 'GENERIC',
      elements: [
        {
          type: 'NAME',
          value: 'string',
          meta: {
            reservedWord: false
          }
        }
      ],
      left: {
        type: 'NAME',
        value: 'Array',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        dot: false,
        brackets: '<>'
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
    description: 'array of strings, with a dot separator',
    input: 'Array.<string>',
    expected: {
      type: 'GENERIC',
      elements: [
        {
          type: 'NAME',
          value: 'string',
          meta: {
            reservedWord: false
          }
        }
      ],
      left: {
        type: 'NAME',
        value: 'Array',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        dot: true,
        brackets: '<>'
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
    description: 'repeatable array of strings',
    input: '...Array.<string>',
    expected: {
      type: 'VARIADIC',
      element: {
        type: 'GENERIC',
        elements: [
          {
            type: 'NAME',
            value: 'string',
            meta: {
              reservedWord: false
            }
          }
        ],
        left: {
          type: 'NAME',
          value: 'Array',
          meta: {
            reservedWord: false
          }
        },
        meta: {
          dot: true,
          brackets: '<>'
        }
      },
      meta: {
        squareBrackets: false,
        position: 'PREFIX'
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
    description: 'object whose properties are strings and property values are numbers',
    input: 'Object.<string, number>',
    expected: {
      type: 'GENERIC',
      elements: [
        {
          type: 'NAME',
          value: 'string',
          meta: {
            reservedWord: false
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
      left: {
        type: 'NAME',
        value: 'Object',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        dot: true,
        brackets: '<>'
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
    description: 'object whose properties are a type application and property values are a type union',
    input: 'Object.<Array.<(boolean|{myKey: Error})>, (boolean|string|function(new:foo): string)>',
    expected: {
      type: 'GENERIC',
      elements: [
        {
          type: 'GENERIC',
          elements: [
            {
              type: 'PARENTHESIS',
              element: {
                type: 'UNION',
                elements: [
                  {
                    type: 'NAME',
                    value: 'boolean',
                    meta: {
                      reservedWord: false
                    }
                  },
                  {
                    type: 'OBJECT',
                    elements: [
                      {
                        type: 'KEY_VALUE',
                        left: {
                          type: 'NAME',
                          value: 'myKey',
                          meta: {
                            reservedWord: false
                          }
                        },
                        right: {
                          type: 'NAME',
                          value: 'Error',
                          meta: {
                            reservedWord: false
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            }
          ],
          left: {
            type: 'NAME',
            value: 'Array',
            meta: {
              reservedWord: false
            }
          },
          meta: {
            dot: true,
            brackets: '<>'
          }
        },
        {
          type: 'PARENTHESIS',
          element: {
            type: 'UNION',
            elements: [
              {
                type: 'NAME',
                value: 'boolean',
                meta: {
                  reservedWord: false
                }
              },
              {
                type: 'NAME',
                value: 'string',
                meta: {
                  reservedWord: false
                }
              },
              {
                type: 'FUNCTION',
                parameters: [
                  {
                    type: 'KEY_VALUE',
                    left: {
                      type: 'NAME',
                      value: 'new',
                      meta: {
                        reservedWord: true
                      }
                    },
                    right: {
                      type: 'NAME',
                      value: 'foo',
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
                  arrow: false,
                  parenthesis: true
                }
              }
            ]
          }
        }
      ],
      left: {
        type: 'NAME',
        value: 'Object',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        dot: true,
        brackets: '<>'
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
    description: 'array of objects that have a length property',
    input: 'Array.<{length}>',
    expected: {
      type: 'GENERIC',
      elements: [
        {
          type: 'OBJECT',
          elements: [
            {
              type: 'NAME',
              value: 'length',
              meta: {
                reservedWord: false
              }
            }
          ]
        }
      ],
      left: {
        type: 'NAME',
        value: 'Array',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        dot: true,
        brackets: '<>'
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
    description: 'array of unknown',
    input: 'Array.<?>',
    expected: {
      type: 'GENERIC',
      elements: [
        {
          type: 'UNKNOWN'
        }
      ],
      left: {
        type: 'NAME',
        value: 'Array',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        dot: true,
        brackets: '<>'
      }
    },
    modes: ['jsdoc', 'closure', 'typescript'],
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
    description: 'Promise containing string',
    input: 'Promise.<string>',
    expected: {
      type: 'GENERIC',
      elements: [
        {
          type: 'NAME',
          value: 'string',
          meta: {
            reservedWord: false
          }
        }
      ],
      left: {
        type: 'NAME',
        value: 'Promise',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        dot: true,
        brackets: '<>'
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
    description: 'foo.Promise containing string',
    input: 'foo.Promise.<string>',
    expected: {
      type: 'GENERIC',
      elements: [
        {
          type: 'NAME',
          value: 'string',
          meta: {
            reservedWord: false
          }
        }
      ],
      left: {
        left: {
          value: 'foo',
          type: 'NAME',
          meta: {
            reservedWord: false
          }
        },
        right: {
          type: 'NAME',
          value: 'Promise',
          meta: {
            reservedWord: false
          }
        },
        meta: {
          type: '.'
        },
        type: 'NAME_PATH'
      },
      meta: {
        dot: true,
        brackets: '<>'
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
  }
]
