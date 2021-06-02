import { testFixture } from '../Fixture'

describe('typescript import tests', () => {
  describe('import "x"', () => {
    testFixture({
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
      modes: [
        'typescript'
      ],
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
    })
  })

  describe('import "./x"', () => {
    testFixture({
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
      modes: [
        'typescript'
      ],
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
    })
  })

  describe('import "../x"', () => {
    testFixture({
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
      modes: [
        'typescript'
      ],
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
    })
  })

  describe('import a named export', () => {
    testFixture({
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
          type: 'JsdocTypeProperty',
          value: 'T'
        },
        pathType: 'property'
      },
      modes: [
        'typescript'
      ],
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
    })
  })

  describe('import 2-level named export', () => {
    testFixture({
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
            type: 'JsdocTypeProperty',
            value: 'T'
          },
          pathType: 'property'
        },
        right: {
          type: 'JsdocTypeProperty',
          value: 'U'
        },
        pathType: 'property'
      },
      modes: [
        'typescript'
      ],
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
    })
  })

  describe('import 2-level named export as generic', () => {
    testFixture({
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
              type: 'JsdocTypeProperty',
              value: 'T'
            },
            pathType: 'property'
          },
          right: {
            type: 'JsdocTypeProperty',
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
      modes: [
        'typescript'
      ],
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
    })
  })
})
