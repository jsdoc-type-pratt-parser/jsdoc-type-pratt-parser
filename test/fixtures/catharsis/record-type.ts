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
            name: 'myNum'
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
    description: 'repeatable record type with 1 typed property',
    input: '...{myNum: number}',
    expected: {
      type: 'RECORD',
      fields: [
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            name: 'myNum'
          },
          value: {
            type: 'NAME',
            name: 'number'
          }
        }
      ],
      repeatable: true
    }
  },
  {
    description: 'optional record type with 1 typed property',
    input: '{myNum: number}=',
    expected: {
      type: 'RECORD',
      fields: [
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            name: 'myNum'
          },
          value: {
            type: 'NAME',
            name: 'number'
          }
        }
      ],
      optional: true
    }
  },
  {
    description: 'nullable record type with 1 typed property',
    input: '?{myNum: number}',
    expected: {
      type: 'RECORD',
      fields: [
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            name: 'myNum'
          },
          value: {
            type: 'NAME',
            name: 'number'
          }
        }
      ],
      nullable: true
    }
  },
  {
    description: 'non-nullable record type with 1 typed property',
    input: '!{myNum: number}',
    expected: {
      type: 'RECORD',
      fields: [
        {
          type: 'KEY_VALUE',
          key: {
            type: 'NAME',
            name: 'myNum'
          },
          value: {
            type: 'NAME',
            name: 'number'
          }
        }
      ],
      nullable: false
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
            name: 'myNum'
          },
          value: {
            type: 'NAME',
            name: 'number'
          }
        },
        {
          type: 'NAME',
          name: 'myObject'
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
            name: 'myArray'
          },
          value: {
            type: 'GENERIC',
            subject: {
              type: 'NAME',
              name: 'Array'
            },
            objects: [
              {
                type: 'NAME',
                name: 'string'
              }
            ]
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
            name: 'myKey'
          },
          value: {
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
            reservedWord: true
          },
          value: {
            type: 'NAME',
            name: 'string'
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
            reservedWord: true
          },
          value: {
            type: 'NAME',
            name: 'string'
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
            reservedWord: true
          },
          value: {
            type: 'NAME',
            name: 'string'
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
            name: 'string'
          }
        }
      ]
    }
  }
]
