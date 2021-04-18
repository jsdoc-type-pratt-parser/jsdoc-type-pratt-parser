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
          name: 'string',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'NAME',
          name: 'boolean',
          meta: {
            reservedWord: false
          }
        }
      ],
      meta: {
        arrow: false
      }
    }
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
            name: 'string',
            meta: {
              reservedWord: false
            }
          },
          {
            type: 'NAME',
            name: 'boolean',
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
          name: 'string',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'NAME',
          name: 'boolean',
          meta: {
            reservedWord: false
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
        arrow: false
      }
    }
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
            name: 'string',
            meta: {
              reservedWord: false
            }
          },
          {
            type: 'NAME',
            name: 'boolean',
            meta: {
              reservedWord: false
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
          arrow: false
        }
      },
      meta: {
        squareBrackets: false,
        position: 'PREFIX'
      }
    }
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
            name: 'string',
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
        name: 'number',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        arrow: false
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
            type: 'NAME',
            meta: {
              reservedWord: true
            }
          },
          type: 'KEY_VALUE',
          value: {
            left: {
              name: 'goog',
              type: 'NAME',
              meta: {
                reservedWord: false
              }
            },
            path: [
              'ui',
              'Menu'
            ],
            type: 'PROPERTY_PATH'
          }
        }
      ],
      type: 'FUNCTION',
      meta: {
        arrow: false
      }
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
            type: 'NAME',
            meta: {
              reservedWord: true
            }
          },
          type: 'KEY_VALUE',
          value: {
            left: {
              name: 'goog',
              type: 'NAME',
              meta: {
                reservedWord: false
              }
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
            meta: {
              reservedWord: true
            }
          },
          value: {
            left: {
              name: 'goog',
              type: 'NAME',
              meta: {
                reservedWord: false
              }
            },
            path: [
              'ui',
              'Menu'
            ],
            type: 'PROPERTY_PATH'
          }
        }
      ],
      meta: {
        arrow: false
      }
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
            meta: {
              reservedWord: true
            }
          },
          value: {
            left: {
              name: 'goog',
              type: 'NAME',
              meta: {
                reservedWord: false
              }
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
          name: 'string',
          meta: {
            reservedWord: false
          }
        }
      ],
      meta: {
        arrow: false
      }
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
            meta: {
              reservedWord: true
            }
          },
          value: {
            left: {
              name: 'goog',
              type: 'NAME',
              meta: {
                reservedWord: false
              }
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
            name: 'this',
            meta: {
              reservedWord: true
            }
          },
          value: {
            left: {
              name: 'goog',
              type: 'NAME',
              meta: {
                reservedWord: false
              }
            },
            path: [
              'ui'
            ],
            type: 'PROPERTY_PATH'
          }
        }
      ],
      meta: {
        arrow: false
      }
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
          name: 'string',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'VARIADIC',
          element: {
            type: 'NAME',
            name: 'number',
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
        name: 'number',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        arrow: false
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
    }
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
            meta: {
              reservedWord: true
            }
          },
          value: {
            type: 'NAME',
            name: 'Master',
            meta: {
              reservedWord: false
            }
          }
        },
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            meta: {
              reservedWord: true
            },
            name: 'this'
          },
          value: {
            type: 'NAME',
            name: 'Everyone',
            meta: {
              reservedWord: false
            }
          }
        },
        {
          type: 'NAME',
          name: 'string',
          meta: {
            reservedWord: false
          }
        },
        {
          left: {
            name: 'goog',
            type: 'NAME',
            meta: {
              reservedWord: false
            }
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
              name: 'Object',
              meta: {
                reservedWord: false
              }
            }
          ],
          subject: {
            type: 'NAME',
            name: 'Array',
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
            name: 'string',
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
        name: 'boolean',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        arrow: false
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
          type: 'VARIADIC',
          element: {
            type: 'NAME',
            name: 'foo',
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
            name: 'number',
            meta: {
              reservedWord: false
            }
          },
          {
            type: 'NAME',
            name: 'string',
            meta: {
              reservedWord: false
            }
          }
        ]
      },
      meta: {
        arrow: false
      }
    }
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
    }
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
            meta: {
              reservedWord: true
            },
            name: 'this'
          },
          value: {
            type: 'NAME',
            name: 'Object',
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
            name: 'number',
            meta: {
              reservedWord: false
            }
          },
          {
            type: 'NAME',
            name: 'string',
            meta: {
              reservedWord: false
            }
          }
        ]
      },
      meta: {
        arrow: false
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
            meta: {
              reservedWord: true
            },
            name: 'this'
          },
          value: {
            type: 'UNION',
            elements: [
              {
                type: 'NAME',
                name: 'Array',
                meta: {
                  reservedWord: false
                }
              },
              {
                type: 'NAME',
                name: 'Date',
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
            name: 'number',
            meta: {
              reservedWord: false
            }
          },
          {
            type: 'NAME',
            name: 'string',
            meta: {
              reservedWord: false
            }
          }
        ]
      },
      meta: {
        arrow: false
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
            meta: {
              reservedWord: true
            },
            name: 'new'
          },
          value: {
            type: 'NAME',
            name: 'Array',
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
        name: 'Array',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        arrow: false
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
            meta: {
              reservedWord: true
            },
            name: 'new'
          },
          value: {
            type: 'NAME',
            name: 'Boolean',
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
        name: 'boolean',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        arrow: false
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
          type: 'VARIADIC',
          element: {
            type: 'NAME',
            name: 'number',
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
        name: 'boolean',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        arrow: false
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
            meta: {
              reservedWord: true
            },
            name: 'this'
          },
          value: {
            type: 'NAME',
            name: 'Date',
            meta: {
              reservedWord: false
            }
          }
        },
        {
          type: 'NAME',
          name: 'number',
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
            name: 'boolean',
            meta: {
              reservedWord: false
            }
          },
          {
            type: 'NAME',
            name: 'number',
            meta: {
              reservedWord: false
            }
          },
          {
            type: 'NAME',
            name: 'string',
            meta: {
              reservedWord: false
            }
          }
        ]
      },
      meta: {
        arrow: false
      }
    }
  }
]
