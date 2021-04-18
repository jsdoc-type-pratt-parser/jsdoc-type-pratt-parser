import { Fixture } from '../Fixture'

export const recordFixtures: Fixture[] = [
  {
    description: 'empty record type',
    input: '{}',
    expected: {
      type: 'RECORD',
      fields: []
    }
  },
  {
    description: 'record type with 1 typed property',
    input: '{myNum: number}',
    expected: {
      type: 'RECORD',
      fields: [
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            name: 'myNum',
            meta: {
              reservedWord: false
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
    description: 'repeatable record type with 1 typed property',
    input: '...{myNum: number}',
    expected: {
      type: 'VARIADIC',
      element: {
        type: 'RECORD',
        fields: [
          {
            type: 'KEY_VALUE',
            key: {
              type: 'NAME',
              name: 'myNum',
              meta: {
                reservedWord: false
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
      },
      meta: {
        squareBrackets: false,
        position: 'PREFIX'
      }
    }
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
            key: {
              type: 'NAME',
              name: 'myNum',
              meta: {
                reservedWord: false
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
      },
      meta: {
        position: 'SUFFIX'
      }
    }
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
            key: {
              type: 'NAME',
              name: 'myNum',
              meta: {
                reservedWord: false
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
      },
      meta: {
        position: 'PREFIX'
      }
    }
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
            key: {
              type: 'NAME',
              name: 'myNum',
              meta: {
                reservedWord: false
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
      },
      meta: {
        position: 'PREFIX'
      }
    }
  },
  {
    description: 'record type with 1 typed property and 1 untyped property',
    input: '{myNum: number, myObject}',
    expected: {
      type: 'RECORD',
      fields: [
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            name: 'myNum',
            meta: {
              reservedWord: false
            }
          },
          value: {
            type: 'NAME',
            name: 'number',
            meta: {
              reservedWord: false
            }
          }
        },
        {
          type: 'NAME',
          name: 'myObject',
          meta: {
            reservedWord: false
          }
        }
      ]
    }
  },
  {
    description: 'record type with a property that uses a type application as a value',
    input: '{myArray: Array.<string>}',
    expected: {
      type: 'RECORD',
      fields: [
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            name: 'myArray',
            meta: {
              reservedWord: false
            }
          },
          value: {
            type: 'GENERIC',
            subject: {
              type: 'NAME',
              name: 'Array',
              meta: {
                reservedWord: false
              }
            },
            objects: [
              {
                type: 'NAME',
                name: 'string',
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
    }
  },
  {
    description: 'record type with a property that uses a type union as a value',
    input: '{myKey: (number|boolean|string)}',
    expected: {
      type: 'RECORD',
      fields: [
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            name: 'myKey',
            meta: {
              reservedWord: false
            }
          },
          value: {
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
          }
        }
      ]
    }
  },
  {
    description: 'record type with a property that uses a JavaScript keyword as a key',
    input: '{continue: string}',
    expected: {
      type: 'RECORD',
      fields: [
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            name: 'continue',
            meta: {
              reservedWord: true
            }
          },
          value: {
            type: 'NAME',
            name: 'string',
            meta: {
              reservedWord: false
            }
          }
        }
      ]
    }
  },
  {
    description: 'record type with a property that uses a JavaScript future reserved word as a key',
    input: '{class: string}',
    expected: {
      type: 'RECORD',
      fields: [
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            name: 'class',
            meta: {
              reservedWord: true
            }
          },
          value: {
            type: 'NAME',
            name: 'string',
            meta: {
              reservedWord: false
            }
          }
        }
      ]
    }
  },
  {
    description: 'record type with a property that uses a string representation of a JavaScript boolean literal as a key',
    input: '{true: string}',
    expected: {
      type: 'RECORD',
      fields: [
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            name: 'true',
            meta: {
              reservedWord: true
            }
          },
          value: {
            type: 'NAME',
            name: 'string',
            meta: {
              reservedWord: false
            }
          }
        }
      ]
    }
  },
  {
    description: 'record type with a property that uses a numeric key',
    input: '{0: string}',
    expected: {
      type: 'RECORD',
      fields: [
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NUMBER',
            value: 0
          },
          value: {
            type: 'NAME',
            name: 'string',
            meta: {
              reservedWord: false
            }
          }
        }
      ]
    }
  }
]
