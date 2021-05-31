import { Fixture } from '../Fixture'

export const functionFixtures: Fixture[] = [
  {
    description: 'function with two basic parameters',
    input: 'function(string, boolean)',
    expected: {
      type: 'JsdocTypeFunction',
      parameters: [
        {
          type: 'JsdocTypeName',
          value: 'string'
        },
        {
          type: 'JsdocTypeName',
          value: 'boolean'
        }
      ],
      arrow: false,
      parenthesis: true
    },
    modes: ['jsdoc', 'closure'], // typescript does not allow function types without return type
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'differ',
      permissive: 'closure'
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'repeatable function with two basic parameters',
    input: '...function(string, boolean)',
    expected: {
      type: 'JsdocTypeVariadic',
      element: {
        type: 'JsdocTypeFunction',
        parameters: [
          {
            type: 'JsdocTypeName',
            value: 'string'
          },
          {
            type: 'JsdocTypeName',
            value: 'boolean'
          }
        ],
        arrow: false,
        parenthesis: true
      },
      meta: {
        position: 'prefix',
        squareBrackets: false
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
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'function with two basic parameters and a return value',
    input: 'function(string, boolean): boolean',
    expected: {
      type: 'JsdocTypeFunction',
      parameters: [
        {
          type: 'JsdocTypeName',
          value: 'string'
        },
        {
          type: 'JsdocTypeName',
          value: 'boolean'
        }
      ],
      returnType: {
        type: 'JsdocTypeName',
        value: 'boolean'
      },
      arrow: false,
      parenthesis: true
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
    description: 'repeatable function with two basic parameters and a return value',
    input: '...function(string, boolean): boolean',
    expected: {
      type: 'JsdocTypeVariadic',
      element: {
        type: 'JsdocTypeFunction',
        parameters: [
          {
            type: 'JsdocTypeName',
            value: 'string'
          },
          {
            type: 'JsdocTypeName',
            value: 'boolean'
          }
        ],
        returnType: {
          type: 'JsdocTypeName',
          value: 'boolean'
        },
        arrow: false,
        parenthesis: true
      },
      meta: {
        squareBrackets: false,
        position: 'prefix'
      }
    },
    modes: ['jsdoc', 'typescript', 'closure'],
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
    description: 'optional function with one basic parameter',
    input: 'function(string)=',
    expected: {
      type: 'JsdocTypeOptional',
      element: {
        type: 'JsdocTypeFunction',
        parameters: [
          {
            type: 'JsdocTypeName',
            value: 'string'
          }
        ],
        arrow: false,
        parenthesis: true
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
      typescript: 'differ',
      permissive: 'closure'
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'function with no parameters and a return value',
    input: 'function(): number',
    expected: {
      type: 'JsdocTypeFunction',
      parameters: [],
      returnType: {
        type: 'JsdocTypeName',
        value: 'number'
      },
      arrow: false,
      parenthesis: true
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
    description: 'function with a "this" type and no parameters',
    input: 'function(this:goog.ui.Menu)',
    stringified: 'function(this: goog.ui.Menu)',
    expected: {
      parameters: [
        {
          value: 'this',
          meta: {
            quote: undefined
          },
          type: 'JsdocTypeKeyValue',
          optional: false,
          right: {
            left: {
              left: {
                value: 'goog',
                type: 'JsdocTypeName'
              },
              right: {
                type: 'JsdocTypeProperty',
                value: 'ui'
              },
              type: 'JsdocTypeNamePath',
              pathType: 'property'
            },
            right: {
              type: 'JsdocTypeProperty',
              value: 'Menu'
            },
            type: 'JsdocTypeNamePath',
            pathType: 'property'
          }
        }
      ],
      type: 'JsdocTypeFunction',
      arrow: false,
      parenthesis: true
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
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'function with a "this" type and one parameter',
    input: 'function(this:goog.ui.Menu, string)',
    stringified: 'function(this: goog.ui.Menu, string)',
    expected: {
      parameters: [
        {
          value: 'this',
          meta: {
            quote: undefined
          },
          type: 'JsdocTypeKeyValue',
          optional: false,
          right: {
            left: {
              left: {
                value: 'goog',
                type: 'JsdocTypeName'
              },
              right: {
                type: 'JsdocTypeProperty',
                value: 'ui'
              },
              type: 'JsdocTypeNamePath',
              pathType: 'property'
            },
            right: {
              type: 'JsdocTypeProperty',
              value: 'Menu'
            },
            type: 'JsdocTypeNamePath',
            pathType: 'property'
          }
        },
        {
          value: 'string',
          type: 'JsdocTypeName'
        }
      ],
      type: 'JsdocTypeFunction',
      arrow: false,
      parenthesis: true
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
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'function with a "new" type and no parameters',
    input: 'function(new:goog.ui.Menu)',
    stringified: 'function(new: goog.ui.Menu)',
    expected: {
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
            left: {
              left: {
                value: 'goog',
                type: 'JsdocTypeName'
              },
              right: {
                type: 'JsdocTypeProperty',
                value: 'ui'
              },
              type: 'JsdocTypeNamePath',
              pathType: 'property'
            },
            right: {
              type: 'JsdocTypeProperty',
              value: 'Menu'
            },
            type: 'JsdocTypeNamePath',
            pathType: 'property'
          }
        }
      ],
      arrow: false,
      parenthesis: true
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
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'function with a "new" type and one parameter',
    input: 'function(new:goog.ui.Menu, string)',
    stringified: 'function(new: goog.ui.Menu, string)',
    expected: {
      type: 'JsdocTypeFunction',
      parameters: [
        {
          type: 'JsdocTypeKeyValue',
          optional: false,
          meta: {
            quote: undefined
          },
          value: 'new',
          right: {
            left: {
              left: {
                value: 'goog',
                type: 'JsdocTypeName'
              },
              right: {
                type: 'JsdocTypeProperty',
                value: 'ui'
              },
              type: 'JsdocTypeNamePath',
              pathType: 'property'
            },
            right: {
              type: 'JsdocTypeProperty',
              value: 'Menu'
            },
            type: 'JsdocTypeNamePath',
            pathType: 'property'
          }
        },
        {
          type: 'JsdocTypeName',
          value: 'string'
        }
      ],
      arrow: false,
      parenthesis: true
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
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'function with a "new" and "this" type and no parameters',
    input: 'function(new:goog.ui.Menu, this:goog.ui)',
    stringified: 'function(new: goog.ui.Menu, this: goog.ui)',
    expected: {
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
            left: {
              left: {
                value: 'goog',
                type: 'JsdocTypeName'
              },
              right: {
                type: 'JsdocTypeProperty',
                value: 'ui'
              },
              type: 'JsdocTypeNamePath',
              pathType: 'property'
            },
            right: {
              type: 'JsdocTypeProperty',
              value: 'Menu'
            },
            type: 'JsdocTypeNamePath',
            pathType: 'property'
          }
        },
        {
          type: 'JsdocTypeKeyValue',
          optional: false,
          value: 'this',
          meta: {
            quote: undefined
          },
          right: {
            left: {
              value: 'goog',
              type: 'JsdocTypeName'
            },
            right: {
              type: 'JsdocTypeProperty',
              value: 'ui'
            },
            type: 'JsdocTypeNamePath',
            pathType: 'property'
          }
        }
      ],
      arrow: false,
      parenthesis: true
    },
    modes: ['jsdoc', 'closure'],
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'fail',
      permissive: 'fail'
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'function with a fixed parameter, followed by a variable number of parameters, as well as a return value',
    input: 'function(string, ...[number]): number',
    stringified: 'function(string, ...number): number',
    diffExpected: {
      jsdoc: {
        type: 'JsdocTypeFunction',
        parameters: [
          {
            type: 'JsdocTypeName',
            value: 'string'
          },
          {
            type: 'JsdocTypeVariadic',
            element: {
              type: 'JsdocTypeName',
              value: 'number'
            },
            meta: {
              position: 'prefix',
              squareBrackets: true
            }
          }
        ],
        returnType: {
          type: 'JsdocTypeName',
          value: 'number'
        },
        arrow: false,
        parenthesis: true
      },
      typescript: {
        type: 'JsdocTypeFunction',
        parameters: [
          {
            type: 'JsdocTypeName',
            value: 'string'
          },
          {
            type: 'JsdocTypeVariadic',
            element: {
              type: 'JsdocTypeTuple',
              elements: [
                {
                  type: 'JsdocTypeName',
                  value: 'number'
                }
              ]
            },
            meta: {
              position: 'prefix',
              squareBrackets: false
            }
          }
        ],
        returnType: {
          type: 'JsdocTypeName',
          value: 'number'
        },
        arrow: false,
        parenthesis: true
      }
    },
    modes: ['typescript', 'jsdoc'],
    catharsis: {
      closure: 'differ',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'typescript',
      permissive: 'typescript'
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'function with a variable number of parameters containing the value `null`',
    input: 'function(...[null])',
    stringified: 'function(...null)',
    expected: {
      type: 'JsdocTypeFunction',
      parameters: [
        {
          type: 'JsdocTypeVariadic',
          element: {
            type: 'JsdocTypeNull'
          },
          meta: {
            squareBrackets: true,
            position: 'prefix'
          }
        }
      ],
      arrow: false,
      parenthesis: true
    },
    modes: ['jsdoc'],
    catharsis: {
      closure: 'differ',
      jsdoc: 'jsdoc'
    }, // NOTE: This seems to be a catharsis error
    jtp: {
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'differ',
      permissive: 'differ'
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'function with a variable number of parameters containing the value `undefined`',
    input: 'function(...[undefined])',
    stringified: 'function(...undefined)',
    expected: {
      type: 'JsdocTypeFunction',
      parameters: [
        {
          type: 'JsdocTypeVariadic',
          element: {
            type: 'JsdocTypeUndefined'
          },
          meta: {
            position: 'prefix',
            squareBrackets: true
          }
        }
      ],
      arrow: false,
      parenthesis: true
    },
    modes: ['jsdoc'],
    catharsis: {
      closure: 'differ', // NOTE: This seems to be a catharsis error
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'differ',
      permissive: 'differ'
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'function with a variable number of parameters, a "new" type, a "this" type, and a return value',
    input: 'function(new:Master, this:Everyone, string, goog.ui.Menu, Array.<Object>, ...[string]): boolean',
    stringified: 'function(new: Master, this: Everyone, string, goog.ui.Menu, Array.<Object>, ...string): boolean',
    diffExpected: {
      jsdoc: {
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
              value: 'Master'
            }
          },
          {
            type: 'JsdocTypeKeyValue',
            optional: false,
            value: 'this',
            meta: {
              quote: undefined
            },
            right: {
              type: 'JsdocTypeName',
              value: 'Everyone'
            }
          },
          {
            type: 'JsdocTypeName',
            value: 'string'
          },
          {
            left: {
              left: {
                value: 'goog',
                type: 'JsdocTypeName'
              },
              right: {
                type: 'JsdocTypeProperty',
                value: 'ui'
              },
              type: 'JsdocTypeNamePath',
              pathType: 'property'
            },
            right: {
              type: 'JsdocTypeProperty',
              value: 'Menu'
            },
            type: 'JsdocTypeNamePath',
            pathType: 'property'
          },
          {
            type: 'JsdocTypeGeneric',
            elements: [
              {
                type: 'JsdocTypeName',
                value: 'Object'
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
            type: 'JsdocTypeVariadic',
            element: {
              type: 'JsdocTypeName',
              value: 'string'
            },
            meta: {
              squareBrackets: true,
              position: 'prefix'
            }
          }
        ],
        returnType: {
          type: 'JsdocTypeName',
          value: 'boolean'
        },
        arrow: false,
        parenthesis: true
      },
      typescript: {
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
              value: 'Master'
            }
          },
          {
            type: 'JsdocTypeKeyValue',
            optional: false,
            value: 'this',
            meta: {
              quote: undefined
            },
            right: {
              type: 'JsdocTypeName',
              value: 'Everyone'
            }
          },
          {
            type: 'JsdocTypeName',
            value: 'string'
          },
          {
            left: {
              left: {
                value: 'goog',
                type: 'JsdocTypeName'
              },
              right: {
                type: 'JsdocTypeProperty',
                value: 'ui'
              },
              type: 'JsdocTypeNamePath',
              pathType: 'property'
            },
            right: {
              type: 'JsdocTypeProperty',
              value: 'Menu'
            },
            type: 'JsdocTypeNamePath',
            pathType: 'property'
          },
          {
            type: 'JsdocTypeGeneric',
            elements: [
              {
                type: 'JsdocTypeName',
                value: 'Object'
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
            type: 'JsdocTypeVariadic',
            element: {
              type: 'JsdocTypeTuple',
              elements: [
                {
                  type: 'JsdocTypeName',
                  value: 'string'
                }
              ]
            },
            meta: {
              squareBrackets: false,
              position: 'prefix'
            }
          }
        ],
        returnType: {
          type: 'JsdocTypeName',
          value: 'boolean'
        },
        arrow: false,
        parenthesis: true
      }
    },
    modes: ['typescript', 'jsdoc'],
    catharsis: {
      closure: 'differ', // NOTE: This seems to be a catharsis error
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'fail',
      permissive: 'fail'
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'function with a repeatable param that is not enclosed in brackets',
    input: 'function(...foo)',
    expected: {
      type: 'JsdocTypeFunction',
      parameters: [
        {
          type: 'JsdocTypeVariadic',
          element: {
            type: 'JsdocTypeName',
            value: 'foo'
          },
          meta: {
            position: 'prefix',
            squareBrackets: false
          }
        }
      ],
      arrow: false,
      parenthesis: true
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
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'function that returns a type union',
    input: 'function(): (number|string)',
    stringified: 'function(): (number | string)',
    expected: {
      type: 'JsdocTypeFunction',
      parameters: [],
      returnType: {
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
              value: 'string'
            }
          ]
        }
      },
      arrow: false,
      parenthesis: true
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
    description: 'function with no parameters and no return value',
    input: 'function()',
    expected: {
      type: 'JsdocTypeFunction',
      parameters: [],
      arrow: false,
      parenthesis: true
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
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'function with a variable number of parameters containing any values',
    input: 'function(...[*])',
    stringified: 'function(...*)',
    expected: {
      type: 'JsdocTypeFunction',
      parameters: [
        {
          type: 'JsdocTypeVariadic',
          element: {
            type: 'JsdocTypeAny'
          },
          meta: {
            squareBrackets: true,
            position: 'prefix'
          }
        }
      ],
      arrow: false,
      parenthesis: true
    },
    modes: ['jsdoc'],
    catharsis: {
      closure: 'differ', // This seems to be a catharsis error
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'fail',
      jsdoc: 'fail', // NOTE: This seems to be a JTP error
      typescript: 'differ', // NOTE: This seems to be a JTP error
      permissive: 'differ'
    }
  },
  {
    description: 'function with a "this" type that returns a type union',
    input: 'function(this:Object): (number|string)',
    stringified: 'function(this: Object): (number | string)',
    expected: {
      type: 'JsdocTypeFunction',
      parameters: [
        {
          type: 'JsdocTypeKeyValue',
          optional: false,
          value: 'this',
          meta: {
            quote: undefined
          },
          right: {
            type: 'JsdocTypeName',
            value: 'Object'
          }
        }
      ],
      returnType: {
        element: {
          elements: [
            {
              type: 'JsdocTypeName',
              value: 'number'
            },
            {
              type: 'JsdocTypeName',
              value: 'string'
            }
          ],
          type: 'JsdocTypeUnion'
        },
        type: 'JsdocTypeParenthesis'
      },
      arrow: false,
      parenthesis: true
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
    description: 'function with a "this" type that is a type union, and that returns a type union',
    input: 'function(this:(Array|Date)): (number|string)',
    stringified: 'function(this: (Array | Date)): (number | string)',
    expected: {
      type: 'JsdocTypeFunction',
      parameters: [
        {
          type: 'JsdocTypeKeyValue',
          optional: false,
          value: 'this',

          meta: {

            quote: undefined

          },
          right: {
            element: {
              type: 'JsdocTypeUnion',
              elements: [
                {
                  type: 'JsdocTypeName',
                  value: 'Array'
                },
                {
                  type: 'JsdocTypeName',
                  value: 'Date'
                }
              ]
            },
            type: 'JsdocTypeParenthesis'
          }
        }
      ],
      returnType: {
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
              value: 'string'
            }
          ]
        }
      },
      arrow: false,
      parenthesis: true
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
    description: 'function with a "new" type and a variable number of params that accept all types, returning a name expression',
    input: 'function(new:Array, ...[*]): Array',
    stringified: 'function(new: Array, ...*): Array',
    diffExpected: {
      jsdoc: {
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
              value: 'Array'
            }
          },
          {
            type: 'JsdocTypeVariadic',
            element: {
              type: 'JsdocTypeAny'
            },
            meta: {
              squareBrackets: true,
              position: 'prefix'
            }
          }
        ],
        returnType: {
          type: 'JsdocTypeName',
          value: 'Array'
        },
        arrow: false,
        parenthesis: true
      },
      typescript: {
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
              value: 'Array'
            }
          },
          {
            type: 'JsdocTypeVariadic',
            element: {
              type: 'JsdocTypeTuple',
              elements: [
                {
                  type: 'JsdocTypeAny'
                }
              ]
            },
            meta: {
              squareBrackets: false,
              position: 'prefix'
            }
          }
        ],
        returnType: {
          type: 'JsdocTypeName',
          value: 'Array'
        },
        arrow: false,
        parenthesis: true
      }
    },
    modes: ['typescript', 'jsdoc'],
    catharsis: {
      closure: 'differ', // NOTE: This seems to be a catharsis error
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'typescript',
      permissive: 'typescript'
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'function with a "new" type that accepts an optional parameter of any type, as well as a return value',
    input: 'function(new:Boolean, *=): boolean',
    stringified: 'function(new: Boolean, *=): boolean',
    expected: {
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
            value: 'Boolean'
          }
        },
        {
          type: 'JsdocTypeOptional',
          element: {
            type: 'JsdocTypeAny'
          },
          meta: {
            position: 'suffix'
          }
        }
      ],
      returnType: {
        type: 'JsdocTypeName',
        value: 'boolean'
      },
      arrow: false,
      parenthesis: true
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
    description: 'function with a variable number of parameters and a return value',
    input: 'function(...[number]): boolean',
    stringified: 'function(...number): boolean',
    diffExpected: {
      jsdoc: {
        type: 'JsdocTypeFunction',
        parameters: [
          {
            type: 'JsdocTypeVariadic',
            element: {
              type: 'JsdocTypeName',
              value: 'number'
            },
            meta: {
              squareBrackets: true,
              position: 'prefix'
            }
          }
        ],
        returnType: {
          type: 'JsdocTypeName',
          value: 'boolean'
        },
        arrow: false,
        parenthesis: true
      },
      typescript: {
        type: 'JsdocTypeFunction',
        parameters: [
          {
            type: 'JsdocTypeVariadic',
            element: {
              type: 'JsdocTypeTuple',
              elements: [
                {
                  type: 'JsdocTypeName',
                  value: 'number'
                }
              ]
            },
            meta: {
              squareBrackets: false,
              position: 'prefix'
            }
          }
        ],
        returnType: {
          type: 'JsdocTypeName',
          value: 'boolean'
        },
        arrow: false,
        parenthesis: true
      }
    },
    modes: ['typescript', 'jsdoc'],
    catharsis: {
      closure: 'differ', // NOTE: This seems to be a catharsis error
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'fail',
      jsdoc: 'fail', // NOTE: This seems to be a JTP error
      typescript: 'typescript',
      permissive: 'typescript'
    }
  },
  {
    description: 'function with a "this" type and a parameter that returns a type union',
    input: 'function(this:Date, number): (boolean|number|string)',
    stringified: 'function(this: Date, number): (boolean | number | string)',
    expected: {
      type: 'JsdocTypeFunction',
      parameters: [
        {
          type: 'JsdocTypeKeyValue',
          optional: false,
          value: 'this',

          meta: {

            quote: undefined

          },
          right: {
            type: 'JsdocTypeName',
            value: 'Date'
          }
        },
        {
          type: 'JsdocTypeName',
          value: 'number'
        }
      ],
      returnType: {
        type: 'JsdocTypeParenthesis',
        element: {
          type: 'JsdocTypeUnion',
          elements: [
            {
              type: 'JsdocTypeName',
              value: 'boolean'
            },
            {
              type: 'JsdocTypeName',
              value: 'number'
            },
            {
              type: 'JsdocTypeName',
              value: 'string'
            }
          ]
        }
      },
      arrow: false,
      parenthesis: true
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
