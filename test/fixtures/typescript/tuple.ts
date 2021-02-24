import { Fixture } from '../Fixture'

export const tupleFixtures: Fixture[] = [
  {
    description: 'Empty tuple',
    input: '[]',
    expected: {
      type: 'TUPLE',
      elements: []
    }
  },
  {
    description: 'Tuple with one element',
    input: '[x]',
    expected: {
      type: 'TUPLE',
      elements: [
        {
          type: 'NAME',
          name: 'x'
        }
      ]
    }
  },
  {
    description: 'Tuple with 4 elements',
    input: '[it, needs, to, be]',
    expected: {
      type: 'TUPLE',
      elements: [
        {
          type: 'NAME',
          name: 'it'
        },
        {
          type: 'NAME',
          name: 'needs'
        },
        {
          type: 'NAME',
          name: 'to'
        },
        {
          type: 'NAME',
          name: 'be'
        }
      ]
    }
  },
  {
    description: 'Tuple with spaces',
    input: '[ tuple, with, spaces ]',
    expected: {
      type: 'TUPLE',
      elements: [
        {
          type: 'NAME',
          name: 'tuple'
        },
        {
          type: 'NAME',
          reservedWord: true,
          name: 'with'
        },
        {
          type: 'NAME',
          name: 'spaces'
        }
      ]
    }
  },
  {
    description: 'Tuple with spaces',
    input: '[ tuple, with, trailing, comma, ]',
    expected: {
      type: 'TUPLE',
      elements: [
        {
          type: 'NAME',
          name: 'tuple'
        },
        {
          type: 'NAME',
          reservedWord: true,
          name: 'with'
        },
        {
          type: 'NAME',
          name: 'trailing'
        },
        {
          type: 'NAME',
          name: 'comma'
        }
      ]
    }
  },
  {
    description: 'Array of empty tuples',
    input: '[][]',
    expected: {
      type: 'GENERIC',
      subject: {
        type: 'NAME',
        name: 'Array'
      },
      objects: [
        {
          type: 'TUPLE',
          elements: []
        }
      ]
    }
  },
  {
    description: 'Array of non empty tuples',
    input: '[tuple, array][]',
    expected: {
      type: 'GENERIC',
      subject: {
        type: 'NAME',
        name: 'Array'
      },
      objects: [
        {
          type: 'TUPLE',
          elements: [
            {
              type: 'NAME',
              name: 'tuple'
            },
            {
              type: 'NAME',
              name: 'array'
            }
          ]
        }
      ]
    }
  },
  {
    description: 'Tuple with typeof',
    input: '[tuple, with, typeof foo]',
    expected: {
      type: 'TUPLE',
      elements: [
        {
          type: 'NAME',
          name: 'tuple'
        },
        {
          type: 'NAME',
          name: 'with',
          reservedWord: true
        },
        {
          type: 'TYPE_OF',
          value: {
            type: 'NAME',
            name: 'foo'
          }
        }
      ]
    }
  },
  {
    description: 'Tuple with keyof',
    input: '[tuple, with, keyof foo]',
    expected: {
      type: 'TUPLE',
      elements: [
        {
          type: 'NAME',
          name: 'tuple'
        },
        {
          type: 'NAME',
          name: 'with',
          reservedWord: true
        },
        {
          type: 'KEY_OF',
          value: {
            type: 'NAME',
            name: 'foo'
          }
        }
      ]
    }
  },
  {
    description: 'Tuple with typeof and keyof',
    input: '[ tuple, with, typeof foo, and, keyof foo]',
    expected: {
      type: 'TUPLE',
      elements: [
        {
          type: 'NAME',
          name: 'tuple'
        },
        {
          type: 'NAME',
          name: 'with',
          reservedWord: true
        },
        {
          type: 'TYPE_OF',
          value: {
            type: 'NAME',
            name: 'foo'
          }
        },
        {
          type: 'NAME',
          name: 'and'
        },
        {
          type: 'KEY_OF',
          value: {
            type: 'NAME',
            name: 'foo'
          }
        }
      ]
    }
  }
]

// // this are actually spread operators, not repeatable arguments
// {[variadic, arguments, ...tuple]}
// {[ tuple, with, typeof foo, and, ...rest ]}
// {[ tuple, with, keyof foo, and, ...rest ]}
// {[ tuple, with, typeof foo, keyof foo, and, ...rest ]}
