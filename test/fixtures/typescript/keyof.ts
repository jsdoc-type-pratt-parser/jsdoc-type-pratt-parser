import {Fixture} from '../Fixture'

export const keyofFixtures: Fixture[] = [
  {
    description: 'keyof name',
    input: 'keyof A',
    expected: {
      type: 'KEY_OF',
      value: {
        type: 'NAME',
        name: 'A'
      }
    }
  },
  {
    description: 'keyof',
    input: 'keyof',
    expected: {
      type: 'KEY_OF'
    }
  },
  {
    description: 'generic with keyof',
    input: 'X<keyof>',
    expected: {
      type: 'GENERIC',
      subject: {
        type: 'NAME',
        name: 'X'
      },
      objects: [{
        type: 'KEY_OF'
      }]
    }
  },
  {
    description: 'generic with keyof name',
    input: 'X<keyof A>',
    expected: {
      type: 'GENERIC',
      subject: {
        type: 'NAME',
        name: 'X'
      },
      objects: [{
        type: 'KEY_OF',
        value: {
          type: 'NAME',
          name: 'A'
        }
      }]
    }
  },
  {
    description: 'generic keyof name in parenthesis',
    input: '(keyof X)<A>',
    expected: {
      type: 'GENERIC',
      subject: {
        type: 'KEY_OF',
        value: {
          type: 'NAME',
          name: 'X'
        }
      },
      objects: [
        {
          type: 'NAME',
          name: 'A'
        }
      ]
    }
  },
  {
    description: 'keyof name in parenthesis',
    input: '(keyof A)',
    expected: {
      type: 'KEY_OF',
      value: {
        type: 'NAME',
        name: 'A'
      }
    }
  },
  {
    description: 'repeatable keyof name',
    input: '...keyof A',
    expected: {
      type: 'KEY_OF',
      repeatable: true,
      value: {
        type: 'NAME',
        name: 'A'
      }
    }
  },
  {
    description: 'postfix repeatable keyof name',
    input: 'keyof A...',
    expected: {
      type: 'KEY_OF',
      repeatable: true,
      value: {
        type: 'NAME',
        name: 'A'
      }
    }
  },
  {
    description: 'union keyof name',
    input: 'keyof A | number',
    expected: {
      type: 'UNION',
      elements: [
        {
          type: 'KEY_OF',
          value: {
            type: 'NAME',
            name: 'A'
          }
        },
        {
          type: 'NAME',
          name: 'number'
        }
      ]
    }
  },
  {
    description: 'union with keyof name',
    input: 'number | keyof A',
    expected: {
      type: 'UNION',
      elements: [
        {
          type: 'NAME',
          name: 'number'
        },
        {
          type: 'KEY_OF',
          value: {
            type: 'NAME',
            name: 'A'
          }
        }
      ]
    }
  },
  {
    description: 'keyof array',
    input: 'keyof N[]',
    expected: {
      type: 'KEY_OF',
      value: {
        type: 'GENERIC',
        subject: {
          type: 'NAME',
          name: 'Array'
        },
        objects: [
          {
            type: 'NAME',
            name: 'N'
          }
        ]
      }
    }
  },
  {
    description: 'keyof as function parameter',
    input: 'function(keyof A)',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'KEY_OF',
          value: {
            type: "NAME",
            name: 'A'
          }
        }
      ]
    }
  },
  {
    description: 'keyof as first function parameter',
    input: 'function(keyof A, number)',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'KEY_OF',
          value: {
            type: "NAME",
            name: 'A'
          }
        },
        {
          type: 'NAME',
          name: 'number'
        }
      ]
    }
  },
  {
    description: 'keyof as second function parameter',
    input: 'function(number, keyof A)',
    expected: {
      type: 'FUNCTION',
      parameters: [
        {
          type: 'NAME',
          name: 'number'
        },
        {
          type: 'KEY_OF',
          value: {
            type: "NAME",
            name: 'A'
          }
        }
      ]
    }
  },
  {
    description: 'keyof as return of function',
    input: 'function(): keyof A',
    expected: {
      type: 'FUNCTION',
      parameters: [],
      returnType: {
        type: 'KEY_OF',
        value: {
          type: "NAME",
          name: 'A'
        }
      }
    }
  }
]
