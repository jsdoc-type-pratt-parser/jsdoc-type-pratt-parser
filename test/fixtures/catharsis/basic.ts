import { Fixture } from '../Fixture'

export const basicFixtures: Fixture[] = [
  {
    description: 'boolean',
    input: 'boolean',
    expected: {
      type: 'JsdocTypeName',
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
      type: 'JsdocTypeName',
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
          type: 'JsdocTypeName',
          meta: {
            reservedWord: false
          }
        },
        right: {
          type: 'JsdocTypeName',
          value: 'ui',
          meta: {
            reservedWord: false
          }
        },
        type: 'JsdocTypeNamePath',
        pathType: '.'
      },
      right: {
        type: 'JsdocTypeName',
        value: 'Menu',
        meta: {
          reservedWord: false
        }
      },
      type: 'JsdocTypeNamePath',
      pathType: '.'
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
          type: 'JsdocTypeName',
          meta: {
            reservedWord: false
          }
        },
        right: {
          type: 'JsdocTypeStringValue',
          value: 'myProp',
          meta: {
            quote: 'single'
          }
        },
        type: 'JsdocTypeNamePath',
        pathType: '.'
      },
      right: {
        type: 'JsdocTypeName',
        value: 'foo',
        meta: {
          reservedWord: false
        }
      },
      type: 'JsdocTypeNamePath',
      pathType: '.'
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
          type: 'JsdocTypeName',
          meta: {
            reservedWord: false
          }
        },
        right: {
          type: 'JsdocTypeStringValue',
          value: 'myProp',
          meta: {
            quote: 'double'
          }
        },
        type: 'JsdocTypeNamePath',
        pathType: '.'
      },
      right: {
        type: 'JsdocTypeName',
        value: 'foo',
        meta: {
          reservedWord: false
        }
      },
      type: 'JsdocTypeNamePath',
      pathType: '.'
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
          type: 'JsdocTypeName',
          meta: {
            reservedWord: false
          }
        },
        right: {
          type: 'JsdocTypeStringValue',
          value: '#weirdProp',
          meta: {
            quote: 'double'
          }
        },
        type: 'JsdocTypeNamePath',
        pathType: '.'
      },
      right: {
        type: 'JsdocTypeName',
        value: 'foo',
        meta: {
          reservedWord: false
        }
      },
      type: 'JsdocTypeNamePath',
      pathType: '.'
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
        type: 'JsdocTypeName',
        meta: {
          reservedWord: false
        }
      },
      right: {
        type: 'JsdocTypeNumber',
        value: 12345
      },
      type: 'JsdocTypeNamePath',
      pathType: '.'
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
      type: 'JsdocTypeVariadic',
      element: {
        type: 'JsdocTypeName',
        value: 'number',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        squareBrackets: false,
        position: 'prefix'
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
      type: 'JsdocTypeOptional',
      element: {
        type: 'JsdocTypeName',
        value: 'number',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        position: 'suffix'
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
      type: 'JsdocTypeOptional',
      element: {
        type: 'JsdocTypeName',
        value: 'Object',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        position: 'suffix'
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
      type: 'JsdocTypeNull'
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
      type: 'JsdocTypeVariadic',
      element: {
        type: 'JsdocTypeNull'
      },
      meta: {
        position: 'prefix',
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
      type: 'JsdocTypeUndefined'
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
      type: 'JsdocTypeVariadic',
      element: {
        type: 'JsdocTypeUndefined'
      },
      meta: {
        position: 'prefix',
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
      type: 'JsdocTypeAny'
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
      type: 'JsdocTypeVariadic',
      element: {
        type: 'JsdocTypeAny'
      },
      meta: {
        position: 'prefix',
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
      type: 'JsdocTypeUnknown'
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
      type: 'JsdocTypeVariadic',
      element: {
        type: 'JsdocTypeUnknown'
      },
      meta: {
        position: 'prefix',
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
      type: 'JsdocTypeName',
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
      type: 'JsdocTypeName',
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
      type: 'JsdocTypeSpecialNamePath',
      specialType: 'module',
      value: 'some-path',
      meta: {
        quote: 'single'
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
      type: 'JsdocTypeSpecialNamePath',
      specialType: 'module',
      value: 'some-path',
      meta: {
        quote: 'double'
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
      type: 'JsdocTypeNamePath',
      left: {
        value: '@prefix/my-module',
        type: 'JsdocTypeSpecialNamePath',
        specialType: 'module',
        meta: {
          quote: undefined
        }
      },
      right: {
        type: 'JsdocTypeName',
        value: 'myCallback',
        meta: {
          reservedWord: false
        }
      },
      pathType: '~'
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
