import { Fixture } from '../Fixture'

export const basicFixtures: Fixture[] = [
  {
    description: 'boolean',
    input: 'boolean',
    expected: {
      type: 'NAME',
      name: 'boolean',
      meta: {
        reservedWord: false
      }
    }
  },
  {
    description: 'object',
    input: 'Window',
    expected: {
      type: 'NAME',
      name: 'Window',
      meta: {
        reservedWord: false
      }
    }
  },
  {
    description: 'object with properties',
    input: 'goog.ui.Menu',
    expected: {
      left: {
        name: 'goog',
        type: 'NAME',
        meta: {
          reservedWord: false
        }
      },
      path: [
        'ui',
        'Menu'
      ],
      type: 'PROPERTY_PATH'
    }
  },
  {
    description: 'object with a single-quoted string-literal property',
    input: "myObj.'myProp'.foo",
    expected: {
      left: {
        name: 'myObj',
        type: 'NAME',
        meta: {
          reservedWord: false
        }
      },
      path: [
        "'myProp'",
        'foo'
      ],
      type: 'PROPERTY_PATH'
    }
  },
  {
    description: 'object with a double-quoted string-literal property',
    input: 'myObj."myProp".foo',
    expected: {
      left: {
        name: 'myObj',
        type: 'NAME',
        meta: {
          reservedWord: false
        }
      },
      path: [
        '"myProp"',
        'foo'
      ],
      type: 'PROPERTY_PATH'
    }
  },
  {
    description: 'object with a string-literal property that includes other punctuation',
    input: 'myObj."#weirdProp".foo',
    expected: {
      left: {
        name: 'myObj',
        type: 'NAME',
        meta: {
          reservedWord: false
        }
      },
      path: [
        '"#weirdProp"',
        'foo'
      ],
      type: 'PROPERTY_PATH'
    }
  },
  {
    description: 'object with a numeric property',
    input: 'myObj.12345',
    expected: {
      left: {
        name: 'myObj',
        type: 'NAME',
        meta: {
          reservedWord: false
        }
      },
      path: [
        '12345'
      ],
      type: 'PROPERTY_PATH'
    }
  },
  {
    description: 'variable number of parameters',
    input: '...number',
    expected: {
      type: 'VARIADIC',
      element: {
        type: 'NAME',
        name: 'number',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        squareBrackets: false,
        position: 'PREFIX'
      }
    }
  },
  {
    description: 'optional number parameter',
    input: 'number=',
    expected: {
      type: 'OPTIONAL',
      element: {
        type: 'NAME',
        name: 'number',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        position: 'SUFFIX'
      }
    }
  },
  {
    description: 'optional Object parameter',
    input: 'Object=',
    expected: {
      type: 'OPTIONAL',
      element: {
        type: 'NAME',
        name: 'Object',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        position: 'SUFFIX'
      }
    }
  },
  {
    description: 'null',
    input: 'null',
    expected: {
      type: 'NULL'
    }
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
    }
  },
  {
    description: 'undefined',
    input: 'undefined',
    expected: {
      type: 'UNDEFINED'
    }
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
    }
  },
  {
    description: 'all',
    input: '*',
    expected: {
      type: 'ALL'
    }
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
    }
  },
  {
    description: 'unknown',
    input: '?',
    expected: {
      type: 'UNKNOWN'
    }
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
    }
  },
  {
    description: 'name that starts with a reserved word',
    input: 'forsooth',
    expected: {
      type: 'NAME',
      name: 'forsooth',
      meta: {
        reservedWord: false
      }
    }
  },
  {
    description: 'name that includes a hyphen and a numeral',
    input: 'My-1st-Class',
    expected: {
      type: 'NAME',
      name: 'My-1st-Class',
      meta: {
        reservedWord: false
      }
    }
  },
  {
    description: 'name that includes an @ sign',
    input: 'module:@prefix/my-module~myCallback',
    expected: {
      path: 'module:@prefix/my-module~myCallback',
      type: 'MODULE'
    }
  }
]
