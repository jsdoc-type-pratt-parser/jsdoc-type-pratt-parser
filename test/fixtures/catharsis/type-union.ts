import { Fixture } from '../Fixture'

export const unionFixtures: Fixture[] = [
  {
    description: 'union with 2 types (number and boolean)',
    input: '(number|boolean)',
    expected: {
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
        }
      ]
    }
  },
  {
    description: 'repeatable union with 2 types (number and boolean)',
    input: '...(number|boolean)',
    expected: {
      type: 'VARIADIC',
      element: {
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
          }
        ]
      },
      meta: {
        position: 'PREFIX',
        squareBrackets: false
      }
    }
  },
  {
    description: 'union with 2 types (Object and undefined)',
    input: '(Object|undefined)',
    expected: {
      type: 'UNION',
      elements: [
        {
          type: 'NAME',
          name: 'Object',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'UNDEFINED'
        }
      ]
    }
  },
  {
    description: 'union with 3 types (number, Window, and goog.ui.Menu)',
    input: '(number|Window|goog.ui.Menu)',
    expected: {
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
          name: 'Window',
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
        }
      ]
    }
  },
  {
    description: 'nullable union with 2 types (number and boolean)',
    input: '?(number|boolean)',
    expected: {
      type: 'NULLABLE',
      element: {
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
          }
        ]
      },
      meta: {
        position: 'PREFIX'
      }
    }
  },
  {
    description: 'non-nullable union with 2 types (number and boolean)',
    input: '!(number|boolean)',
    expected: {
      type: 'NOT_NULLABLE',
      element: {
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
          }
        ]
      },
      meta: {
        position: 'PREFIX'
      }
    }
  },
  {
    description: 'optional union with 2 types (number and boolean)',
    input: '(number|boolean)=',
    expected: {
      type: 'OPTIONAL',
      element: {
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
          }
        ]
      },
      meta: {
        position: 'SUFFIX'
      }
    }
  },
  {
    description: 'union with 2 types (array and object with unknown value type)',
    input: '(Array|Object.<string, ?>)',
    expected: {
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
              type: 'UNKNOWN'
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
      ]
    }
  },
  {
    description: 'union with 2 type applications',
    input: '(Array.<string>|Object.<string, ?>)',
    expected: {
      type: 'UNION',
      elements: [
        {
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
        {
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
              type: 'UNKNOWN'
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
      ]
    }
  },
  {
    description: 'union with 2 types (an error, or a function that returns an error)',
    input: '(Error|function(): Error)',
    expected: {
      type: 'UNION',
      elements: [
        {
          type: 'NAME',
          name: 'Error',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'FUNCTION',
          parameters: [],
          returnType: {
            type: 'NAME',
            name: 'Error',
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
  },
  {
    description: 'type union with no enclosing parentheses',
    input: 'number|string',
    expected: {
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
    }
  },
  {
    description: 'type union with modifiers and no enclosing parentheses',
    input: '!number|!string',
    expected: {
      type: 'UNION',
      elements: [
        {
          type: 'NOT_NULLABLE',
          element: {
            type: 'NAME',
            name: 'number',
            meta: {
              reservedWord: false
            }
          },
          meta: {
            position: 'PREFIX'
          }
        },
        {
          type: 'NOT_NULLABLE',
          element: {
            type: 'NAME',
            name: 'string',
            meta: {
              reservedWord: false
            }
          },
          meta: {
            position: 'PREFIX'
          }
        }
      ]
    }
  },
  {
    description: 'optional union with multiple types',
    input: '(jQuerySelector|Element|Object|Array.<Element>|jQuery|string|function())=',
    expected: {
      type: 'OPTIONAL',
      element: {
        type: 'UNION',
        elements: [
          {
            type: 'NAME',
            name: 'jQuerySelector',
            meta: {
              reservedWord: false
            }
          },
          {
            type: 'NAME',
            name: 'Element',
            meta: {
              reservedWord: false
            }
          },
          {
            type: 'NAME',
            name: 'Object',
            meta: {
              reservedWord: false
            }
          },
          {
            type: 'GENERIC',
            objects: [
              {
                type: 'NAME',
                name: 'Element',
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
            type: 'NAME',
            name: 'jQuery',
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
            parameters: [],
            meta: {
              arrow: false
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
    description: 'optional union with multiple types, including a nested union type',
    input: '(Element|Object|Document|Object.<string, (string|function(!jQuery.event=))>)=',
    expected: {
      type: 'OPTIONAL',
      element: {
        type: 'UNION',
        elements: [
          {
            type: 'NAME',
            name: 'Element',
            meta: {
              reservedWord: false
            }
          },
          {
            type: 'NAME',
            name: 'Object',
            meta: {
              reservedWord: false
            }
          },
          {
            type: 'NAME',
            name: 'Document',
            meta: {
              reservedWord: false
            }
          },
          {
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
                    type: 'FUNCTION',
                    parameters: [
                      {
                        type: 'OPTIONAL',
                        element: {
                          type: 'NOT_NULLABLE',
                          element: {
                            left: {
                              name: 'jQuery',
                              type: 'NAME',
                              meta: {
                                reservedWord: false
                              }
                            },
                            path: [
                              'event'
                            ],
                            type: 'PROPERTY_PATH'
                          },
                          meta: {
                            position: 'PREFIX'
                          }
                        },
                        meta: {
                          position: 'SUFFIX'
                        }
                      }
                    ],
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
        ]

      },
      meta: {
        position: 'SUFFIX'
      }
    }
  }
]
