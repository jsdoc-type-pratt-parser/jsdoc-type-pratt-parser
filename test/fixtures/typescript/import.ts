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
      right: {
        type: 'NAME',
        value: 'T',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        type: '.'
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
    description: 'import 2-level named export',
    input: 'import("x").T.U',
    expected: {
      type: 'NAME_PATH',
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
        right: {
          type: 'NAME',
          value: 'T',
          meta: {
            reservedWord: false
          }
        },
        meta: {
          type: '.'
        }
      },
      right: {
        type: 'NAME',
        value: 'U',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        type: '.'
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
    description: 'import 2-level named export as generic',
    input: 'import("x").T.U<V,W>',
    stringified: 'import("x").T.U<V, W>',
    expected: {
      type: 'GENERIC',
      left: {
        type: 'NAME_PATH',
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
          right: {
            type: 'NAME',
            value: 'T',
            meta: {
              reservedWord: false
            }
          },
          meta: {
            type: '.'
          }
        },
        right: {
          type: 'NAME',
          value: 'U',
          meta: {
            reservedWord: false
          }
        },
        meta: {
          type: '.'
        }
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
