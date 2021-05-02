import { Fixture } from '../Fixture'

export const functionFixtures: Fixture[] = [
  {
    description: 'function with two basic parameters',
    input: 'function(string, boolean)',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'NAME',
          value: 'string',
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
      ],
      meta: {
        arrow: false
      }
    },
    modes: ['jsdoc', 'closure'], // typescript does not allow function types without return type
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive'] // NOTE: This seems to be a JTP error
  },
  {
    description: 'repeatable function with two basic parameters',
    input: '...function(string, boolean)',
    expected: {
      type: 'VARIADIC',
      element: {
        type: 'FUNCTION',
        parameters: [
          {
            type: 'NAME',
            value: 'string',
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
        ],
        meta: {
          arrow: false
        }
      },
      meta: {
        position: 'PREFIX',
        squareBrackets: false
      }
    },
    modes: ['jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive'] // NOTE: This seems to be a JTP error
  },
  {
    description: 'function with two basic parameters and a return value',
    input: 'function(string, boolean): boolean',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'NAME',
          value: 'string',
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
      ],
      returnType: {
        type: 'NAME',
        value: 'boolean',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        arrow: false
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'repeatable function with two basic parameters and a return value',
    input: '...function(string, boolean): boolean',
    expected: {
      type: 'VARIADIC',
      element: {
        type: 'FUNCTION',
        parameters: [
          {
            type: 'NAME',
            value: 'string',
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
        ],
        returnType: {
          type: 'NAME',
          value: 'boolean',
          meta: {
            reservedWord: false
          }
        },
        meta: {
          arrow: false
        }
      },
      meta: {
        squareBrackets: false,
        position: 'PREFIX'
      }
    },
    modes: ['jsdoc', 'typescript', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'optional function with one basic parameter',
    input: 'function(string)=',
    expected: {
      type: 'OPTIONAL',
      element: {
        type: 'FUNCTION',
        parameters: [
          {
            type: 'NAME',
            value: 'string',
            meta: {
              reservedWord: false
            }
          }
        ],
        meta: {
          arrow: false
        }
      },
      meta: {
        position: 'SUFFIX'
      }
    },
    modes: ['jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive'] // NOTE: This seems to be a JTP error
  },
  {
    description: 'function with no parameters and a return value',
    input: 'function(): number',
    expected: {
      type: 'FUNCTION',
      parameters: [],
      returnType: {
        type: 'NAME',
        value: 'number',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        arrow: false
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'function with a "this" type and no parameters',
    input: 'function(this:goog.ui.Menu)',
    expected: {
      parameters: [
        {
          left: {
            value: 'this',
            type: 'NAME',
            meta: {
              reservedWord: true
            }
          },
          type: 'KEY_VALUE',
          right: {
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
              meta: {
                type: '.'
              }
            },
            right: {
              type: 'NAME',
              value: 'Menu',
              meta: {
                reservedWord: false
              }
            },
            type: 'NAME_PATH',
            meta: {
              type: '.'
            }
          }
        }
      ],
      type: 'FUNCTION',
      meta: {
        arrow: false
      }
    },
    modes: ['jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive'] // NOTE: This seems to be a JTP error
  },
  {
    description: 'function with a "this" type and one parameter',
    input: 'function(this:goog.ui.Menu, string)',
    expected: {
      parameters: [
        {
          left: {
            value: 'this',
            type: 'NAME',
            meta: {
              reservedWord: true
            }
          },
          type: 'KEY_VALUE',
          right: {
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
              meta: {
                type: '.'
              }
            },
            right: {
              type: 'NAME',
              value: 'Menu',
              meta: {
                reservedWord: false
              }
            },
            type: 'NAME_PATH',
            meta: {
              type: '.'
            }
          }
        },
        {
          value: 'string',
          type: 'NAME',
          meta: {
            reservedWord: false
          }
        }
      ],
      type: 'FUNCTION',
      meta: {
        arrow: false
      }
    },
    modes: ['jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive'] // NOTE: This seems to be a JTP error
  },
  {
    description: 'function with a "new" type and no parameters',
    input: 'function(new:goog.ui.Menu)',
    expected: {
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
              meta: {
                type: '.'
              }
            },
            right: {
              type: 'NAME',
              value: 'Menu',
              meta: {
                reservedWord: false
              }
            },
            type: 'NAME_PATH',
            meta: {
              type: '.'
            }
          }
        }
      ],
      meta: {
        arrow: false
      }
    },
    modes: ['jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive'] // NOTE: This seems to be a JTP error
  },
  {
    description: 'function with a "new" type and one parameter',
    input: 'function(new:goog.ui.Menu, string)',
    expected: {
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
              meta: {
                type: '.'
              }
            },
            right: {
              type: 'NAME',
              value: 'Menu',
              meta: {
                reservedWord: false
              }
            },
            type: 'NAME_PATH',
            meta: {
              type: '.'
            }
          }
        },
        {
          type: 'NAME',
          value: 'string',
          meta: {
            reservedWord: false
          }
        }
      ],
      meta: {
        arrow: false
      }
    },
    modes: ['jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive'] // NOTE: This seems to be a JTP error
  },
  {
    description: 'function with a "new" and "this" type and no parameters',
    input: 'function(new:goog.ui.Menu, this:goog.ui)',
    expected: {
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
              meta: {
                type: '.'
              }
            },
            right: {
              type: 'NAME',
              value: 'Menu',
              meta: {
                reservedWord: false
              }
            },
            type: 'NAME_PATH',
            meta: {
              type: '.'
            }
          }
        },
        {
          type: 'KEY_VALUE',
          left: {
            type: 'NAME',
            value: 'this',
            meta: {
              reservedWord: true
            }
          },
          right: {
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
            meta: {
              type: '.'
            }
          }
        }
      ],
      meta: {
        arrow: false
      }
    },
    modes: ['jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: [] // NOTE: This seems to be a JTP error
  },
  {
    description: 'function with a fixed parameter, followed by a variable number of parameters, as well as a return value',
    input: 'function(string, ...[number]): number',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'NAME',
          value: 'string',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'VARIADIC',
          element: {
            type: 'NAME',
            value: 'number',
            meta: {
              reservedWord: false
            }
          },
          meta: {
            position: 'PREFIX',
            squareBrackets: true
          }
        }
      ],
      returnType: {
        type: 'NAME',
        value: 'number',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        arrow: false
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['typescript', 'permissive'] // NOTE: This seems to be a JTP error
  },
  {
    description: 'function with a variable number of parameters containing the value `null`',
    input: 'function(...[null])',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'VARIADIC',
          element: {
            type: 'NULL'
          },
          meta: {
            squareBrackets: true,
            position: 'PREFIX'
          }
        }
      ],
      meta: {
        arrow: false
      }
    },
    modes: ['jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['typescript', 'permissive'] // NOTE: This seems to be a JTP error
  },
  {
    description: 'function with a variable number of parameters containing the value `undefined`',
    input: 'function(...[undefined])',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'VARIADIC',
          element: {
            type: 'UNDEFINED'
          },
          meta: {
            position: 'PREFIX',
            squareBrackets: true
          }
        }
      ],
      meta: {
        arrow: false
      }
    },
    modes: ['jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['typescript', 'permissive'] // NOTE: This seems to be a JTP error
  },
  {
    description: 'function with a variable number of parameters, a "new" type, a "this" type, and a return value',
    input: 'function(new:Master, this:Everyone, string, goog.ui.Menu, Array.<Object>, ...[string]): boolean',
    expected: {
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
            value: 'Master',
            meta: {
              reservedWord: false
            }
          }
        },
        {
          type: 'KEY_VALUE',
          left: {
            type: 'NAME',
            meta: {
              reservedWord: true
            },
            value: 'this'
          },
          right: {
            type: 'NAME',
            value: 'Everyone',
            meta: {
              reservedWord: false
            }
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
            meta: {
              type: '.'
            }
          },
          right: {
            type: 'NAME',
            value: 'Menu',
            meta: {
              reservedWord: false
            }
          },
          type: 'NAME_PATH',
          meta: {
            type: '.'
          }
        },
        {
          type: 'GENERIC',
          elements: [
            {
              type: 'NAME',
              value: 'Object',
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
          type: 'VARIADIC',
          element: {
            type: 'NAME',
            value: 'string',
            meta: {
              reservedWord: false
            }
          },
          meta: {
            squareBrackets: true,
            position: 'PREFIX'
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
        arrow: false
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: [] // NOTE: This seems to be a JTP error
  },
  {
    description: 'function with a repeatable param that is not enclosed in brackets',
    input: 'function(...foo)',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'VARIADIC',
          element: {
            type: 'NAME',
            value: 'foo',
            meta: {
              reservedWord: false
            }
          },
          meta: {
            position: 'PREFIX',
            squareBrackets: false
          }
        }
      ],
      meta: {
        arrow: false
      }
    },
    modes: ['jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive'] // NOTE: This seems to be a JTP error
  },
  {
    description: 'function that returns a type union',
    input: 'function(): (number|string)',
    expected: {
      type: 'FUNCTION',
      parameters: [],
      returnType: {
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
      meta: {
        arrow: false
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'function with no parameters and no return value',
    input: 'function()',
    expected: {
      type: 'FUNCTION',
      parameters: [],
      meta: {
        arrow: false
      }
    },
    modes: ['jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive'] // NOTE: This seems to be a JTP error
  },
  {
    description: 'function with a variable number of parameters containing any values',
    input: 'function(...[*])',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'VARIADIC',
          element: {
            type: 'ALL'
          },
          meta: {
            squareBrackets: true,
            position: 'PREFIX'
          }
        }
      ],
      meta: {
        arrow: false
      }
    },
    modes: ['jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['typescript', 'permissive'] // NOTE: This seems to be a JTP error
  },
  {
    description: 'function with a "this" type that returns a type union',
    input: 'function(this:Object): (number|string)',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'KEY_VALUE',
          left: {
            type: 'NAME',
            meta: {
              reservedWord: true
            },
            value: 'this'
          },
          right: {
            type: 'NAME',
            value: 'Object',
            meta: {
              reservedWord: false
            }
          }
        }
      ],
      returnType: {
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
      meta: {
        arrow: false
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'function with a "this" type that is a type union, and that returns a type union',
    input: 'function(this:(Array|Date)): (number|string)',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'KEY_VALUE',
          left: {
            type: 'NAME',
            meta: {
              reservedWord: true
            },
            value: 'this'
          },
          right: {
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
                type: 'NAME',
                value: 'Date',
                meta: {
                  reservedWord: false
                }
              }
            ]
          }
        }
      ],
      returnType: {
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
      meta: {
        arrow: false
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'function with a "new" type and a variable number of params that accept all types, returning a name expression',
    input: 'function(new:Array, ...[*]): Array',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'KEY_VALUE',
          left: {
            type: 'NAME',
            meta: {
              reservedWord: true
            },
            value: 'new'
          },
          right: {
            type: 'NAME',
            value: 'Array',
            meta: {
              reservedWord: false
            }
          }
        },
        {
          type: 'VARIADIC',
          element: {
            type: 'ALL'
          },
          meta: {
            squareBrackets: true,
            position: 'PREFIX'
          }
        }
      ],
      returnType: {
        type: 'NAME',
        value: 'Array',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        arrow: false
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['typescript', 'permissive'] // NOTE: This seems to be a JTP error
  },
  {
    description: 'function with a "new" type that accepts an optional parameter of any type, as well as a return value',
    input: 'function(new:Boolean, *=): boolean',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'KEY_VALUE',
          left: {
            type: 'NAME',
            meta: {
              reservedWord: true
            },
            value: 'new'
          },
          right: {
            type: 'NAME',
            value: 'Boolean',
            meta: {
              reservedWord: false
            }
          }
        },
        {
          type: 'OPTIONAL',
          element: {
            type: 'ALL'
          },
          meta: {
            position: 'SUFFIX'
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
        arrow: false
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'function with a variable number of parameters and a return value',
    input: 'function(...[number]): boolean',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'VARIADIC',
          element: {
            type: 'NAME',
            value: 'number',
            meta: {
              reservedWord: false
            }
          },
          meta: {
            squareBrackets: true,
            position: 'PREFIX'
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
        arrow: false
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['typescript', 'permissive'] // NOTE: This seems to be a JTP error
  },
  {
    description: 'function with a "this" type and a parameter that returns a type union',
    input: 'function(this:Date, number): (boolean|number|string)',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'KEY_VALUE',
          left: {
            type: 'NAME',
            meta: {
              reservedWord: true
            },
            value: 'this'
          },
          right: {
            type: 'NAME',
            value: 'Date',
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
      meta: {
        arrow: false
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  }
]
