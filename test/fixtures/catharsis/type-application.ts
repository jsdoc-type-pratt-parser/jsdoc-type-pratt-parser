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
    description: 'array of strings, with a dot separator',
    input: 'Array.<string>',
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
    description: 'repeatable array of strings',
    input: '...Array.<string>',
    expected: {
      type: 'GENERIC',
      repeatable: true,
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
    description: 'object whose properties are strings and property values are numbers',
    input: 'Object.<string, number>',
    expected: {
      type: 'GENERIC',
      objects: [
        {
          type: 'NAME',
          name: 'string'
        },
        {
          type: 'NAME',
          name: 'number'
        }
      ],
      subject: {
        type: 'NAME',
        name: 'Object'
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
                  name: 'boolean'
                },
                {
                  type: 'RECORD',
                  fields: [
                    {
                      type: 'KEY_VALUE',
                      key: {
                        type: 'NAME',
                        name: 'myKey'
                      },
                      value: {
                        type: 'NAME',
                        name: 'Error'
                      }
                    }
                  ]
                }
              ]
            }
          ],
          subject: {
            type: 'NAME',
            name: 'Array'
          }
        },
        {
          type: 'UNION',
          elements: [
            {
              type: 'NAME',
              name: 'boolean'
            },
            {
              type: 'NAME',
              name: 'string'
            },
            {
              type: 'FUNCTION',
              parameters: [
                {
                  type: 'KEY_VALUE',
                  key: {
                    type: 'NAME',
                    reservedWord: true,
                    name: 'new'
                  },
                  value: {
                    type: 'NAME',
                    name: 'foo'
                  }
                }
              ],
              returnType: {
                type: 'NAME',
                name: 'string'
              }
            }
          ]
        }
      ],
      subject: {
        type: 'NAME',
        name: 'Object'
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
              name: 'length'
            }
          ]
        }
      ],
      subject: {
        type: 'NAME',
        name: 'Array'
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
        name: 'Array'
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
          name: 'string'
        }
      ],
      subject: {
        type: 'NAME',
        name: 'Promise'
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
          name: 'string'
        }
      ],
      subject: {
        left: {
          name: 'foo',
          type: 'NAME'
        },
        path: [
          'Promise'
        ],
        type: 'PROPERTY_PATH'
      }
    }
  }
]
