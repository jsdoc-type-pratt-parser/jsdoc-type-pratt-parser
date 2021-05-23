import { Fixture } from '../Fixture'

export const genericFixtures: Fixture[] = [
  {
    description: 'array of strings, without a dot separator',
    input: 'Array<string>',
    expected: {
      type: 'JsdocTypeGeneric',
      elements: [
        {
          type: 'JsdocTypeName',
          value: 'string',
          meta: {
            reservedWord: false
          }
        }
      ],
      left: {
        type: 'JsdocTypeName',
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
      type: 'JsdocTypeGeneric',
      elements: [
        {
          type: 'JsdocTypeName',
          value: 'string',
          meta: {
            reservedWord: false
          }
        }
      ],
      left: {
        type: 'JsdocTypeName',
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
      type: 'JsdocTypeVariadic',
      element: {
        type: 'JsdocTypeGeneric',
        elements: [
          {
            type: 'JsdocTypeName',
            value: 'string',
            meta: {
              reservedWord: false
            }
          }
        ],
        left: {
          type: 'JsdocTypeName',
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
    description: 'object whose properties are strings and property values are numbers',
    input: 'Object.<string, number>',
    expected: {
      type: 'JsdocTypeGeneric',
      elements: [
        {
          type: 'JsdocTypeName',
          value: 'string',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'JsdocTypeName',
          value: 'number',
          meta: {
            reservedWord: false
          }
        }
      ],
      left: {
        type: 'JsdocTypeName',
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
    stringified: 'Object.<Array.<(boolean | {myKey: Error})>, (boolean | string | function(new: foo): string)>',
    expected: {
      type: 'JsdocTypeGeneric',
      elements: [
        {
          type: 'JsdocTypeGeneric',
          elements: [
            {
              type: 'JsdocTypeParenthesis',
              element: {
                type: 'JsdocTypeUnion',
                elements: [
                  {
                    type: 'JsdocTypeName',
                    value: 'boolean',
                    meta: {
                      reservedWord: false
                    }
                  },
                  {
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
                          type: 'JsdocTypeName',
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
            type: 'JsdocTypeName',
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
          type: 'JsdocTypeParenthesis',
          element: {
            type: 'JsdocTypeUnion',
            elements: [
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
              },
              {
                type: 'JsdocTypeFunction',
                parameters: [
                  {
                    type: 'JsdocTypeKeyValue',
                    optional: false,
                    value: 'new',
                    meta: {
                      quote: undefined
                    },
                    right: {
                      type: 'JsdocTypeName',
                      value: 'foo',
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
                arrow: false,
                parenthesis: true
              }
            ]
          }
        }
      ],
      left: {
        type: 'JsdocTypeName',
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
      type: 'JsdocTypeGeneric',
      elements: [
        {
          type: 'JsdocTypeObject',
          elements: [
            {
              type: 'JsdocTypeKeyValue',
              value: 'length',
              right: undefined,
              optional: false,
              meta: {
                quote: undefined
              }
            }
          ]
        }
      ],
      left: {
        type: 'JsdocTypeName',
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
      type: 'JsdocTypeGeneric',
      elements: [
        {
          type: 'JsdocTypeUnknown'
        }
      ],
      left: {
        type: 'JsdocTypeName',
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
      type: 'JsdocTypeGeneric',
      elements: [
        {
          type: 'JsdocTypeName',
          value: 'string',
          meta: {
            reservedWord: false
          }
        }
      ],
      left: {
        type: 'JsdocTypeName',
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
      type: 'JsdocTypeGeneric',
      elements: [
        {
          type: 'JsdocTypeName',
          value: 'string',
          meta: {
            reservedWord: false
          }
        }
      ],
      left: {
        left: {
          value: 'foo',
          type: 'JsdocTypeName',
          meta: {
            reservedWord: false
          }
        },
        right: {
          type: 'JsdocTypeName',
          value: 'Promise',
          meta: {
            reservedWord: false
          }
        },
        pathType: '.',
        type: 'JsdocTypeNamePath'
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
