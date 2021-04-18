import { Fixture } from '../Fixture'

export const jsdocFixtures: Fixture[] = [
  {
    description: 'name expression that starts with the word "function"',
    input: 'functional',
    expected: {
      type: 'NAME',
      name: 'functional',
      meta: {
        reservedWord: false
      }
    }
  },
  {
    description: 'name expression with instance scope punctuation',
    input: 'MyClass#myMember',
    expected: {
      type: 'NAME',
      name: 'MyClass#myMember',
      meta: {
        reservedWord: false
      }
    }
  },
  {
    description: 'name expression with inner scope punctuation',
    input: 'MyClass~myMember',
    expected: {
      type: 'NAME',
      name: 'MyClass~myMember',
      meta: {
        reservedWord: false
      }
    }
  },
  {
    description: 'name expression with instance and inner scope punctuation',
    input: 'MyClass#myMember#yourMember~theirMember',
    expected: {
      type: 'NAME',
      name: 'MyClass#myMember#yourMember~theirMember',
      meta: {
        reservedWord: false
      }
    }
  },
  {
    description: 'name expression for a class within a module',
    input: 'module:foo/bar/baz~Qux',
    expected: {
      path: 'module:foo/bar/baz~Qux',
      type: 'MODULE'
    }
  },
  {
    description: 'name expression for a class within a module with hyphens',
    input: 'module:foo-bar/baz~Qux',
    expected: {
      path: 'module:foo-bar/baz~Qux',
      type: 'MODULE'
    }
  },
  {
    description: 'name expression containing a reserved word',
    input: 'this',
    expected: {
      type: 'NAME',
      name: 'this',
      meta: {
        reservedWord: true
      }
    }
  },
  {
    description: 'name expression for a symbol variation whose name is an empty string',
    input: 'MyClass()',
    expected: {
      name: 'MyClass',
      type: 'SYMBOL'
    }
  },
  {
    description: 'name expression for a symbol variation whose name is one numeral',
    input: 'MyClass(2)',
    expected: {
      name: 'MyClass',
      type: 'SYMBOL',
      value: {
        type: 'NUMBER',
        value: 2
      }
    }
  },
  {
    description: 'name expression for a symbol variation whose name is multiple numerals',
    input: 'MyClass(23456)',
    expected: {
      name: 'MyClass',
      type: 'SYMBOL',
      value: {
        type: 'NUMBER',
        value: 23456
      }
    }
  },
  {
    description: 'name expression for a symbol variation whose name is one letter',
    input: 'MyClass(a)',
    expected: {
      name: 'MyClass',
      type: 'SYMBOL',
      value: {
        name: 'a',
        type: 'NAME',
        meta: {
          reservedWord: false
        }
      }
    }
  },
  {
    description: 'name expression for a symbol variation whose name is multiple letters',
    input: 'MyClass(abcde)',
    expected: {
      name: 'MyClass',
      type: 'SYMBOL',
      value: {
        name: 'abcde',
        type: 'NAME',
        meta: {
          reservedWord: false
        }
      }
    }
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
    }
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
    }
  },
  {
    description: 'name expression partially enclosed in double quotes',
    input: 'foo."bar.baz".qux',
    expected: {
      left: {
        name: 'foo',
        type: 'NAME',
        meta: {
          reservedWord: false
        }
      },
      path: [
        '"bar.baz"',
        'qux'
      ],
      type: 'PROPERTY_PATH'
    }
  },
  {
    description: 'name expression partially enclosed in single quotes',
    input: "foo.'bar.baz'.qux",
    expected: {
      left: {
        name: 'foo',
        type: 'NAME',
        meta: {
          reservedWord: false
        }
      },
      path: [
        "'bar.baz'",
        'qux'
      ],
      type: 'PROPERTY_PATH'
    }
  },
  {
    description: 'identifier with a repeatable param that is not enclosed in brackets',
    input: 'MyClass(...foo)',
    expected: {
      name: 'MyClass',
      type: 'SYMBOL',
      value: {
        type: 'VARIADIC',
        element: {
          name: 'foo',
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
    }
  },
  {
    description: 'type application with no period',
    input: 'Array<string>',
    expected: {
      type: 'GENERIC',
      objects: [
        {
          type: 'NAME',
          name: 'string',
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
        brackets: '<>',
        dot: false
      }
    }
  },
  {
    description: 'Jsdoc Toolkit 2-style array notation for an array of strings',
    input: 'string[]',
    expected: {
      type: 'GENERIC',
      objects: [
        {
          type: 'NAME',
          name: 'string',
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
        brackets: '[]',
        dot: false
      }
    }
  },
  {
    description: 'Jsdoc Toolkit 2-style array notation for an array of functions',
    input: 'function[]',
    expected: {
      type: 'GENERIC',
      objects: [
        {
          type: 'FUNCTION',
          parameters: [],
          meta: {
            arrow: false
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
        brackets: '[]',
        dot: false
      }
    }
  },
  {
    description: 'Jsdoc Toolkit 2-style nested array (two levels)',
    input: 'number[][]',
    expected: {
      type: 'GENERIC',
      objects: [
        {
          type: 'GENERIC',
          objects: [
            {
              type: 'NAME',
              name: 'number',
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
            brackets: '[]',
            dot: false
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
        brackets: '[]',
        dot: false
      }
    }
  },
  {
    description: 'Jsdoc Toolkit 2-style nested array (three levels)',
    input: 'number[][][]',
    expected: {
      type: 'GENERIC',
      objects: [
        {
          type: 'GENERIC',
          objects: [
            {
              type: 'GENERIC',
              objects: [
                {
                  type: 'NAME',
                  name: 'number',
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
                brackets: '[]',
                dot: false
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
            brackets: '[]',
            dot: false
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
        brackets: '[]',
        dot: false
      }
    }
  },
  {
    description: 'record type with a property that uses a type application as a key',
    input: '{Array.<string>: number}',
    expected: {
      type: 'RECORD',
      fields: [
        {
          type: 'KEY_VALUE',
          key: {
            type: 'GENERIC',
            objects: [
              {
                type: 'NAME',
                name: 'string',
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
              brackets: '<>',
              dot: true
            }
          },
          value: {
            type: 'NAME',
            name: 'number',
            meta: {
              reservedWord: false
            }
          }
        }
      ]
    }
  },
  {
    description: 'record type with a property that uses a type union as a key',
    input: '{(number|boolean|string): number}',
    expected: {
      type: 'RECORD',
      fields: [
        {
          type: 'KEY_VALUE',
          key: {
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
                name: 'boolean',
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
          value: {
            type: 'NAME',
            name: 'number',
            meta: {
              reservedWord: false
            }
          }
        }
      ]
    }
  },
  {
    description: 'record type with a property name that starts with a literal',
    input: '{undefinedHTML: (string|undefined)}',
    expected: {
      type: 'RECORD',
      fields: [
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            name: 'undefinedHTML',
            meta: {
              reservedWord: false
            }
          },
          value: {
            type: 'UNION',
            elements: [
              {
                type: 'NAME',
                name: 'string',
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
    }
  },
  {
    description: 'record type with a property that contains a function with no preceding space',
    input: '{foo:function()}',
    expected: {
      type: 'RECORD',
      fields: [
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            name: 'foo',
            meta: {
              reservedWord: false
            }
          },
          value: {
            type: 'FUNCTION',
            parameters: [],
            meta: {
              arrow: false
            }
          }
        }
      ]
    }
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
    }
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
            key: {
              type: 'NAME',
              meta: {
                reservedWord: true
              },
              name: 'this'
            },
            value: {
              left: {
                name: 'my',
                type: 'NAME',
                meta: {
                  reservedWord: false
                }
              },
              path: [
                'namespace',
                'Class'
              ],
              type: 'PROPERTY_PATH'
            }
          },
          {
            left: {
              name: 'my',
              type: 'NAME',
              meta: {
                reservedWord: false
              }
            },
            path: [
              'Class'
            ],
            type: 'PROPERTY_PATH'
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
    description: 'type union with no parentheses, a repeatable param, and a JSDoc-style array',
    input: '...string|string[]',
    expected: {
      type: 'UNION',
      elements: [
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
            squareBrackets: false,
            position: 'PREFIX'
          }
        },
        {
          type: 'GENERIC',
          objects: [
            {
              name: 'string',
              type: 'NAME',
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
            brackets: '[]',
            dot: false
          }
        }
      ]
    }
  }
]
