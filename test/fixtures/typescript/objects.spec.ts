import { testFixture } from '../Fixture'

describe('typescript objects tests', () => {
  describe('simple object with trailing semicolon separator', () => {
    testFixture({
      input: '{ object: string; }',
      stringified: '{object: string}',
      expected: {
        type: 'JsdocTypeObject',
        meta: {
          separator: 'semicolon'
        },
        elements: [
          {
            type: 'JsdocTypeObjectField',
            key: 'object',
            optional: false,
            readonly: false,
            right: {
              type: 'JsdocTypeName',
              value: 'string'
            },
            meta: {
              quote: undefined
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
        closure: 'fail',
        jsdoc: 'fail'
      },
      jtp: {
        closure: 'differ',
        jsdoc: 'differ',
        typescript: 'typescript',
        permissive: 'typescript'
      }
    })
  })

  describe('optional entry', () => {
    // there seems to be a catharsis error: https://github.com/hegemonic/catharsis/blob/222e8fc4350c346b47ca8395c37512290979df12/lib/parser.pegjs#L555
    testFixture({
      input: '{ object?: string, key: string }',
      stringified: '{object?: string, key: string}',
      diffExpected: {
        typescript: {
          type: 'JsdocTypeObject',
          meta: {
            separator: 'comma'
          },
          elements: [
            {
              type: 'JsdocTypeObjectField',
              key: 'object',
              optional: true,
              readonly: false,
              meta: {
                quote: undefined
              },
              right: {
                type: 'JsdocTypeName',
                value: 'string'
              }
            },
            {
              type: 'JsdocTypeObjectField',
              key: 'key',
              optional: false,
              readonly: false,
              meta: {
                quote: undefined
              },
              right: {
                type: 'JsdocTypeName',
                value: 'string'
              }
            }
          ]
        },
        jsdoc: {
          type: 'JsdocTypeObject',
          meta: {
            separator: 'comma'
          },
          elements: [
            {
              type: 'JsdocTypeJsdocObjectField',
              left: {
                type: 'JsdocTypeNullable',
                element: {
                  type: 'JsdocTypeName',
                  value: 'object'
                },
                meta: {
                  position: 'suffix'
                }
              },
              right: {
                type: 'JsdocTypeName',
                value: 'string'
              }
            },
            {
              type: 'JsdocTypeObjectField',
              key: 'key',
              optional: false,
              readonly: false,
              meta: {
                quote: undefined
              },
              right: {
                type: 'JsdocTypeName',
                value: 'string'
              }
            }
          ]
        }
      },
      modes: [
        'jsdoc',
        'typescript'
      ],
      catharsis: {
        closure: 'fail',
        jsdoc: 'fail'
      },
      jtp: {
        closure: 'differ',
        jsdoc: 'differ',
        typescript: 'typescript',
        permissive: 'typescript'
      }
    })
  })

  describe('An object with unenclosed union as type', () => {
    testFixture({
      input: '{message: string|undefined}',
      stringified: '{message: string | undefined}',
      expected: {
        type: 'JsdocTypeObject',
        meta: {
          separator: 'comma'
        },
        elements: [
          {
            type: 'JsdocTypeObjectField',
            key: 'message',
            optional: false,
            readonly: false,
            right: {
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
            },
            meta: {
              quote: undefined
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
        jsdoc: 'jsdoc',
        closure: 'closure'
      },
      jtp: {
        jsdoc: 'jsdoc',
        closure: 'closure',
        typescript: 'typescript',
        permissive: 'typescript'
      }
    })
  })

  describe('An object an optional field without a type', () => {
    testFixture({
      input: '{ message?} ',
      stringified: '{message?}',
      expected: {
        type: 'JsdocTypeObject',
        meta: {
          separator: 'comma'
        },
        elements: [
          {
            type: 'JsdocTypeObjectField',
            key: 'message',
            optional: true,
            readonly: false,
            right: undefined,
            meta: {
              quote: undefined
            }
          }
        ]
      },
      modes: [
        'jsdoc', // TODO: should this fail in closure or jsdoc?
        'closure',
        'typescript'
      ],
      catharsis: {
        jsdoc: 'fail',
        closure: 'fail'
      },
      jtp: {
        jsdoc: 'fail',
        closure: 'fail',
        typescript: 'fail',
        permissive: 'fail'
      }
    })
  })

  describe('object property named module', () => {
    testFixture({
      input: '{module: type}',
      modes: ['jsdoc', 'closure', 'typescript'],
      expected: {
        type: 'JsdocTypeObject',
        elements: [
          {
            type: 'JsdocTypeObjectField',
            key: 'module',
            optional: false,
            readonly: false,
            right: {
              type: 'JsdocTypeName',
              value: 'type'
            },
            meta: {
              quote: undefined
            }
          }
        ],
        meta: {
          separator: 'comma'
        }
      }
    })
  })

  describe('object property named typeof', () => {
    testFixture({
      input: '{typeof: type}',
      modes: ['jsdoc', 'closure', 'typescript'],
      expected: {
        type: 'JsdocTypeObject',
        elements: [
          {
            type: 'JsdocTypeObjectField',
            key: 'typeof',
            optional: false,
            readonly: false,
            right: {
              type: 'JsdocTypeName',
              value: 'type'
            },
            meta: {
              quote: undefined
            }
          }
        ],
        meta: {
          separator: 'comma'
        }
      }
    })
  })

  describe('linebreaks can be separators', () => {
    testFixture({
      input:
        `{
  range: boolean
  loc: boolean
}`,
      stringified: '{range: boolean; loc: boolean}',
      modes: ['typescript', 'jsdoc', 'closure'],
      expected: {
        type: 'JsdocTypeObject',
        meta: {
          separator: 'linebreak'
        },
        elements: [
          {
            type: 'JsdocTypeObjectField',
            key: 'range',
            optional: false,
            readonly: false,
            right: {
              type: 'JsdocTypeName',
              value: 'boolean'
            },
            meta: {
              quote: undefined
            }
          },
          {
            type: 'JsdocTypeObjectField',
            key: 'loc',
            optional: false,
            readonly: false,
            right: {
              type: 'JsdocTypeName',
              value: 'boolean'
            },
            meta: {
              quote: undefined
            }
          }
        ]
      }
    })
  })

  describe('multiple levels of square brackets', () => {
    testFixture({
      input: 'obj["level1"]["level2"]',
      modes: ['typescript'],
      expected: {
        type: 'JsdocTypeNamePath',
        left: {
          type: 'JsdocTypeNamePath',
          left: {
            type: 'JsdocTypeName',
            value: 'obj'
          },
          right: {
            type: 'JsdocTypeProperty',
            value: 'level1',
            meta: {
              quote: 'double'
            }
          },
          pathType: 'property-brackets'
        },
        right: {
          type: 'JsdocTypeProperty',
          value: 'level2',
          meta: {
            quote: 'double'
          }
        },
        pathType: 'property-brackets'
      }
    })
  })

  describe('index signatures', () => {
    testFixture({
      input: '{[key: string]: number}',
      modes: ['typescript'],
      expected: {
        type: 'JsdocTypeObject',
        meta: {
          separator: 'comma'
        },
        elements: [
          {
            type: 'JsdocTypeObjectField',
            key: {
              type: 'JsdocTypeIndexSignature',
              key: 'key',
              right: {
                type: 'JsdocTypeName',
                value: 'string'
              }
            },
            optional: false,
            readonly: false,
            right: {
              type: 'JsdocTypeName',
              value: 'number'
            },
            meta: {
              quote: undefined
            }
          }
        ]
      }
    })
  })

  describe('index signatures', () => {
    testFixture({
      input: '{[key in Type]: number}',
      modes: ['typescript'],
      expected: {
        type: 'JsdocTypeObject',
        meta: {
          separator: 'comma'
        },
        elements: [
          {
            type: 'JsdocTypeObjectField',
            key: {
              type: 'JsdocTypeMappedType',
              key: 'key',
              right: {
                type: 'JsdocTypeName',
                value: 'Type'
              }
            },
            optional: false,
            readonly: false,
            right: {
              type: 'JsdocTypeName',
              value: 'number'
            },
            meta: {
              quote: undefined
            }
          }
        ]
      }
    })
  })

  describe('union in index signature', () => {
    testFixture({
      input: '{[key: string | number]: boolean}',
      expected: {
        type: 'JsdocTypeObject',
        meta: {
          separator: 'comma'
        },
        elements: [
          {
            type: 'JsdocTypeObjectField',
            key: {
              type: 'JsdocTypeIndexSignature',
              key: 'key',
              right: {
                type: 'JsdocTypeUnion',
                elements: [
                  {
                    type: 'JsdocTypeName',
                    value: 'string'
                  },
                  {
                    type: 'JsdocTypeName',
                    value: 'number'
                  }
                ]
              }
            },
            right: {
              type: 'JsdocTypeName',
              value: 'boolean'
            },
            optional: false,
            readonly: false,
            meta: {
              quote: undefined
            }
          }
        ]
      },
      modes: ['typescript']
    })
  })
})
