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
        left: {
          value: 'goog',
          type: 'NAME',
          meta: {
            reservedWord: false
          }
        },
        right: {
          type: 'NAME',
          value: 'ui',
          meta: {
            reservedWord: false
          }
        },
        type: 'NAME_PATH',
        meta: {
          type: '.'
        }
      },
      right: {
        type: 'NAME',
        value: 'Menu',
        meta: {
          reservedWord: false
        }
      },
      type: 'NAME_PATH',
      meta: {
        type: '.'
      }
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
        left: {
          value: 'myObj',
          type: 'NAME',
          meta: {
            reservedWord: false
          }
        },
        right: {
          type: 'STRING_VALUE',
          value: 'myProp',
          meta: {
            quote: '\''
          }
        },
        type: 'NAME_PATH',
        meta: {
          type: '.'
        }
      },
      right: {
        type: 'NAME',
        value: 'foo',
        meta: {
          reservedWord: false
        }
      },
      type: 'NAME_PATH',
      meta: {
        type: '.'
      }
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
        left: {
          value: 'myObj',
          type: 'NAME',
          meta: {
            reservedWord: false
          }
        },
        right: {
          type: 'STRING_VALUE',
          value: 'myProp',
          meta: {
            quote: '"'
          }
        },
        type: 'NAME_PATH',
        meta: {
          type: '.'
        }
      },
      right: {
        type: 'NAME',
        value: 'foo',
        meta: {
          reservedWord: false
        }
      },
      type: 'NAME_PATH',
      meta: {
        type: '.'
      }
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
        left: {
          value: 'myObj',
          type: 'NAME',
          meta: {
            reservedWord: false
          }
        },
        right: {
          type: 'STRING_VALUE',
          value: '#weirdProp',
          meta: {
            quote: '"'
          }
        },
        type: 'NAME_PATH',
        meta: {
          type: '.'
        }
      },
      right: {
        type: 'NAME',
        value: 'foo',
        meta: {
          reservedWord: false
        }
      },
      type: 'NAME_PATH',
      meta: {
        type: '.'
      }
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
      right: {
        type: 'NUMBER',
        value: 12345
      },
      type: 'NAME_PATH',
      meta: {
        type: '.'
      }
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
      type: 'NAME_PATH',
      left: {
        value: 'module:@prefix/my-module',
        type: 'MODULE'
      },
      right: {
        type: 'NAME',
        value: 'myCallback',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        type: '~'
      }
    },
    modes: ['jsdoc'],
    catharsisModes: ['closure', 'jsdoc'], // NOTE: This seems to be a Catharsis error
    jtpModes: [] // NOTE: This seems to be a JTP error
  }
]
