import { Fixture } from '../Fixture'

export const recordFixtures: Fixture[] = [
  {
    description: 'empty record type',
    input: '{}',
    expected: {
      type: 'RECORD',
      fields: []
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'record type with 1 typed property',
    input: '{myNum: number}',
    expected: {
      type: 'RECORD',
      fields: [
        {
          type: 'KEY_VALUE',
          left: {
            type: 'NAME',
            value: 'myNum',
            meta: {
              reservedWord: false
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
    description: 'repeatable record type with 1 typed property',
    input: '...{myNum: number}',
    expected: {
      type: 'VARIADIC',
      element: {
        type: 'RECORD',
        fields: [
          {
            type: 'KEY_VALUE',
            left: {
              type: 'NAME',
              value: 'myNum',
              meta: {
                reservedWord: false
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
      meta: {
        squareBrackets: false,
        position: 'PREFIX'
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'optional record type with 1 typed property',
    input: '{myNum: number}=',
    expected: {
      type: 'OPTIONAL',
      element: {
        type: 'RECORD',
        fields: [
          {
            type: 'KEY_VALUE',
            left: {
              type: 'NAME',
              value: 'myNum',
              meta: {
                reservedWord: false
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
      meta: {
        position: 'SUFFIX'
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'nullable record type with 1 typed property',
    input: '?{myNum: number}',
    expected: {
      type: 'NULLABLE',
      element: {
        type: 'RECORD',
        fields: [
          {
            type: 'KEY_VALUE',
            left: {
              type: 'NAME',
              value: 'myNum',
              meta: {
                reservedWord: false
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
      meta: {
        position: 'PREFIX'
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'non-nullable record type with 1 typed property',
    input: '!{myNum: number}',
    expected: {
      type: 'NOT_NULLABLE',
      element: {
        type: 'RECORD',
        fields: [
          {
            type: 'KEY_VALUE',
            left: {
              type: 'NAME',
              value: 'myNum',
              meta: {
                reservedWord: false
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
      meta: {
        position: 'PREFIX'
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'record type with 1 typed property and 1 untyped property',
    input: '{myNum: number, myObject}',
    expected: {
      type: 'RECORD',
      fields: [
        {
          type: 'KEY_VALUE',
          left: {
            type: 'NAME',
            value: 'myNum',
            meta: {
              reservedWord: false
            }
          },
          right: {
            type: 'NAME',
            value: 'number',
            meta: {
              reservedWord: false
            }
          }
        },
        {
          type: 'NAME',
          value: 'myObject',
          meta: {
            reservedWord: false
          }
        }
      ]
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'record type with a property that uses a type application as a value',
    input: '{myArray: Array.<string>}',
    expected: {
      type: 'RECORD',
      fields: [
        {
          type: 'KEY_VALUE',
          left: {
            type: 'NAME',
            value: 'myArray',
            meta: {
              reservedWord: false
            }
          },
          right: {
            type: 'GENERIC',
            left: {
              type: 'NAME',
              value: 'Array',
              meta: {
                reservedWord: false
              }
            },
            elements: [
              {
                type: 'NAME',
                value: 'string',
                meta: {
                  reservedWord: false
                }
              }
            ],
            meta: {
              dot: true,
              brackets: '<>'
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
    description: 'record type with a property that uses a type union as a value',
    input: '{myKey: (number|boolean|string)}',
    expected: {
      type: 'RECORD',
      fields: [
        {
          type: 'KEY_VALUE',
          left: {
            type: 'NAME',
            value: 'myKey',
            meta: {
              reservedWord: false
            }
          },
          right: {
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
          }
        }
      ]
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'record type with a property that uses a JavaScript keyword as a key',
    input: '{continue: string}',
    expected: {
      type: 'RECORD',
      fields: [
        {
          type: 'KEY_VALUE',
          left: {
            type: 'NAME',
            value: 'continue',
            meta: {
              reservedWord: true
            }
          },
          right: {
            type: 'NAME',
            value: 'string',
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
    description: 'record type with a property that uses a JavaScript future reserved word as a key',
    input: '{class: string}',
    expected: {
      type: 'RECORD',
      fields: [
        {
          type: 'KEY_VALUE',
          left: {
            type: 'NAME',
            value: 'class',
            meta: {
              reservedWord: true
            }
          },
          right: {
            type: 'NAME',
            value: 'string',
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
    description: 'record type with a property that uses a string representation of a JavaScript boolean literal as a key',
    input: '{true: string}',
    expected: {
      type: 'RECORD',
      fields: [
        {
          type: 'KEY_VALUE',
          left: {
            type: 'NAME',
            value: 'true',
            meta: {
              reservedWord: true
            }
          },
          right: {
            type: 'NAME',
            value: 'string',
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
    description: 'record type with a property that uses a numeric key',
    input: '{0: string}',
    expected: {
      type: 'RECORD',
      fields: [
        {
          type: 'KEY_VALUE',
          left: {
            type: 'NUMBER',
            value: 0
          },
          right: {
            type: 'NAME',
            value: 'string',
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
  }
]
