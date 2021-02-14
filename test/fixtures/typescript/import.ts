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
        quote: '"'
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
        quote: '"'
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
        quote: '"'
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
          quote: '"'
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
          quote: '"'
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
            quote: '"'
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
          name: 'V'
        },
        {
          type: 'NAME',
          name: 'W'
        }
      ]
    }
  }
]
