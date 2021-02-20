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
          name: 'string'
        },
        {
          type: 'NAME',
          name: 'boolean'
        }
      ]
    }
  },
  {
    description: 'repeatable function with two basic parameters',
    input: '...function(string, boolean)',
    expected: {
      type: 'FUNCTION',
      repeatable: true,
      parameters: [
        {
          type: 'NAME',
          name: 'string'
        },
        {
          type: 'NAME',
          name: 'boolean'
        }
      ]
    }
  },
  {
    description: 'function with two basic parameters and a return value',
    input: 'function(string, boolean): boolean',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'NAME',
          name: 'string'
        },
        {
          type: 'NAME',
          name: 'boolean'
        }
      ],
      returnType: {
        type: 'NAME',
        name: 'boolean'
      }
    }
  },
  {
    description: 'repeatable function with two basic parameters and a return value',
    input: '...function(string, boolean): boolean',
    expected: {
      type: 'FUNCTION',
      repeatable: true,
      parameters: [
        {
          type: 'NAME',
          name: 'string'
        },
        {
          type: 'NAME',
          name: 'boolean'
        }
      ],
      returnType: {
        type: 'NAME',
        name: 'boolean'
      }
    }
  },
  {
    description: 'optional function with one basic parameter',
    input: 'function(string)=',
    expected: {
      type: 'FUNCTION',
      optional: true,
      parameters: [
        {
          type: 'NAME',
          name: 'string'
        }
      ]
    }
  },
  {
    description: 'function with no parameters and a return value',
    input: 'function(): number',
    expected: {
      type: 'FUNCTION',
      parameters: [],
      returnType: {
        type: 'NAME',
        name: 'number'
      }
    }
  },
  {
    description: 'function with a "this" type and no parameters',
    input: 'function(this:goog.ui.Menu)',
    expected: {
      parameters: [
        {
          key: {
            name: 'this',
            reservedWord: true,
            type: 'NAME'
          },
          type: 'KEY_VALUE',
          value: {
            left: {
              name: 'goog',
              type: 'NAME'
            },
            path: [
              'ui',
              'Menu'
            ],
            type: 'PROPERTY_PATH'
          }
        }
      ],
      type: 'FUNCTION'
    }
  },
  {
    description: 'function with a "this" type and one parameter',
    input: 'function(this:goog.ui.Menu, string)',
    expected: {
      parameters: [
        {
          key: {
            name: 'this',
            reservedWord: true,
            type: 'NAME'
          },
          type: 'KEY_VALUE',
          value: {
            left: {
              name: 'goog',
              type: 'NAME'
            },
            path: [
              'ui',
              'Menu'
            ],
            type: 'PROPERTY_PATH'
          }
        },
        {
          name: 'string',
          type: 'NAME'
        }
      ],
      type: 'FUNCTION'
    }
  },
  {
    description: 'function with a "new" type and no parameters',
    input: 'function(new:goog.ui.Menu)',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            name: 'new',
            reservedWord: true
          },
          value: {
            left: {
              name: 'goog',
              type: 'NAME'
            },
            path: [
              'ui',
              'Menu'
            ],
            type: 'PROPERTY_PATH'
          }
        }
      ]
    }
  },
  {
    description: 'function with a "new" type and one parameter',
    input: 'function(new:goog.ui.Menu, string)',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            name: 'new',
            reservedWord: true
          },
          value: {
            left: {
              name: 'goog',
              type: 'NAME'
            },
            path: [
              'ui',
              'Menu'
            ],
            type: 'PROPERTY_PATH'
          }
        },
        {
          type: 'NAME',
          name: 'string'
        }
      ]
    }
  },
  {
    description: 'function with a "new" and "this" type and no parameters',
    input: 'function(new:goog.ui.Menu, this:goog.ui)',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            name: 'new',
            reservedWord: true
          },
          value: {
            left: {
              name: 'goog',
              type: 'NAME'
            },
            path: [
              'ui',
              'Menu'
            ],
            type: 'PROPERTY_PATH'
          }
        },
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            reservedWord: true,
            name: 'this'
          },
          value: {
            left: {
              name: 'goog',
              type: 'NAME'
            },
            path: [
              'ui'
            ],
            type: 'PROPERTY_PATH'
          }
        }
      ]
    }
  },
  {
    description: 'function with a fixed parameter, followed by a variable number of parameters, as well as a return value',
    input: 'function(string, ...[number]): number',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'NAME',
          name: 'string'
        },
        {
          type: 'NAME',
          name: 'number',
          repeatable: true
        }
      ],
      returnType: {
        type: 'NAME',
        name: 'number'
      }
    }
  },
  {
    description: 'function with a variable number of parameters containing the value `null`',
    input: 'function(...[null])',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'NULL',
          repeatable: true
        }
      ]
    }
  },
  {
    description: 'function with a variable number of parameters containing the value `undefined`',
    input: 'function(...[undefined])',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'UNDEFINED',
          repeatable: true
        }
      ]
    }
  },
  {
    description: 'function with a variable number of parameters, a "new" type, a "this" type, and a return value',
    input: 'function(new:Master, this:Everyone, string, goog.ui.Menu, Array.<Object>, ...[string]): boolean',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            name: 'new',
            reservedWord: true
          },
          value: {
            type: 'NAME',
            name: 'Master'
          }
        },
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            reservedWord: true,
            name: 'this'
          },
          value: {
            type: 'NAME',
            name: 'Everyone'
          }
        },
        {
          type: 'NAME',
          name: 'string'
        },
        {
          left: {
            name: 'goog',
            type: 'NAME'
          },
          path: [
            'ui',
            'Menu'
          ],
          type: 'PROPERTY_PATH'
        },
        {
          type: 'GENERIC',
          objects: [
            {
              type: 'NAME',
              name: 'Object'
            }
          ],
          subject: {
            type: 'NAME',
            name: 'Array'
          }
        },
        {
          type: 'NAME',
          name: 'string',
          repeatable: true
        }
      ],
      returnType: {
        type: 'NAME',
        name: 'boolean'
      }
    }
  },
  {
    description: 'function with a repeatable param that is not enclosed in brackets',
    input: 'function(...foo)',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'NAME',
          name: 'foo',
          repeatable: true
        }
      ]
    }
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
            name: 'number'
          },
          {
            type: 'NAME',
            name: 'string'
          }
        ]
      }
    }
  },
  {
    description: 'function with no parameters and no return value',
    input: 'function()',
    expected: {
      type: 'FUNCTION',
      parameters: []
    }
  },
  {
    description: 'function with a variable number of parameters containing any values',
    input: 'function(...[*])',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'ALL',
          repeatable: true
        }
      ]
    }
  },
  {
    description: 'function with a "this" type that returns a type union',
    input: 'function(this:Object): (number|string)',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            reservedWord: true,
            name: 'this'
          },
          value: {
            type: 'NAME',
            name: 'Object'
          }
        }
      ],
      returnType: {
        type: 'UNION',
        elements: [
          {
            type: 'NAME',
            name: 'number'
          },
          {
            type: 'NAME',
            name: 'string'
          }
        ]
      }
    }
  },
  {
    description: 'function with a "this" type that is a type union, and that returns a type union',
    input: 'function(this:(Array|Date)): (number|string)',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            reservedWord: true,
            name: 'this'
          },
          value: {
            type: 'UNION',
            elements: [
              {
                type: 'NAME',
                name: 'Array'
              },
              {
                type: 'NAME',
                name: 'Date'
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
            name: 'number'
          },
          {
            type: 'NAME',
            name: 'string'
          }
        ]
      }
    }
  },
  {
    description: 'function with a "new" type and a variable number of params that accept all types, returning a name expression',
    input: 'function(new:Array, ...[*]): Array',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            reservedWord: true,
            name: 'new'
          },
          value: {
            type: 'NAME',
            name: 'Array'
          }
        },
        {
          type: 'ALL',
          repeatable: true
        }
      ],
      returnType: {
        type: 'NAME',
        name: 'Array'
      }
    }
  },
  {
    description: 'function with a "new" type that accepts an optional parameter of any type, as well as a return value',
    input: 'function(new:Boolean, *=): boolean',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            reservedWord: true,
            name: 'new'
          },
          value: {
            type: 'NAME',
            name: 'Boolean'
          }
        },
        {
          type: 'ALL',
          optional: true
        }
      ],
      returnType: {
        type: 'NAME',
        name: 'boolean'
      }
    }
  },
  {
    description: 'function with a variable number of parameters and a return value',
    input: 'function(...[number]): boolean',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'NAME',
          name: 'number',
          repeatable: true
        }
      ],
      returnType: {
        type: 'NAME',
        name: 'boolean'
      }
    }
  },
  {
    description: 'function with a "this" type and a parameter that returns a type union',
    input: 'function(this:Date, number): (boolean|number|string)',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            reservedWord: true,
            name: 'this'
          },
          value: {
            type: 'NAME',
            name: 'Date'
          }
        },
        {
          type: 'NAME',
          name: 'number'
        }
      ],
      returnType: {
        type: 'UNION',
        elements: [
          {
            type: 'NAME',
            name: 'boolean'
          },
          {
            type: 'NAME',
            name: 'number'
          },
          {
            type: 'NAME',
            name: 'string'
          }
        ]
      }
    }
  }
]
