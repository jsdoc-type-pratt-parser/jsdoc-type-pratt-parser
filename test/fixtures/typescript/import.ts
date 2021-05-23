import { Fixture } from '../Fixture'

export const importFixtures: Fixture[] = [
  {
    description: 'import "x"',
    input: 'import("x")',
    expected: {
      type: 'JsdocTypeImport',
      element: {
        type: 'JsdocTypeStringValue',
        value: 'x',
        meta: {
          quote: 'double'
        }
      }
    },
    modes: ['typescript'],
    catharsis: {
      closure: 'fail',
      jsdoc: 'fail'
    },
    jtp: {
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'typescript',
      permissive: 'typescript'
    }
  },
  {
    description: 'import "./x"',
    input: 'import("./x")',
    expected: {
      type: 'JsdocTypeImport',
      element: {
        type: 'JsdocTypeStringValue',
        value: './x',
        meta: {
          quote: 'double'
        }
      }
    },
    modes: ['typescript'],
    catharsis: {
      closure: 'fail',
      jsdoc: 'fail'
    },
    jtp: {
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'typescript',
      permissive: 'typescript'
    }
  },
  {
    description: 'import "../x"',
    input: 'import("../x")',
    expected: {
      type: 'JsdocTypeImport',
      element: {
        type: 'JsdocTypeStringValue',
        value: '../x',
        meta: {
          quote: 'double'
        }
      }
    },
    modes: ['typescript'],
    catharsis: {
      closure: 'fail',
      jsdoc: 'fail'
    },
    jtp: {
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'typescript',
      permissive: 'typescript'
    }
  },
  {
    description: 'import a named export',
    input: 'import("x").T',
    expected: {
      type: 'JsdocTypeNamePath',
      left: {
        type: 'JsdocTypeImport',
        element: {
          type: 'JsdocTypeStringValue',
          value: 'x',
          meta: {
            quote: 'double'
          }
        }
      },
      right: {
        type: 'JsdocTypeName',
        value: 'T'
      },
      pathType: 'property'
    },
    modes: ['typescript'],
    catharsis: {
      closure: 'fail',
      jsdoc: 'fail'
    },
    jtp: {
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'typescript',
      permissive: 'typescript'
    }
  },
  {
    description: 'import 2-level named export',
    input: 'import("x").T.U',
    expected: {
      type: 'JsdocTypeNamePath',
      left: {
        type: 'JsdocTypeNamePath',
        left: {
          type: 'JsdocTypeImport',
          element: {
            type: 'JsdocTypeStringValue',
            value: 'x',
            meta: {
              quote: 'double'
            }
          }
        },
        right: {
          type: 'JsdocTypeName',
          value: 'T'
        },
        pathType: 'property'
      },
      right: {
        type: 'JsdocTypeName',
        value: 'U'
      },
      pathType: 'property'
    },
    modes: ['typescript'],
    catharsis: {
      closure: 'fail',
      jsdoc: 'fail'
    },
    jtp: {
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'typescript',
      permissive: 'typescript'
    }
  },
  {
    description: 'import 2-level named export as generic',
    input: 'import("x").T.U<V,W>',
    stringified: 'import("x").T.U<V, W>',
    expected: {
      type: 'JsdocTypeGeneric',
      left: {
        type: 'JsdocTypeNamePath',
        left: {
          type: 'JsdocTypeNamePath',
          left: {
            type: 'JsdocTypeImport',
            element: {
              type: 'JsdocTypeStringValue',
              value: 'x',
              meta: {
                quote: 'double'
              }
            }
          },
          right: {
            type: 'JsdocTypeName',
            value: 'T'
          },
          pathType: 'property'
        },
        right: {
          type: 'JsdocTypeName',
          value: 'U'
        },
        pathType: 'property'
      },
      elements: [
        {
          type: 'JsdocTypeName',
          value: 'V'
        },
        {
          type: 'JsdocTypeName',
          value: 'W'
        }
      ],
      meta: {
        dot: false,
        brackets: 'angle'
      }
    },
    modes: ['typescript'],
    catharsis: {
      closure: 'fail',
      jsdoc: 'fail'
    },
    jtp: {
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'typescript',
      permissive: 'typescript'
    }
  }
]
