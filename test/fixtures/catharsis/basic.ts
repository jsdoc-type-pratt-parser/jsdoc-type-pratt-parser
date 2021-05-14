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
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'closure'
    }
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
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'closure'
    }
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
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'closure'
    }
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
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'closure'
    }
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
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'closure'
    }
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
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'closure'
    }
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
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'fail',
      permissive: 'fail'
    } // NOTE: This seems to be a JTP error
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
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'closure'
    }
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
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'closure'
    }
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
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'closure'
    }
  },
  {
    description: 'null',
    input: 'null',
    expected: {
      type: 'NULL'
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'closure'
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
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'closure'
    }
  },
  {
    description: 'undefined',
    input: 'undefined',
    expected: {
      type: 'UNDEFINED'
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'closure'
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
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'closure'
    }
  },
  {
    description: 'all',
    input: '*',
    expected: {
      type: 'ANY'
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'closure'
    }
  },
  {
    description: 'repeatable all',
    input: '...*',
    expected: {
      type: 'VARIADIC',
      element: {
        type: 'ANY'
      },
      meta: {
        position: 'PREFIX',
        squareBrackets: false
      }
    },
    modes: ['typescript', 'jsdoc', 'closure'],
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'closure'
    }
  },
  {
    description: 'unknown',
    input: '?',
    expected: {
      type: 'UNKNOWN'
    },
    modes: ['jsdoc', 'closure', 'typescript'],
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'closure'
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
    },
    modes: ['jsdoc', 'closure', 'typescript'],
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'closure'
    }
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
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'closure'
    }
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
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'closure'
    }
  },
  {
    description: 'single quoted module path',
    input: 'module:\'some-path\'',
    expected: {
      type: 'MODULE',
      value: 'some-path',
      meta: {
        quote: '\''
      }
    },
    modes: ['jsdoc'],
    catharsis: {
      jsdoc: 'jsdoc',
      closure: 'differ'
    },
    jtp: {
      jsdoc: 'jsdoc',
      closure: 'differ',
      typescript: 'fail',
      permissive: 'jsdoc'
    }
  },
  {
    description: 'double quoted module path',
    input: 'module:"some-path"',
    expected: {
      type: 'MODULE',
      value: 'some-path',
      meta: {
        quote: '"'
      }
    },
    modes: ['jsdoc'],
    catharsis: {
      jsdoc: 'jsdoc',
      closure: 'differ'
    },
    jtp: {
      jsdoc: 'jsdoc',
      closure: 'differ',
      typescript: 'fail',
      permissive: 'jsdoc'
    }
  },
  {
    description: 'name that includes an @ sign',
    input: 'module:@prefix/my-module~myCallback',
    expected: {
      type: 'NAME_PATH',
      left: {
        value: '@prefix/my-module',
        type: 'MODULE',
        meta: {
          quote: undefined
        }
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
    catharsis: {
      closure: 'differ', // this seems to be a catharsis error
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'fail',
      permissive: 'fail'
    } // NOTE: This seems to be a JTP error
  }
]
