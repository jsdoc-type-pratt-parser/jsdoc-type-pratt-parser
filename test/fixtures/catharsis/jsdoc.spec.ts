import { testFixtureBase } from '../Fixture'

describe('catharsis jsdoc tests', () => {
  describe('name expression that starts with the word "function"', () => {
    testFixtureBase({
      input: 'functional',
      expected: {
        type: 'JsdocTypeName',
        value: 'functional'
      },
      modes: [
        'typescript',
        'jsdoc',
        'closure'
      ],
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
    })
  })

  describe('name expression with instance scope punctuation', () => {
    testFixtureBase({
      input: 'MyClass#myMember',
      expected: {
        type: 'JsdocTypeNamePath',
        left: {
          type: 'JsdocTypeName',
          value: 'MyClass'
        },
        right: {
          type: 'JsdocTypeProperty',
          value: 'myMember'
        },
        pathType: 'instance'
      },
      modes: [
        'jsdoc',
        'closure'
      ],
      catharsis: {
        closure: 'closure',
        jsdoc: 'jsdoc'
      },
      jtp: {
        closure: 'closure',
        jsdoc: 'jsdoc',
        typescript: 'differ',
        permissive: 'jsdoc'
      }
    })
  })

  describe('name expression with inner scope punctuation', () => {
    testFixtureBase({
      input: 'MyClass~myMember',
      expected: {
        type: 'JsdocTypeNamePath',
        left: {
          type: 'JsdocTypeName',
          value: 'MyClass'
        },
        right: {
          type: 'JsdocTypeProperty',
          value: 'myMember'
        },
        pathType: 'inner'
      },
      modes: [
        'jsdoc',
        'closure'
      ],
      catharsis: {
        closure: 'closure',
        jsdoc: 'jsdoc'
      },
      jtp: {
        closure: 'closure',
        jsdoc: 'jsdoc',
        typescript: 'differ',
        permissive: 'jsdoc'
      }
    })
  })

  describe('name expression with instance and inner scope punctuation', () => {
    testFixtureBase({
      input: 'MyClass#myMember#yourMember~theirMember',
      expected: {
        type: 'JsdocTypeNamePath',
        left: {
          type: 'JsdocTypeNamePath',
          left: {
            type: 'JsdocTypeNamePath',
            left: {
              type: 'JsdocTypeName',
              value: 'MyClass'
            },
            right: {
              type: 'JsdocTypeProperty',
              value: 'myMember'
            },
            pathType: 'instance'
          },
          right: {
            type: 'JsdocTypeProperty',
            value: 'yourMember'
          },
          pathType: 'instance'
        },
        right: {
          type: 'JsdocTypeProperty',
          value: 'theirMember'
        },
        pathType: 'inner'
      },
      modes: [
        'jsdoc',
        'closure'
      ],
      catharsis: {
        closure: 'closure',
        jsdoc: 'jsdoc'
      },
      jtp: {
        closure: 'closure',
        jsdoc: 'jsdoc',
        typescript: 'differ',
        permissive: 'jsdoc'
      }
    })
  })

  describe('name expression for a class within a module', () => {
    testFixtureBase({
      input: 'module:foo/bar/baz~Qux',
      expected: {
        type: 'JsdocTypeNamePath',
        left: {
          value: 'foo/bar/baz',
          type: 'JsdocTypeSpecialNamePath',
          specialType: 'module',
          meta: {
            quote: undefined
          }
        },
        right: {
          type: 'JsdocTypeProperty',
          value: 'Qux'
        },
        pathType: 'inner'
      },
      modes: [
        'jsdoc',
        'closure',
        'typescript'
      ],
      catharsis: {
        closure: 'closure',
        jsdoc: 'jsdoc'
      },
      jtp: {
        closure: 'closure',
        jsdoc: 'jsdoc',
        typescript: 'fail',
        permissive: 'jsdoc'
      }
    })
  })

  describe('name expression for a class within a module with hyphens', () => {
    testFixtureBase({
      input: 'module:foo-bar/baz~Qux',
      expected: {
        type: 'JsdocTypeNamePath',
        left: {
          value: 'foo-bar/baz',
          type: 'JsdocTypeSpecialNamePath',
          specialType: 'module',
          meta: {
            quote: undefined
          }
        },
        right: {
          type: 'JsdocTypeProperty',
          value: 'Qux'
        },
        pathType: 'inner'
      },
      modes: [
        'jsdoc',
        'closure',
        'typescript'
      ],
      catharsis: {
        closure: 'closure',
        jsdoc: 'jsdoc'
      },
      jtp: {
        closure: 'closure',
        jsdoc: 'jsdoc',
        typescript: 'fail',
        permissive: 'jsdoc'
      }
    })
  })

  describe('name expression containing a reserved word', () => {
    testFixtureBase({
      input: 'this',
      expected: {
        type: 'JsdocTypeName',
        value: 'this'
      },
      modes: [
        'typescript',
        'jsdoc',
        'closure'
      ],
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
    })
  })

  describe('name expression for a symbol variation whose name is an empty string', () => {
    testFixtureBase({
      input: 'MyClass()',
      expected: {
        value: 'MyClass',
        type: 'JsdocTypeSymbol'
      },
      modes: [
        'jsdoc',
        'closure'
      ],
      catharsis: {
        closure: 'closure',
        jsdoc: 'jsdoc'
      },
      jtp: {
        closure: 'fail',
        jsdoc: 'fail',
        typescript: 'fail',
        permissive: 'fail'
      }
    })
  })

  describe('name expression for a symbol variation whose name is one numeral', () => {
    testFixtureBase({
      input: 'MyClass(2)',
      expected: {
        value: 'MyClass',
        type: 'JsdocTypeSymbol',
        element: {
          type: 'JsdocTypeNumber',
          value: 2
        }
      },
      modes: [
        'jsdoc',
        'closure'
      ],
      catharsis: {
        closure: 'closure',
        jsdoc: 'jsdoc'
      },
      jtp: {
        closure: 'fail',
        jsdoc: 'fail',
        typescript: 'fail',
        permissive: 'fail'
      }
    })
  })

  describe('name expression for a symbol variation whose name is multiple numerals', () => {
    testFixtureBase({
      input: 'MyClass(23456)',
      expected: {
        value: 'MyClass',
        type: 'JsdocTypeSymbol',
        element: {
          type: 'JsdocTypeNumber',
          value: 23456
        }
      },
      modes: [
        'jsdoc',
        'closure'
      ],
      catharsis: {
        closure: 'closure',
        jsdoc: 'jsdoc'
      },
      jtp: {
        closure: 'fail',
        jsdoc: 'fail',
        typescript: 'fail',
        permissive: 'fail'
      }
    })
  })

  describe('name expression for a symbol variation whose name is one letter', () => {
    testFixtureBase({
      input: 'MyClass(a)',
      expected: {
        value: 'MyClass',
        type: 'JsdocTypeSymbol',
        element: {
          value: 'a',
          type: 'JsdocTypeName'
        }
      },
      modes: [
        'jsdoc',
        'closure'
      ],
      catharsis: {
        closure: 'closure',
        jsdoc: 'jsdoc'
      },
      jtp: {
        closure: 'fail',
        jsdoc: 'fail',
        typescript: 'fail',
        permissive: 'fail'
      }
    })
  })

  describe('name expression for a symbol variation whose name is multiple letters', () => {
    testFixtureBase({
      input: 'MyClass(abcde)',
      expected: {
        value: 'MyClass',
        type: 'JsdocTypeSymbol',
        element: {
          value: 'abcde',
          type: 'JsdocTypeName'
        }
      },
      modes: [
        'jsdoc',
        'closure'
      ],
      catharsis: {
        closure: 'closure',
        jsdoc: 'jsdoc'
      },
      jtp: {
        closure: 'fail',
        jsdoc: 'fail',
        typescript: 'fail',
        permissive: 'fail'
      }
    })
  })

  describe('name expression enclosed in double quotes', () => {
    testFixtureBase({
      input: '"foo.bar.baz"',
      expected: {
        type: 'JsdocTypeStringValue',
        value: 'foo.bar.baz',
        meta: {
          quote: 'double'
        }
      },
      modes: [
        'typescript',
        'jsdoc'
      ],
      catharsis: {
        closure: 'fail',
        jsdoc: 'jsdoc'
      },
      jtp: {
        closure: 'differ',
        jsdoc: 'jsdoc',
        typescript: 'typescript',
        permissive: 'jsdoc'
      }
    })
  })

  describe('name expression enclosed in single quotes', () => {
    testFixtureBase({
      input: "'foo.bar.baz'",
      expected: {
        type: 'JsdocTypeStringValue',
        value: 'foo.bar.baz',
        meta: {
          quote: 'single'
        }
      },
      modes: [
        'typescript',
        'jsdoc'
      ],
      catharsis: {
        closure: 'fail',
        jsdoc: 'jsdoc'
      },
      jtp: {
        closure: 'differ',
        jsdoc: 'jsdoc',
        typescript: 'typescript',
        permissive: 'jsdoc'
      }
    })
  })

  describe('name expression partially enclosed in double quotes', () => {
    testFixtureBase({
      input: 'foo."bar.baz".qux',
      expected: {
        left: {
          left: {
            value: 'foo',
            type: 'JsdocTypeName'
          },
          right: {
            type: 'JsdocTypeProperty',
            value: '"bar.baz"'
          },
          type: 'JsdocTypeNamePath',
          pathType: 'property'
        },
        right: {
          type: 'JsdocTypeProperty',
          value: 'qux'
        },
        type: 'JsdocTypeNamePath',
        pathType: 'property'
      },
      modes: [
        'typescript',
        'jsdoc',
        'closure'
      ],
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
    })
  })

  describe('name expression partially enclosed in single quotes', () => {
    testFixtureBase({
      input: "foo.'bar.baz'.qux",
      expected: {
        left: {
          left: {
            value: 'foo',
            type: 'JsdocTypeName'
          },
          right: {
            type: 'JsdocTypeProperty',
            value: "'bar.baz'"
          },
          type: 'JsdocTypeNamePath',
          pathType: 'property'
        },
        right: {
          type: 'JsdocTypeProperty',
          value: 'qux'
        },
        type: 'JsdocTypeNamePath',
        pathType: 'property'
      },
      modes: [
        'typescript',
        'jsdoc',
        'closure'
      ],
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
    })
  })

  describe('identifier with a repeatable param that is not enclosed in brackets', () => {
    testFixtureBase({
      input: 'MyClass(...foo)',
      expected: {
        value: 'MyClass',
        type: 'JsdocTypeSymbol',
        element: {
          type: 'JsdocTypeVariadic',
          element: {
            value: 'foo',
            type: 'JsdocTypeName'
          },
          meta: {
            squareBrackets: false,
            position: 'prefix'
          }
        }
      },
      modes: [
        'jsdoc',
        'closure'
      ],
      catharsis: {
        closure: 'closure',
        jsdoc: 'jsdoc'
      },
      jtp: {
        closure: 'fail',
        jsdoc: 'fail',
        typescript: 'fail',
        permissive: 'fail'
      }
    })
  })

  describe('type application with no period', () => {
    testFixtureBase({
      input: 'Array<string>',
      expected: {
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
          brackets: 'angle',
          dot: false
        }
      },
      modes: [
        'typescript',
        'jsdoc',
        'closure'
      ],
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
    })
  })

  describe('Jsdoc Toolkit 2-style array notation for an array of strings', () => {
    testFixtureBase({
      input: 'string[]',
      expected: {
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
          brackets: 'square',
          dot: false
        }
      },
      modes: [
        'typescript',
        'jsdoc'
      ],
      catharsis: {
        closure: 'fail',
        jsdoc: 'jsdoc'
      },
      jtp: {
        closure: 'fail',
        jsdoc: 'jsdoc',
        typescript: 'typescript',
        permissive: 'jsdoc'
      }
    })
  })

  describe('Jsdoc Toolkit 2-style array notation for an array of functions', () => {
    testFixtureBase({
      input: 'function[]',
      expected: {
        type: 'JsdocTypeGeneric',
        elements: [
          {
            type: 'JsdocTypeName',
            value: 'function'
          }
        ],
        left: {
          type: 'JsdocTypeName',
          value: 'Array'
        },
        meta: {
          brackets: 'square',
          dot: false
        }
      },
      modes: [
        'jsdoc',
        'typescript'
      ],
      catharsis: {
        closure: 'fail',
        jsdoc: 'jsdoc'
      },
      jtp: {
        closure: 'fail',
        jsdoc: 'jsdoc',
        typescript: 'typescript',
        permissive: 'jsdoc'
      }
    })
  })

  describe('Jsdoc Toolkit 2-style nested array (two levels)', () => {
    testFixtureBase({
      input: 'number[][]',
      expected: {
        type: 'JsdocTypeGeneric',
        elements: [
          {
            type: 'JsdocTypeGeneric',
            elements: [
              {
                type: 'JsdocTypeName',
                value: 'number'
              }
            ],
            left: {
              type: 'JsdocTypeName',
              value: 'Array'
            },
            meta: {
              brackets: 'square',
              dot: false
            }
          }
        ],
        left: {
          type: 'JsdocTypeName',
          value: 'Array'
        },
        meta: {
          brackets: 'square',
          dot: false
        }
      },
      modes: [
        'typescript',
        'jsdoc'
      ],
      catharsis: {
        closure: 'fail',
        jsdoc: 'jsdoc'
      },
      jtp: {
        closure: 'fail',
        jsdoc: 'jsdoc',
        typescript: 'typescript',
        permissive: 'jsdoc'
      }
    })
  })

  describe('Jsdoc Toolkit 2-style nested array (three levels)', () => {
    testFixtureBase({
      input: 'number[][][]',
      expected: {
        type: 'JsdocTypeGeneric',
        elements: [
          {
            type: 'JsdocTypeGeneric',
            elements: [
              {
                type: 'JsdocTypeGeneric',
                elements: [
                  {
                    type: 'JsdocTypeName',
                    value: 'number'
                  }
                ],
                left: {
                  type: 'JsdocTypeName',
                  value: 'Array'
                },
                meta: {
                  brackets: 'square',
                  dot: false
                }
              }
            ],
            left: {
              type: 'JsdocTypeName',
              value: 'Array'
            },
            meta: {
              brackets: 'square',
              dot: false
            }
          }
        ],
        left: {
          type: 'JsdocTypeName',
          value: 'Array'
        },
        meta: {
          brackets: 'square',
          dot: false
        }
      },
      modes: [
        'typescript',
        'jsdoc'
      ],
      catharsis: {
        closure: 'fail',
        jsdoc: 'jsdoc'
      },
      jtp: {
        closure: 'fail',
        jsdoc: 'jsdoc',
        typescript: 'typescript',
        permissive: 'jsdoc'
      }
    })
  })

  describe('record type with a property that uses a type application as a key', () => {
    testFixtureBase({
      input: '{Array.<string>: number}',
      expected: {
        type: 'JsdocTypeObject',
        elements: [
          {
            type: 'JsdocTypeKeyValue',
            left: {
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
                brackets: 'angle',
                dot: true
              }
            },
            right: {
              type: 'JsdocTypeName',
              value: 'number'
            }
          }
        ]
      },
      modes: [
        'jsdoc'
      ],
      catharsis: {
        closure: 'differ',
        jsdoc: 'jsdoc'
      },
      jtp: {
        closure: 'fail',
        jsdoc: 'fail',
        typescript: 'fail',
        permissive: 'fail'
      }
    })
  })

  describe('record type with a property that uses a type union as a key', () => {
    testFixtureBase({
      input: '{(number|boolean|string): number}',
      stringified: '{(number | boolean | string): number}',
      expected: {
        type: 'JsdocTypeObject',
        elements: [
          {
            type: 'JsdocTypeKeyValue',
            left: {
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
                  },
                  {
                    type: 'JsdocTypeName',
                    value: 'string'
                  }
                ]
              }
            },
            right: {
              type: 'JsdocTypeName',
              value: 'number'
            }
          }
        ]
      },
      modes: [
        'jsdoc'
      ],
      catharsis: {
        closure: 'differ',
        jsdoc: 'jsdoc'
      },
      jtp: {
        closure: 'fail',
        jsdoc: 'fail',
        typescript: 'fail',
        permissive: 'fail'
      }
    })
  })

  describe('record type with a property name that starts with a literal', () => {
    testFixtureBase({
      input: '{undefinedHTML: (string|undefined)}',
      stringified: '{undefinedHTML: (string | undefined)}',
      expected: {
        type: 'JsdocTypeObject',
        elements: [
          {
            type: 'JsdocTypeKeyValue',
            optional: false,
            value: 'undefinedHTML',
            meta: {
              quote: undefined
            },
            right: {
              type: 'JsdocTypeParenthesis',
              element: {
                type: 'JsdocTypeUnion',
                elements: [
                  {
                    type: 'JsdocTypeName',
                    value: 'string'
                  },
                  {
                    type: 'JsdocTypeUndefined'
                  }
                ]
              }
            }
          }
        ]
      },
      modes: [
        'typescript',
        'jsdoc',
        'closure'
      ],
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
    })
  })

  describe('record type with a property that contains a function with no preceding space', () => {
    testFixtureBase({
      input: '{foo:function()}',
      stringified: '{foo: function()}',
      expected: {
        type: 'JsdocTypeObject',
        elements: [
          {
            type: 'JsdocTypeKeyValue',
            optional: false,
            value: 'foo',
            meta: {
              quote: undefined
            },
            right: {
              type: 'JsdocTypeFunction',
              parameters: [],
              arrow: false,
              parenthesis: true
            }
          }
        ]
      },
      modes: [
        'jsdoc',
        'closure'
      ],
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
    })
  })

  describe('record type with a property that contains a function with no preceding space that returns void', () => {
    testFixtureBase({
      input: '{foo:function(): void}',
      stringified: '{foo: function(): void}',
      expected: {
        type: 'JsdocTypeObject',
        elements: [
          {
            type: 'JsdocTypeKeyValue',
            optional: false,
            value: 'foo',
            meta: {
              quote: undefined
            },
            right: {
              type: 'JsdocTypeFunction',
              parameters: [],
              arrow: false,
              parenthesis: true,
              returnType: {
                type: 'JsdocTypeName',
                value: 'void'
              }
            }
          }
        ]
      },
      modes: [
        'jsdoc',
        'closure',
        'typescript'
      ],
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
    })
  })

  describe('function type with no trailing parenthesis', () => {
    testFixtureBase({
      input: 'function',
      expected: {
        type: 'JsdocTypeName',
        value: 'function'
      },
      modes: [
        'jsdoc',
        'typescript'
      ],
      catharsis: {
        closure: 'fail',
        jsdoc: 'jsdoc'
      },
      jtp: {
        closure: 'differ',
        jsdoc: 'jsdoc',
        typescript: 'typescript',
        permissive: 'typescript'
      }
    })
  })

  describe('standard function type (should still parse if JSDoc expressions are allowed)', () => {
    testFixtureBase({
      input: 'function(this:my.namespace.Class, my.Class)=',
      stringified: 'function(this: my.namespace.Class, my.Class)=',
      expected: {
        type: 'JsdocTypeOptional',
        element: {
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
                left: {
                  left: {
                    value: 'my',
                    type: 'JsdocTypeName'
                  },
                  right: {
                    type: 'JsdocTypeProperty',
                    value: 'namespace'
                  },
                  type: 'JsdocTypeNamePath',
                  pathType: 'property'
                },
                right: {
                  type: 'JsdocTypeProperty',
                  value: 'Class'
                },
                type: 'JsdocTypeNamePath',
                pathType: 'property'
              }
            },
            {
              left: {
                value: 'my',
                type: 'JsdocTypeName'
              },
              right: {
                type: 'JsdocTypeProperty',
                value: 'Class'
              },
              type: 'JsdocTypeNamePath',
              pathType: 'property'
            }
          ],
          arrow: false,
          parenthesis: true
        },
        meta: {
          position: 'suffix'
        }
      },
      modes: [
        'jsdoc',
        'closure'
      ],
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
    })
  })

  describe('type union with no parentheses, a repeatable param, and a JSDoc-style array', () => {
    testFixtureBase({
      input: '...string|string[]',
      stringified: '...string | string[]',
      expected: {
        type: 'JsdocTypeUnion',
        elements: [
          {
            type: 'JsdocTypeVariadic',
            element: {
              type: 'JsdocTypeName',
              value: 'string'
            },
            meta: {
              squareBrackets: false,
              position: 'prefix'
            }
          },
          {
            type: 'JsdocTypeGeneric',
            elements: [
              {
                value: 'string',
                type: 'JsdocTypeName'
              }
            ],
            left: {
              type: 'JsdocTypeName',
              value: 'Array'
            },
            meta: {
              brackets: 'square',
              dot: false
            }
          }
        ]
      },
      modes: [
        'jsdoc',
        'typescript'
      ],
      catharsis: {
        closure: 'differ',
        jsdoc: 'jsdoc'
      },
      jtp: {
        closure: 'fail',
        jsdoc: 'differ',
        typescript: 'differ',
        permissive: 'differ'
      }
    })
  })
})
