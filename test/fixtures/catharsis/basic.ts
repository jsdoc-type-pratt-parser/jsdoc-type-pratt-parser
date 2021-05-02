import { Fixture } from '../Fixture'

export const basicFixtures: Fixture[] = [
  {
    description: 'boolean',
    input: 'boolean',
    expected: {
      type: 'NAME',
      value: 'boolean',
      meta: {
        reservedWord: false
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'object',
    input: 'Window',
    expected: {
      type: 'NAME',
      value: 'Window',
      meta: {
        reservedWord: false
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'object with properties',
    input: 'goog.ui.Menu',
    expected: {
      left: {
        value: 'goog',
        type: 'NAME',
        meta: {
          reservedWord: false
        }
      },
      value: [
        'ui',
        'Menu'
      ],
      type: 'NAME_PATH'
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'object with a single-quoted string-literal property',
    input: "myObj.'myProp'.foo",
    expected: {
      left: {
        value: 'myObj',
        type: 'NAME',
        meta: {
          reservedWord: false
        }
      },
      value: [
        "'myProp'",
        'foo'
      ],
      type: 'NAME_PATH'
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'object with a double-quoted string-literal property',
    input: 'myObj."myProp".foo',
    expected: {
      left: {
        value: 'myObj',
        type: 'NAME',
        meta: {
          reservedWord: false
        }
      },
      value: [
        '"myProp"',
        'foo'
      ],
      type: 'NAME_PATH'
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'object with a string-literal property that includes other punctuation',
    input: 'myObj."#weirdProp".foo',
    expected: {
      left: {
        value: 'myObj',
        type: 'NAME',
        meta: {
          reservedWord: false
        }
      },
      value: [
        '"#weirdProp"',
        'foo'
      ],
      type: 'NAME_PATH'
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'object with a numeric property',
    input: 'myObj.12345',
    expected: {
      left: {
        value: 'myObj',
        type: 'NAME',
        meta: {
          reservedWord: false
        }
      },
      value: [
        '12345'
      ],
      type: 'NAME_PATH'
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: [] // NOTE: This seems to be a JTP error
  },
  {
    description: 'variable number of parameters',
    input: '...number',
    expected: {
      type: 'VARIADIC',
      element: {
        type: 'NAME',
        value: 'number',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        squareBrackets: false,
        position: 'PREFIX'
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'optional number parameter',
    input: 'number=',
    expected: {
      type: 'OPTIONAL',
      element: {
        type: 'NAME',
        value: 'number',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        position: 'SUFFIX'
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'optional Object parameter',
    input: 'Object=',
    expected: {
      type: 'OPTIONAL',
      element: {
        type: 'NAME',
        value: 'Object',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        position: 'SUFFIX'
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'null',
    input: 'null',
    expected: {
      type: 'NULL'
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'repeatable null',
    input: '...null',
    expected: {
      type: 'VARIADIC',
      element: {
        type: 'NULL'
      },
      meta: {
        position: 'PREFIX',
        squareBrackets: false
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'undefined',
    input: 'undefined',
    expected: {
      type: 'UNDEFINED'
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'repeatable undefined',
    input: '...undefined',
    expected: {
      type: 'VARIADIC',
      element: {
        type: 'UNDEFINED'
      },
      meta: {
        position: 'PREFIX',
        squareBrackets: false
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'all',
    input: '*',
    expected: {
      type: 'ALL'
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'repeatable all',
    input: '...*',
    expected: {
      type: 'VARIADIC',
      element: {
        type: 'ALL'
      },
      meta: {
        position: 'PREFIX',
        squareBrackets: false
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'unknown',
    input: '?',
    expected: {
      type: 'UNKNOWN'
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'repeatable unknown',
    input: '...?',
    expected: {
      type: 'VARIADIC',
      element: {
        type: 'UNKNOWN'
      },
      meta: {
        position: 'PREFIX',
        squareBrackets: false
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'name that starts with a reserved word',
    input: 'forsooth',
    expected: {
      type: 'NAME',
      value: 'forsooth',
      meta: {
        reservedWord: false
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'name that includes a hyphen and a numeral',
    input: 'My-1st-Class',
    expected: {
      type: 'NAME',
      value: 'My-1st-Class',
      meta: {
        reservedWord: false
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: ['jsdoc', 'closure', 'typescript', 'permissive']
  },
  {
    description: 'name that includes an @ sign',
    input: 'module:@prefix/my-module~myCallback',
    expected: {
      value: 'module:@prefix/my-module~myCallback',
      type: 'MODULE'
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsisModes: ['closure', 'jsdoc'],
    jtpModes: [] // NOTE: This seems to be a JTP error
  }
]
