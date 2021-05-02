import { Fixture } from '../Fixture'

export const importFixtures: Fixture[] = [
  {
    description: 'import "x"',
    input: 'import("x")',
    expected: {
      type: 'IMPORT',
      element: {
        type: 'STRING_VALUE',
        value: 'x',
        meta: {
          quote: '"'
        }
      }
    },
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'import "./x"',
    input: 'import("./x")',
    expected: {
      type: 'IMPORT',
      element: {
        type: 'STRING_VALUE',
        value: './x',
        meta: {
          quote: '"'
        }
      }
    },
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'import "../x"',
    input: 'import("../x")',
    expected: {
      type: 'IMPORT',
      element: {
        type: 'STRING_VALUE',
        value: '../x',
        meta: {
          quote: '"'
        }
      }
    },
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'import a named export',
    input: 'import("x").T',
    expected: {
      type: 'NAME_PATH',
      left: {
        type: 'IMPORT',
        element: {
          type: 'STRING_VALUE',
          value: 'x',
          meta: {
            quote: '"'
          }
        }
      },
      value: [
        'T'
      ]
    },
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'import 2-level named export',
    input: 'import("x").T.U',
    expected: {
      type: 'NAME_PATH',
      left: {
        type: 'IMPORT',
        element: {
          type: 'STRING_VALUE',
          value: 'x',
          meta: {
            quote: '"'
          }
        }
      },
      value: [
        'T',
        'U'
      ]
    },
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  },
  {
    description: 'import 2-level named export as generic',
    input: 'import("x").T.U<V,W>',
    expected: {
      type: 'GENERIC',
      left: {
        type: 'NAME_PATH',
        left: {
          type: 'IMPORT',
          element: {
            type: 'STRING_VALUE',
            value: 'x',
            meta: {
              quote: '"'
            }
          }
        },
        value: [
          'T',
          'U'
        ]
      },
      elements: [
        {
          type: 'NAME',
          value: 'V',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'NAME',
          value: 'W',
          meta: {
            reservedWord: false
          }
        }
      ],
      meta: {
        dot: false,
        brackets: '<>'
      }
    },
    modes: ['typescript'],
    catharsisModes: [],
    jtpModes: ['typescript', 'permissive']
  }
]
