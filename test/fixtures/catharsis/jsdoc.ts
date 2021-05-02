import { Fixture } from '../Fixture'

export const jsdocFixtures: Fixture[] = [
  {
    description: 'name expression that starts with the word "function"',
    input: 'functional',
    expected: {
      type: 'NAME',
      value: 'functional',
      meta: {
        reservedWord: false
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'name expression with instance scope punctuation',
    input: 'MyClass#myMember',
    expected: {
      type: 'NAME',
      value: 'MyClass#myMember',
      meta: {
        reservedWord: false
      }
    },
    modes: ['jsdoc'],
    catharsisModes: ['closure', 'jsdoc'], // NOTE: This seems to be a Catharsis error
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive'] // NOTE: This seems to be a JTP error
  },
  {
    description: 'name expression with inner scope punctuation',
    input: 'MyClass~myMember',
    expected: {
      type: 'NAME',
      value: 'MyClass~myMember',
      meta: {
        reservedWord: false
      }
    },
    modes: ['jsdoc'],
    catharsisModes: ['closure', 'jsdoc'], // NOTE: This seems to be a Catharsis error
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive'] // NOTE: This seems to be a JTP error
  },
  {
    description: 'name expression with instance and inner scope punctuation',
    input: 'MyClass#myMember#yourMember~theirMember',
    expected: {
      type: 'NAME',
      value: 'MyClass#myMember#yourMember~theirMember',
      meta: {
        reservedWord: false
      }
    },
    modes: ['jsdoc'],
    catharsisModes: ['closure', 'jsdoc'], // NOTE: This seems to be a Catharsis error
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive'] // NOTE: This seems to be a JTP error
  },
  {
    description: 'name expression for a class within a module',
    input: 'module:foo/bar/baz~Qux',
    expected: {
      value: 'module:foo/bar/baz~Qux',
      type: 'MODULE'
    },
    modes: ['jsdoc'],
    catharsisModes: ['closure', 'jsdoc'], // NOTE: This seems to be a Catharsis error
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive'] // NOTE: This seems to be a JTP error
  },
  {
    description: 'name expression for a class within a module with hyphens',
    input: 'module:foo-bar/baz~Qux',
    expected: {
      value: 'module:foo-bar/baz~Qux',
      type: 'MODULE'
    },
    modes: ['jsdoc'],
    catharsisModes: ['closure', 'jsdoc'], // NOTE: This seems to be a Catharsis error
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive'] // NOTE: This seems to be a JTP error
  },
  {
    description: 'name expression containing a reserved word',
    input: 'this',
    expected: {
      type: 'NAME',
      value: 'this',
      meta: {
        reservedWord: true
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'name expression for a symbol variation whose name is an empty string',
    input: 'MyClass()',
    expected: {
      value: 'MyClass',
      type: 'SYMBOL'
    },
    modes: ['jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'name expression for a symbol variation whose name is one numeral',
    input: 'MyClass(2)',
    expected: {
      value: 'MyClass',
      type: 'SYMBOL',
      element: {
        type: 'NUMBER',
        value: 2
      }
    },
    modes: ['jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'name expression for a symbol variation whose name is multiple numerals',
    input: 'MyClass(23456)',
    expected: {
      value: 'MyClass',
      type: 'SYMBOL',
      element: {
        type: 'NUMBER',
        value: 23456
      }
    },
    modes: ['jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'name expression for a symbol variation whose name is one letter',
    input: 'MyClass(a)',
    expected: {
      value: 'MyClass',
      type: 'SYMBOL',
      element: {
        value: 'a',
        type: 'NAME',
        meta: {
          reservedWord: false
        }
      }
    },
    modes: ['jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'name expression for a symbol variation whose name is multiple letters',
    input: 'MyClass(abcde)',
    expected: {
      value: 'MyClass',
      type: 'SYMBOL',
      element: {
        value: 'abcde',
        type: 'NAME',
        meta: {
          reservedWord: false
        }
      }
    },
    modes: ['jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'name expression enclosed in double quotes',
    input: '"foo.bar.baz"',
    expected: {
      type: 'STRING_VALUE',
      value: 'foo.bar.baz',
      meta: {
        quote: '"'
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'name expression enclosed in single quotes',
    input: "'foo.bar.baz'",
    expected: {
      type: 'STRING_VALUE',
      value: 'foo.bar.baz',
      meta: {
        quote: '\''
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'name expression partially enclosed in double quotes',
    input: 'foo."bar.baz".qux',
    expected: {
      left: {
        value: 'foo',
        type: 'NAME',
        meta: {
          reservedWord: false
        }
      },
      value: [
        '"bar.baz"',
        'qux'
      ],
      type: 'NAME_PATH'
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'name expression partially enclosed in single quotes',
    input: "foo.'bar.baz'.qux",
    expected: {
      left: {
        value: 'foo',
        type: 'NAME',
        meta: {
          reservedWord: false
        }
      },
      value: [
        "'bar.baz'",
        'qux'
      ],
      type: 'NAME_PATH'
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'identifier with a repeatable param that is not enclosed in brackets',
    input: 'MyClass(...foo)',
    expected: {
      value: 'MyClass',
      type: 'SYMBOL',
      element: {
        type: 'VARIADIC',
        element: {
          value: 'foo',
          type: 'NAME',
          meta: {
            reservedWord: false
          }
        },
        meta: {
          squareBrackets: false,
          position: 'PREFIX'
        }
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'type application with no period',
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
        brackets: '<>',
        dot: false
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'Jsdoc Toolkit 2-style array notation for an array of strings',
    input: 'string[]',
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
        brackets: '[]',
        dot: false
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'Jsdoc Toolkit 2-style array notation for an array of functions',
    input: 'function[]',
    expected: {
      type: 'GENERIC',
      elements: [
        {
          type: 'FUNCTION',
          parameters: [],
          meta: {
            arrow: false
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
        brackets: '[]',
        dot: false
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'Jsdoc Toolkit 2-style nested array (two levels)',
    input: 'number[][]',
    expected: {
      type: 'GENERIC',
      elements: [
        {
          type: 'GENERIC',
          elements: [
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
            value: 'Array',
            meta: {
              reservedWord: false
            }
          },
          meta: {
            brackets: '[]',
            dot: false
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
        brackets: '[]',
        dot: false
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'Jsdoc Toolkit 2-style nested array (three levels)',
    input: 'number[][][]',
    expected: {
      type: 'GENERIC',
      elements: [
        {
          type: 'GENERIC',
          elements: [
            {
              type: 'GENERIC',
              elements: [
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
                value: 'Array',
                meta: {
                  reservedWord: false
                }
              },
              meta: {
                brackets: '[]',
                dot: false
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
            brackets: '[]',
            dot: false
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
        brackets: '[]',
        dot: false
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'record type with a property that uses a type application as a key',
    input: '{Array.<string>: number}',
    expected: {
      type: 'RECORD',
      fields: [
        {
          type: 'KEY_VALUE',
          left: {
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
              brackets: '<>',
              dot: true
            }
          },
          right: {
            type: 'NAME',
            value: 'number',
            meta: {
              reservedWord: false
            }
          }
        }
      ]
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'record type with a property that uses a type union as a key',
    input: '{(number|boolean|string): number}',
    expected: {
      type: 'RECORD',
      fields: [
        {
          type: 'KEY_VALUE',
          left: {
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
          right: {
            type: 'NAME',
            value: 'number',
            meta: {
              reservedWord: false
            }
          }
        }
      ]
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'record type with a property name that starts with a literal',
    input: '{undefinedHTML: (string|undefined)}',
    expected: {
      type: 'RECORD',
      fields: [
        {
          type: 'KEY_VALUE',
          left: {
            type: 'NAME',
            value: 'undefinedHTML',
            meta: {
              reservedWord: false
            }
          },
          right: {
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
                type: 'UNDEFINED'
              }
            ]
          }
        }
      ]
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'record type with a property that contains a function with no preceding space',
    input: '{foo:function()}',
    expected: {
      type: 'RECORD',
      fields: [
        {
          type: 'KEY_VALUE',
          left: {
            type: 'NAME',
            value: 'foo',
            meta: {
              reservedWord: false
            }
          },
          right: {
            type: 'FUNCTION',
            parameters: [],
            meta: {
              arrow: false
            }
          }
        }
      ]
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'function type with no trailing pathentheses',
    input: 'function',
    expected: {
      type: 'FUNCTION',
      parameters: [],
      meta: {
        arrow: false
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'standard function type (should still parse if JSDoc expressions are allowed)',
    input: 'function(this:my.namespace.Class, my.Class)=',
    expected: {
      type: 'OPTIONAL',
      element: {
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
              left: {
                value: 'my',
                type: 'NAME',
                meta: {
                  reservedWord: false
                }
              },
              value: [
                'namespace',
                'Class'
              ],
              type: 'NAME_PATH'
            }
          },
          {
            left: {
              value: 'my',
              type: 'NAME',
              meta: {
                reservedWord: false
              }
            },
            value: [
              'Class'
            ],
            type: 'NAME_PATH'
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
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'type union with no parentheses, a repeatable param, and a JSDoc-style array',
    input: '...string|string[]',
    expected: {
      type: 'UNION',
      elements: [
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
            squareBrackets: false,
            position: 'PREFIX'
          }
        },
        {
          type: 'GENERIC',
          elements: [
            {
              value: 'string',
              type: 'NAME',
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
            brackets: '[]',
            dot: false
          }
        }
      ]
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  }
]
