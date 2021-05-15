import { Fixture } from '../Fixture'

export const unionFixtures: Fixture[] = [
  {
    description: 'union with 2 types (number and boolean)',
    input: '(number|boolean)',
    stringified: '(number | boolean)',
    expected: {
      type: 'PARENTHESIS',
      element: {
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
            type: 'NAME',
            value: 'boolean',
            meta: {
              reservedWord: false
            }
          }
        ]
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
    description: 'repeatable union with 2 types (number and boolean)',
    input: '...(number|boolean)',
    stringified: '...(number | boolean)',
    expected: {
      type: 'VARIADIC',
      element: {
        type: 'PARENTHESIS',
        element: {
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
              type: 'NAME',
              value: 'boolean',
              meta: {
                reservedWord: false
              }
            }
          ]
        }
      },
      meta: {
        position: 'PREFIX',
        squareBrackets: false
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
    description: 'union with 2 types (Object and undefined)',
    input: '(Object|undefined)',
    stringified: '(Object | undefined)',
    expected: {
      type: 'PARENTHESIS',
      element: {
        type: 'UNION',
        elements: [
          {
            type: 'NAME',
            value: 'Object',
            meta: {
              reservedWord: false
            }
          },
          {
            type: 'UNDEFINED'
          }
        ]
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
    description: 'union with 3 types (number, Window, and goog.ui.Menu)',
    input: '(number|Window|goog.ui.Menu)',
    stringified: '(number | Window | goog.ui.Menu)',
    expected: {
      type: 'PARENTHESIS',
      element: {
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
            type: 'NAME',
            value: 'Window',
            meta: {
              reservedWord: false
            }
          },
          {
            left: {
              left: {
                value: 'goog',
                type: 'NAME',
                meta: {
                  reservedWord: false
                }
              },
              right: {
                type: 'NAME',
                value: 'ui',
                meta: {
                  reservedWord: false
                }
              },
              type: 'NAME_PATH',
              pathType: '.'
            },
            right: {
              type: 'NAME',
              value: 'Menu',
              meta: {
                reservedWord: false
              }
            },
            type: 'NAME_PATH',
            pathType: '.'
          }
        ]
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
    description: 'nullable union with 2 types (number and boolean)',
    input: '?(number|boolean)',
    stringified: '?(number | boolean)',
    expected: {
      type: 'NULLABLE',
      element: {
        type: 'PARENTHESIS',
        element: {
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
              type: 'NAME',
              value: 'boolean',
              meta: {
                reservedWord: false
              }
            }
          ]
        }
      },
      meta: {
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
    description: 'non-nullable union with 2 types (number and boolean)',
    input: '!(number|boolean)',
    stringified: '!(number | boolean)',
    expected: {
      type: 'NOT_NULLABLE',
      element: {
        type: 'PARENTHESIS',
        element: {
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
              type: 'NAME',
              value: 'boolean',
              meta: {
                reservedWord: false
              }
            }
          ]
        }
      },
      meta: {
        position: 'PREFIX'
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
    description: 'optional union with 2 types (number and boolean)',
    input: '(number|boolean)=',
    stringified: '(number | boolean)=',
    expected: {
      type: 'OPTIONAL',
      element: {
        type: 'PARENTHESIS',
        element: {
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
              type: 'NAME',
              value: 'boolean',
              meta: {
                reservedWord: false
              }
            }
          ]
        }
      },
      meta: {
        position: 'SUFFIX'
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
    description: 'union with 2 types (array and object with unknown value type)',
    input: '(Array|Object.<string, ?>)',
    stringified: '(Array | Object.<string, ?>)',
    expected: {
      type: 'PARENTHESIS',
      element: {
        type: 'UNION',
        elements: [
          {
            type: 'NAME',
            value: 'Array',
            meta: {
              reservedWord: false
            }
          },
          {
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
                type: 'UNKNOWN'
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
          }
        ]
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
    description: 'union with 2 type applications',
    input: '(Array.<string>|Object.<string, ?>)',
    stringified: '(Array.<string> | Object.<string, ?>)',
    expected: {
      type: 'PARENTHESIS',
      element: {
        type: 'UNION',
        elements: [
          {
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
          {
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
                type: 'UNKNOWN'
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
          }
        ]
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
    description: 'union with 2 types (an error, or a function that returns an error)',
    input: '(Error|function(): Error)',
    stringified: '(Error | function(): Error)',
    expected: {
      type: 'PARENTHESIS',
      element: {
        type: 'UNION',
        elements: [
          {
            type: 'NAME',
            value: 'Error',
            meta: {
              reservedWord: false
            }
          },
          {
            type: 'FUNCTION',
            parameters: [],
            returnType: {
              type: 'NAME',
              value: 'Error',
              meta: {
                reservedWord: false
              }
            },
            arrow: false,
            parenthesis: true
          }
        ]
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
    description: 'type union with no enclosing parentheses',
    input: 'number|string',
    stringified: 'number | string',
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
          type: 'NAME',
          value: 'string',
          meta: {
            reservedWord: false
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
    description: 'type union with modifiers and no enclosing parentheses',
    input: '!number|!string',
    stringified: '!number | !string',
    expected: {
      type: 'UNION',
      elements: [
        {
          type: 'NOT_NULLABLE',
          element: {
            type: 'NAME',
            value: 'number',
            meta: {
              reservedWord: false
            }
          },
          meta: {
            position: 'PREFIX'
          }
        },
        {
          type: 'NOT_NULLABLE',
          element: {
            type: 'NAME',
            value: 'string',
            meta: {
              reservedWord: false
            }
          },
          meta: {
            position: 'PREFIX'
          }
        }
      ]
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
    description: 'optional union with multiple types',
    input: '(jQuerySelector|Element|Object|Array.<Element>|jQuery|string|function())=',
    stringified: '(jQuerySelector | Element | Object | Array.<Element> | jQuery | string | function())=',
    expected: {
      type: 'OPTIONAL',
      element: {
        type: 'PARENTHESIS',
        element: {
          type: 'UNION',
          elements: [
            {
              type: 'NAME',
              value: 'jQuerySelector',
              meta: {
                reservedWord: false
              }
            },
            {
              type: 'NAME',
              value: 'Element',
              meta: {
                reservedWord: false
              }
            },
            {
              type: 'NAME',
              value: 'Object',
              meta: {
                reservedWord: false
              }
            },
            {
              type: 'GENERIC',
              elements: [
                {
                  type: 'NAME',
                  value: 'Element',
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
            {
              type: 'NAME',
              value: 'jQuery',
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
              parameters: [],
              arrow: false,
              parenthesis: true
            }
          ]
        }
      },
      meta: {
        position: 'SUFFIX'
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
      typescript: 'differ', // NOTE: This seems to be a JTP error
      permissive: 'closure'
    }
  },
  {
    description: 'optional union with multiple types, including a nested union type',
    input: '(Element|Object|Document|Object.<string, (string|function(!jQuery.event=))>)=',
    stringified: '(Element | Object | Document | Object.<string, (string | function(!jQuery.event=))>)=',
    expected: {
      type: 'OPTIONAL',
      element: {
        type: 'PARENTHESIS',
        element: {
          type: 'UNION',
          elements: [
            {
              type: 'NAME',
              value: 'Element',
              meta: {
                reservedWord: false
              }
            },
            {
              type: 'NAME',
              value: 'Object',
              meta: {
                reservedWord: false
              }
            },
            {
              type: 'NAME',
              value: 'Document',
              meta: {
                reservedWord: false
              }
            },
            {
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
                  type: 'PARENTHESIS',
                  element: {
                    type: 'UNION',
                    elements: [
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
                            type: 'OPTIONAL',
                            element: {
                              type: 'NOT_NULLABLE',
                              element: {
                                left: {
                                  value: 'jQuery',
                                  type: 'NAME',
                                  meta: {
                                    reservedWord: false
                                  }
                                },
                                right: {
                                  type: 'NAME',
                                  value: 'event',
                                  meta: {
                                    reservedWord: false
                                  }
                                },
                                pathType: '.',
                                type: 'NAME_PATH'
                              },
                              meta: {
                                position: 'PREFIX'
                              }
                            },
                            meta: {
                              position: 'SUFFIX'
                            }
                          }
                        ],
                        arrow: false,
                        parenthesis: true
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
            }
          ]
        }
      },
      meta: {
        position: 'SUFFIX'
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
      typescript: 'differ', // NOTE: This seems to be a JTP error
      permissive: 'closure'
    }
  }
]
