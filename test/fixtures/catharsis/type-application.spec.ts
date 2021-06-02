import { testFixtureBase } from '../Fixture'

describe('catharsis type application tests', () => {
  describe('array of strings, without a dot separator', () => {
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
          dot: false,
          brackets: 'angle'
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

  describe('array of strings, with a dot separator', () => {
    testFixtureBase({
      input: 'Array.<string>',
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
          dot: true,
          brackets: 'angle'
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

  describe('repeatable array of strings', () => {
    testFixtureBase({
      input: '...Array.<string>',
      expected: {
        type: 'JsdocTypeVariadic',
        element: {
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
        meta: {
          squareBrackets: false,
          position: 'prefix'
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

  describe('object whose properties are strings and property values are numbers', () => {
    testFixtureBase({
      input: 'Object.<string, number>',
      expected: {
        type: 'JsdocTypeGeneric',
        elements: [
          {
            type: 'JsdocTypeName',
            value: 'string'
          },
          {
            type: 'JsdocTypeName',
            value: 'number'
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

  describe('object whose properties are a type application and property values are a type union', () => {
    testFixtureBase({
      input: 'Object.<Array.<(boolean|{myKey: Error})>, (boolean|string|function(new:foo): string)>',
      stringified: 'Object.<Array.<(boolean | {myKey: Error})>, (boolean | string | function(new: foo): string)>',
      expected: {
        type: 'JsdocTypeGeneric',
        elements: [
          {
            type: 'JsdocTypeGeneric',
            elements: [
              {
                type: 'JsdocTypeParenthesis',
                element: {
                  type: 'JsdocTypeUnion',
                  elements: [
                    {
                      type: 'JsdocTypeName',
                      value: 'boolean'
                    },
                    {
                      type: 'JsdocTypeObject',
                      elements: [
                        {
                          type: 'JsdocTypeKeyValue',
                          optional: false,
                          value: 'myKey',
                          meta: {
                            quote: undefined
                          },
                          right: {
                            type: 'JsdocTypeName',
                            value: 'Error'
                          }
                        }
                      ]
                    }
                  ]
                }
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
                  value: 'string'
                },
                {
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
                        value: 'foo'
                      }
                    }
                  ],
                  returnType: {
                    type: 'JsdocTypeName',
                    value: 'string'
                  },
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

  describe('array of objects that have a length property', () => {
    testFixtureBase({
      input: 'Array.<{length}>',
      expected: {
        type: 'JsdocTypeGeneric',
        elements: [
          {
            type: 'JsdocTypeObject',
            elements: [
              {
                type: 'JsdocTypeKeyValue',
                value: 'length',
                right: undefined,
                optional: false,
                meta: {
                  quote: undefined
                }
              }
            ]
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

  describe('array of unknown', () => {
    testFixtureBase({
      input: 'Array.<?>',
      expected: {
        type: 'JsdocTypeGeneric',
        elements: [
          {
            type: 'JsdocTypeUnknown'
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

  describe('Promise containing string', () => {
    testFixtureBase({
      input: 'Promise.<string>',
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
          value: 'Promise'
        },
        meta: {
          dot: true,
          brackets: 'angle'
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

  describe('foo.Promise containing string', () => {
    testFixtureBase({
      input: 'foo.Promise.<string>',
      expected: {
        type: 'JsdocTypeGeneric',
        elements: [
          {
            type: 'JsdocTypeName',
            value: 'string'
          }
        ],
        left: {
          left: {
            value: 'foo',
            type: 'JsdocTypeName'
          },
          right: {
            type: 'JsdocTypeProperty',
            value: 'Promise'
          },
          pathType: 'property',
          type: 'JsdocTypeNamePath'
        },
        meta: {
          dot: true,
          brackets: 'angle'
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
})
