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
          name: 'number'
        },
        {
          type: 'NAME',
          name: 'boolean'
        }
      ]
    }
  },
  {
    description: 'repeatable union with 2 types (number and boolean)',
    input: '...(number|boolean)',
    expected: {
      type: 'UNION',
      elements: [
        {
          type: 'NAME',
          name: 'number'
        },
        {
          type: 'NAME',
          name: 'boolean'
        }
      ],
      repeatable: true
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
          name: 'Object'
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
          name: 'number'
        },
        {
          type: 'NAME',
          name: 'Window'
        },
        {
          left: {
            name: 'goog',
            type: 'NAME'
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
      type: 'UNION',
      elements: [
        {
          type: 'NAME',
          name: 'number'
        },
        {
          type: 'NAME',
          name: 'boolean'
        }
      ],
      nullable: true
    }
  },
  {
    description: 'non-nullable union with 2 types (number and boolean)',
    input: '!(number|boolean)',
    expected: {
      type: 'UNION',
      elements: [
        {
          type: 'NAME',
          name: 'number'
        },
        {
          type: 'NAME',
          name: 'boolean'
        }
      ],
      nullable: false
    }
  },
  {
    description: 'optional union with 2 types (number and boolean)',
    input: '(number|boolean)=',
    expected: {
      type: 'UNION',
      elements: [
        {
          type: 'NAME',
          name: 'number'
        },
        {
          type: 'NAME',
          name: 'boolean'
        }
      ],
      optional: true
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
          name: 'Array'
        },
        {
          type: 'GENERIC',
          objects: [
            {
              type: 'NAME',
              name: 'string'
            },
            {
              type: 'UNKNOWN'
            }
          ],
          subject: {
            type: 'NAME',
            name: 'Object'
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
              name: 'string'
            }
          ],
          subject: {
            type: 'NAME',
            name: 'Array'
          }
        },
        {
          type: 'GENERIC',
          objects: [
            {
              type: 'NAME',
              name: 'string'
            },
            {
              type: 'UNKNOWN'
            }
          ],
          subject: {
            type: 'NAME',
            name: 'Object'
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
          name: 'Error'
        },
        {
          type: 'FUNCTION',
          parameters: [],
          returnType: {
            type: 'NAME',
            name: 'Error'
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
          name: 'number'
        },
        {
          type: 'NAME',
          name: 'string'
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
          type: 'NAME',
          name: 'number',
          nullable: false
        },
        {
          type: 'NAME',
          name: 'string',
          nullable: false
        }
      ]
    }
  },
  {
    description: 'optional union with multiple types',
    input: '(jQuerySelector|Element|Object|Array.<Element>|jQuery|string|function())=',
    expected: {
      type: 'UNION',
      elements: [
        {
          type: 'NAME',
          name: 'jQuerySelector'
        },
        {
          type: 'NAME',
          name: 'Element'
        },
        {
          type: 'NAME',
          name: 'Object'
        },
        {
          type: 'GENERIC',
          objects: [
            {
              type: 'NAME',
              name: 'Element'
            }
          ],
          subject: {
            type: 'NAME',
            name: 'Array'
          }
        },
        {
          type: 'NAME',
          name: 'jQuery'
        },
        {
          type: 'NAME',
          name: 'string'
        },
        {
          type: 'FUNCTION',
          parameters: []
        }
      ],
      optional: true
    }
  },
  {
    description: 'optional union with multiple types, including a nested union type',
    input: '(Element|Object|Document|Object.<string, (string|function(!jQuery.event=))>)=',
    expected: {
      type: 'UNION',
      elements: [
        {
          type: 'NAME',
          name: 'Element'
        },
        {
          type: 'NAME',
          name: 'Object'
        },
        {
          type: 'NAME',
          name: 'Document'
        },
        {
          type: 'GENERIC',
          objects: [
            {
              type: 'NAME',
              name: 'string'
            },
            {
              type: 'UNION',
              elements: [
                {
                  type: 'NAME',
                  name: 'string'
                },
                {
                  type: 'FUNCTION',
                  parameters: [
                    {
                      left: {
                        name: 'jQuery',
                        type: 'NAME'
                      },
                      nullable: false,
                      optional: true,
                      path: [
                        'event'
                      ],
                      type: 'PROPERTY_PATH'
                    }
                  ]
                }
              ]
            }
          ],
          subject: {
            type: 'NAME',
            name: 'Object'
          }
        }
      ],
      optional: true
    }
  }
]
