import { Fixture } from '../Fixture'

export const importFixtures: Fixture[] = [
  {
    description: 'import "x"',
    input: 'import("x")',
    expected: {
      type: 'IMPORT',
      path: {
        type: 'STRING_VALUE',
        value: 'x',
        meta: {
          quote: '"'
        }
      }
    }
  },
  {
    description: 'import "./x"',
    input: 'import("./x")',
    expected: {
      type: 'IMPORT',
      path: {
        type: 'STRING_VALUE',
        value: './x',
        meta: {
          quote: '"'
        }
      }
    }
  },
  {
    description: 'import "../x"',
    input: 'import("../x")',
    expected: {
      type: 'IMPORT',
      path: {
        type: 'STRING_VALUE',
        value: '../x',
        meta: {
          quote: '"'
        }
      }
    }
  },
  {
    description: 'import a named export',
    input: 'import("x").T',
    expected: {
      type: 'PROPERTY_PATH',
      left: {
        type: 'IMPORT',
        path: {
          type: 'STRING_VALUE',
          value: 'x',
          meta: {
            quote: '"'
          }
        }
      },
      path: [
        'T'
      ]
    }
  },
  {
    description: 'import 2-level named export',
    input: 'import("x").T.U',
    expected: {
      type: 'PROPERTY_PATH',
      left: {
        type: 'IMPORT',
        path: {
          type: 'STRING_VALUE',
          value: 'x',
          meta: {
            quote: '"'
          }
        }
      },
      path: [
        'T',
        'U'
      ]
    }
  },
  {
    description: 'import 2-level named export as generic',
    input: 'import("x").T.U<V,W>',
    expected: {
      type: 'GENERIC',
      subject: {
        type: 'PROPERTY_PATH',
        left: {
          type: 'IMPORT',
          path: {
            type: 'STRING_VALUE',
            value: 'x',
            meta: {
              quote: '"'
            }
          }
        },
        path: [
          'T',
          'U'
        ]
      },
      objects: [
        {
          type: 'NAME',
          name: 'V',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'NAME',
          name: 'W',
          meta: {
            reservedWord: false
          }
        }
      ],
      meta: {
        dot: false,
        brackets: '<>'
      }
    }
  }
]
