import { Fixture } from '../Fixture'

export const unionFixtures: Fixture[] = [
  {
    description: 'union with 2 types (number and boolean)',
    input: '(number|boolean)',
    stringified: '(number | boolean)',
    expected: {
      type: 'JsdocTypeParenthesis',
      element: {
        type: 'JsdocTypeUnion',
        elements: [
          {
            type: 'JsdocTypeName',
            value: 'number'
          },
          {
            type: 'JsdocTypeName',
            value: 'boolean'
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
      type: 'JsdocTypeVariadic',
      element: {
        type: 'JsdocTypeParenthesis',
        element: {
          type: 'JsdocTypeUnion',
          elements: [
            {
              type: 'JsdocTypeName',
              value: 'number'
            },
            {
              type: 'JsdocTypeName',
              value: 'boolean'
            }
          ]
        }
      },
      meta: {
        position: 'prefix',
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
      type: 'JsdocTypeParenthesis',
      element: {
        type: 'JsdocTypeUnion',
        elements: [
          {
            type: 'JsdocTypeName',
            value: 'Object'
          },
          {
            type: 'JsdocTypeUndefined'
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
      type: 'JsdocTypeParenthesis',
      element: {
        type: 'JsdocTypeUnion',
        elements: [
          {
            type: 'JsdocTypeName',
            value: 'number'
          },
          {
            type: 'JsdocTypeName',
            value: 'Window'
          },
          {
            left: {
              left: {
                value: 'goog',
                type: 'JsdocTypeName'
              },
              right: {
                type: 'JsdocTypeName',
                value: 'ui'
              },
              type: 'JsdocTypeNamePath',
              pathType: 'property'
            },
            right: {
              type: 'JsdocTypeName',
              value: 'Menu'
            },
            type: 'JsdocTypeNamePath',
            pathType: 'property'
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
      type: 'JsdocTypeNullable',
      element: {
        type: 'JsdocTypeParenthesis',
        element: {
          type: 'JsdocTypeUnion',
          elements: [
            {
              type: 'JsdocTypeName',
              value: 'number'
            },
            {
              type: 'JsdocTypeName',
              value: 'boolean'
            }
          ]
        }
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
    description: 'non-nullable union with 2 types (number and boolean)',
    input: '!(number|boolean)',
    stringified: '!(number | boolean)',
    expected: {
      type: 'JsdocTypeNotNullable',
      element: {
        type: 'JsdocTypeParenthesis',
        element: {
          type: 'JsdocTypeUnion',
          elements: [
            {
              type: 'JsdocTypeName',
              value: 'number'
            },
            {
              type: 'JsdocTypeName',
              value: 'boolean'
            }
          ]
        }
      },
      meta: {
        position: 'prefix'
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
    description: 'optional union with 2 types (number and boolean)',
    input: '(number|boolean)=',
    stringified: '(number | boolean)=',
    expected: {
      type: 'JsdocTypeOptional',
      element: {
        type: 'JsdocTypeParenthesis',
        element: {
          type: 'JsdocTypeUnion',
          elements: [
            {
              type: 'JsdocTypeName',
              value: 'number'
            },
            {
              type: 'JsdocTypeName',
              value: 'boolean'
            }
          ]
        }
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
    description: 'union with 2 types (array and object with unknown value type)',
    input: '(Array|Object.<string, ?>)',
    stringified: '(Array | Object.<string, ?>)',
    expected: {
      type: 'JsdocTypeParenthesis',
      element: {
        type: 'JsdocTypeUnion',
        elements: [
          {
            type: 'JsdocTypeName',
            value: 'Array'
          },
          {
            type: 'JsdocTypeGeneric',
            elements: [
              {
                type: 'JsdocTypeName',
                value: 'string'
              },
              {
                type: 'JsdocTypeUnknown'
              }
            ],
            left: {
              type: 'JsdocTypeName',
              value: 'Object'
            },
            meta: {
              dot: true,
              brackets: 'angle'
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
      type: 'JsdocTypeParenthesis',
      element: {
        type: 'JsdocTypeUnion',
        elements: [
          {
            type: 'JsdocTypeGeneric',
            elements: [
              {
                type: 'JsdocTypeName',
                value: 'string'
              }
            ],
            left: {
              type: 'JsdocTypeName',
              value: 'Array'
            },
            meta: {
              dot: true,
              brackets: 'angle'
            }
          },
          {
            type: 'JsdocTypeGeneric',
            elements: [
              {
                type: 'JsdocTypeName',
                value: 'string'
              },
              {
                type: 'JsdocTypeUnknown'
              }
            ],
            left: {
              type: 'JsdocTypeName',
              value: 'Object'
            },
            meta: {
              dot: true,
              brackets: 'angle'
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
      type: 'JsdocTypeParenthesis',
      element: {
        type: 'JsdocTypeUnion',
        elements: [
          {
            type: 'JsdocTypeName',
            value: 'Error'
          },
          {
            type: 'JsdocTypeFunction',
            parameters: [],
            returnType: {
              type: 'JsdocTypeName',
              value: 'Error'
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
      type: 'JsdocTypeUnion',
      elements: [
        {
          type: 'JsdocTypeName',
          value: 'number'
        },
        {
          type: 'JsdocTypeName',
          value: 'string'
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
      type: 'JsdocTypeUnion',
      elements: [
        {
          type: 'JsdocTypeNotNullable',
          element: {
            type: 'JsdocTypeName',
            value: 'number'
          },
          meta: {
            position: 'prefix'
          }
        },
        {
          type: 'JsdocTypeNotNullable',
          element: {
            type: 'JsdocTypeName',
            value: 'string'
          },
          meta: {
            position: 'prefix'
          }
        }
      ]
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
    description: 'optional union with multiple types',
    input: '(jQuerySelector|Element|Object|Array.<Element>|jQuery|string|function())=',
    stringified: '(jQuerySelector | Element | Object | Array.<Element> | jQuery | string | function())=',
    expected: {
      type: 'JsdocTypeOptional',
      element: {
        type: 'JsdocTypeParenthesis',
        element: {
          type: 'JsdocTypeUnion',
          elements: [
            {
              type: 'JsdocTypeName',
              value: 'jQuerySelector'
            },
            {
              type: 'JsdocTypeName',
              value: 'Element'
            },
            {
              type: 'JsdocTypeName',
              value: 'Object'
            },
            {
              type: 'JsdocTypeGeneric',
              elements: [
                {
                  type: 'JsdocTypeName',
                  value: 'Element'
                }
              ],
              left: {
                type: 'JsdocTypeName',
                value: 'Array'
              },
              meta: {
                dot: true,
                brackets: 'angle'
              }
            },
            {
              type: 'JsdocTypeName',
              value: 'jQuery'
            },
            {
              type: 'JsdocTypeName',
              value: 'string'
            },
            {
              type: 'JsdocTypeFunction',
              parameters: [],
              arrow: false,
              parenthesis: true
            }
          ]
        }
      },
      meta: {
        position: 'suffix'
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
      type: 'JsdocTypeOptional',
      element: {
        type: 'JsdocTypeParenthesis',
        element: {
          type: 'JsdocTypeUnion',
          elements: [
            {
              type: 'JsdocTypeName',
              value: 'Element'
            },
            {
              type: 'JsdocTypeName',
              value: 'Object'
            },
            {
              type: 'JsdocTypeName',
              value: 'Document'
            },
            {
              type: 'JsdocTypeGeneric',
              elements: [
                {
                  type: 'JsdocTypeName',
                  value: 'string'
                },
                {
                  type: 'JsdocTypeParenthesis',
                  element: {
                    type: 'JsdocTypeUnion',
                    elements: [
                      {
                        type: 'JsdocTypeName',
                        value: 'string'
                      },
                      {
                        type: 'JsdocTypeFunction',
                        parameters: [
                          {
                            type: 'JsdocTypeOptional',
                            element: {
                              type: 'JsdocTypeNotNullable',
                              element: {
                                left: {
                                  value: 'jQuery',
                                  type: 'JsdocTypeName'
                                },
                                right: {
                                  type: 'JsdocTypeName',
                                  value: 'event'
                                },
                                pathType: 'property',
                                type: 'JsdocTypeNamePath'
                              },
                              meta: {
                                position: 'prefix'
                              }
                            },
                            meta: {
                              position: 'suffix'
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
                type: 'JsdocTypeName',
                value: 'Object'
              },
              meta: {
                dot: true,
                brackets: 'angle'
              }
            }
          ]
        }
      },
      meta: {
        position: 'suffix'
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
