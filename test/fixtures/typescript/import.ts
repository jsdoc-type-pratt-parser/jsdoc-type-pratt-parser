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
          quote: '"'
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
          quote: '"'
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
          quote: '"'
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
            quote: '"'
          }
        }
      },
      right: {
        type: 'JsdocTypeName',
        value: 'T',
        meta: {
          reservedWord: false
        }
      },
      pathType: '.'
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
              quote: '"'
            }
          }
        },
        right: {
          type: 'JsdocTypeName',
          value: 'T',
          meta: {
            reservedWord: false
          }
        },
        pathType: '.'
      },
      right: {
        type: 'JsdocTypeName',
        value: 'U',
        meta: {
          reservedWord: false
        }
      },
      pathType: '.'
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
                quote: '"'
              }
            }
          },
          right: {
            type: 'JsdocTypeName',
            value: 'T',
            meta: {
              reservedWord: false
            }
          },
          pathType: '.'
        },
        right: {
          type: 'JsdocTypeName',
          value: 'U',
          meta: {
            reservedWord: false
          }
        },
        pathType: '.'
      },
      elements: [
        {
          type: 'JsdocTypeName',
          value: 'V',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'JsdocTypeName',
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
