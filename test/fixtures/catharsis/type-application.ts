import { Fixture } from '../Fixture'

export const genericFixtures: Fixture[] = [
  {
    description: 'array of strings, without a dot separator',
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
        dot: false,
        brackets: '<>'
      }
    }
  },
  {
    description: 'array of strings, with a dot separator',
    input: 'Array.<string>',
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
        dot: true,
        brackets: '<>'
      }
    }
  },
  {
    description: 'repeatable array of strings',
    input: '...Array.<string>',
    expected: {
      type: 'VARIADIC',
      element: {
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
          dot: true,
          brackets: '<>'
        }
      },
      meta: {
        squareBrackets: false,
        position: 'PREFIX'
      }
    }
  },
  {
    description: 'object whose properties are strings and property values are numbers',
    input: 'Object.<string, number>',
    expected: {
      type: 'GENERIC',
      objects: [
        {
          type: 'NAME',
          name: 'string',
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
        }
      ],
      subject: {
        type: 'NAME',
        name: 'Object',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        dot: true,
        brackets: '<>'
      }
    }
  },
  {
    description: 'object whose properties are a type application and property values are a type union',
    input: 'Object.<Array.<(boolean|{myKey: Error})>, (boolean|string|function(new:foo): string)>',
    expected: {
      type: 'GENERIC',
      objects: [
        {
          type: 'GENERIC',
          objects: [
            {
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
                        type: 'NAME',
                        name: 'Error',
                        meta: {
                          reservedWord: false
                        }
                      }
                    }
                  ]
                }
              ]
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
              name: 'string',
              meta: {
                reservedWord: false
              }
            },
            {
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
                    name: 'foo',
                    meta: {
                      reservedWord: false
                    }
                  }
                }
              ],
              returnType: {
                type: 'NAME',
                name: 'string',
                meta: {
                  reservedWord: false
                }
              },
              meta: {
                arrow: false
              }
            }
          ]
        }
      ],
      subject: {
        type: 'NAME',
        name: 'Object',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        dot: true,
        brackets: '<>'
      }
    }
  },
  {
    description: 'array of objects that have a length property',
    input: 'Array.<{length}>',
    expected: {
      type: 'GENERIC',
      objects: [
        {
          type: 'RECORD',
          fields: [
            {
              type: 'NAME',
              name: 'length',
              meta: {
                reservedWord: false
              }
            }
          ]
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
    }
  },
  {
    description: 'array of unknown',
    input: 'Array.<?>',
    expected: {
      type: 'GENERIC',
      objects: [
        {
          type: 'UNKNOWN'
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
    }
  },
  {
    description: 'Promise containing string',
    input: 'Promise.<string>',
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
        name: 'Promise',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        dot: true,
        brackets: '<>'
      }
    }
  },
  {
    description: 'foo.Promise containing string',
    input: 'foo.Promise.<string>',
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
        left: {
          name: 'foo',
          type: 'NAME',
          meta: {
            reservedWord: false
          }
        },
        path: [
          'Promise'
        ],
        type: 'PROPERTY_PATH'
      },
      meta: {
        dot: true,
        brackets: '<>'
      }
    }
  }
]
