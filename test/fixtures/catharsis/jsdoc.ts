import { Fixture } from '../Fixture'

export const jsdocFixtures: Fixture[] = [
  {
    description: 'name expression that starts with the word "function"',
    input: 'functional',
    expected: {
      type: 'NAME',
      name: 'functional'
    }
  },
  {
    description: 'name expression with instance scope punctuation',
    input: 'MyClass#myMember',
    expected: {
      type: 'NAME',
      name: 'MyClass#myMember'
    }
  },
  {
    description: 'name expression with inner scope punctuation',
    input: 'MyClass~myMember',
    expected: {
      type: 'NAME',
      name: 'MyClass~myMember'
    }
  },
  {
    description: 'name expression with instance and inner scope punctuation',
    input: 'MyClass#myMember#yourMember~theirMember',
    expected: {
      type: 'NAME',
      name: 'MyClass#myMember#yourMember~theirMember'
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
      reservedWord: true
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
        type: 'NAME'
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
        type: 'NAME'
      }
    }
  },
  {
    description: 'name expression enclosed in double quotes',
    input: '"foo.bar.baz"',
    expected: {
      quote: '"',
      type: 'STRING_VALUE',
      value: 'foo.bar.baz'
    }
  },
  {
    description: 'name expression enclosed in single quotes',
    input: "'foo.bar.baz'",
    expected: {
      quote: "'",
      type: 'STRING_VALUE',
      value: 'foo.bar.baz'
    }
  },
  {
    description: 'name expression partially enclosed in double quotes',
    input: 'foo."bar.baz".qux',
    expected: {
      left: {
        name: 'foo',
        type: 'NAME'
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
        type: 'NAME'
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
        name: 'foo',
        repeatable: true,
        type: 'NAME'
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
          name: 'string'
        }
      ],
      subject: {
        type: 'NAME',
        name: 'Array'
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
          name: 'string'
        }
      ],
      subject: {
        type: 'NAME',
        name: 'Array'
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
          parameters: []
        }
      ],
      subject: {
        type: 'NAME',
        name: 'Array'
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
              name: 'number'
            }
          ],
          subject: {
            type: 'NAME',
            name: 'Array'
          }
        }
      ],
      subject: {
        type: 'NAME',
        name: 'Array'
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
                  name: 'number'
                }
              ],
              subject: {
                type: 'NAME',
                name: 'Array'
              }
            }
          ],
          subject: {
            type: 'NAME',
            name: 'Array'
          }
        }
      ],
      subject: {
        type: 'NAME',
        name: 'Array'
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
                name: 'string'
              }
            ],
            subject: {
              type: 'NAME',
              name: 'Array'
            }
          },
          value: {
            type: 'NAME',
            name: 'number'
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
                name: 'number'
              },
              {
                type: 'NAME',
                name: 'boolean'
              },
              {
                type: 'NAME',
                name: 'string'
              }
            ]
          },
          value: {
            type: 'NAME',
            name: 'number'
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
            name: 'undefinedHTML'
          },
          value: {
            type: 'UNION',
            elements: [
              {
                type: 'NAME',
                name: 'string'
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
            name: 'foo'
          },
          value: {
            type: 'FUNCTION',
            parameters: []
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
      parameters: []
    }
  },
  {
    description: 'standard function type (should still parse if JSDoc expressions are allowed)',
    input: 'function(this:my.namespace.Class, my.Class)=',
    expected: {
      type: 'FUNCTION',
      optional: true,
      parameters: [
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            reservedWord: true,
            name: 'this'
          },
          value: {
            left: {
              name: 'my',
              type: 'NAME'
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
            type: 'NAME'
          },
          path: [
            'Class'
          ],
          type: 'PROPERTY_PATH'
        }
      ]
    }
  },
  {
    description: 'type union with no parentheses, a repeatable param, and a JSDoc-style array',
    input: '...string|string[]',
    expected: {
      type: 'UNION',
      elements: [
        {
          type: 'NAME',
          name: 'string',
          repeatable: true
        },
        {
          type: 'GENERIC',
          objects: [
            {
              name: 'string',
              type: 'NAME'
            }
          ],
          subject: {
            type: 'NAME',
            name: 'Array'
          }
        }
      ]
    }
  }
]
