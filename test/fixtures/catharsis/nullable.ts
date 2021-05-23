import { Fixture } from '../Fixture'

export const nullableFixtures: Fixture[] = [
  {
    description: 'nullable number',
    input: '?number',
    expected: {
      type: 'JsdocTypeNullable',
      element: {
        type: 'JsdocTypeName',
        value: 'number'
      },
      meta: {
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
    description: 'postfix nullable number',
    input: 'number?',
    expected: {
      type: 'JsdocTypeNullable',
      element: {
        type: 'JsdocTypeName',
        value: 'number'
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
    description: 'non-nullable object',
    input: '!Object',
    expected: {
      type: 'JsdocTypeNotNullable',
      element: {
        type: 'JsdocTypeName',
        value: 'Object'
      },
      meta: {
        position: 'prefix'
      }
    },
    modes: ['jsdoc', 'closure'],
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'differ',
      permissive: 'closure'
    }
  },
  {
    description: 'postfix non-nullable object',
    input: 'Object!',
    expected: {
      type: 'JsdocTypeNotNullable',
      element: {
        type: 'JsdocTypeName',
        value: 'Object'
      },
      meta: {
        position: 'suffix'
      }
    },
    modes: ['jsdoc', 'closure'],
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'differ',
      permissive: 'closure'
    }
  },
  {
    description: 'repeatable nullable number',
    input: '...?number',
    expected: {
      type: 'JsdocTypeVariadic',
      element: {
        type: 'JsdocTypeNullable',
        element: {
          type: 'JsdocTypeName',
          value: 'number'
        },
        meta: {
          position: 'prefix'
        }
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
    description: 'postfix repeatable nullable number',
    input: '...number?',
    expected: {
      type: 'JsdocTypeVariadic',
      element: {
        type: 'JsdocTypeNullable',
        element: {
          type: 'JsdocTypeName',
          value: 'number'
        },
        meta: {
          position: 'suffix'
        }
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
    description: 'repeatable non-nullable object',
    input: '...!Object',
    expected: {
      type: 'JsdocTypeVariadic',
      element: {
        type: 'JsdocTypeNotNullable',
        element: {
          type: 'JsdocTypeName',
          value: 'Object'
        },
        meta: {
          position: 'prefix'
        }
      },
      meta: {
        position: 'prefix',
        squareBrackets: false
      }
    },
    modes: ['jsdoc', 'closure'],
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'differ',
      permissive: 'closure'
    }
  },
  {
    description: 'postfix repeatable non-nullable object',
    input: '...Object!',
    expected: {
      type: 'JsdocTypeVariadic',
      element: {
        type: 'JsdocTypeNotNullable',
        element: {
          type: 'JsdocTypeName',
          value: 'Object'
        },
        meta: {
          position: 'suffix'
        }
      },
      meta: {
        position: 'prefix',
        squareBrackets: false
      }
    },
    modes: ['jsdoc', 'closure'],
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'differ',
      permissive: 'closure'
    }
  },
  {
    description: 'postfix optional nullable number',
    input: 'number=?',
    expected: {
      type: 'JsdocTypeNullable',
      element: {
        type: 'JsdocTypeOptional',
        element: {
          type: 'JsdocTypeName',
          value: 'number'
        },
        meta: {
          position: 'suffix'
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
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'fail',
      permissive: 'fail'
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'postfix nullable optional number',
    input: 'number?=',
    expected: {
      type: 'JsdocTypeOptional',
      element: {
        type: 'JsdocTypeNullable',
        element: {
          type: 'JsdocTypeName',
          value: 'number'
        },
        meta: {
          position: 'suffix'
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
    description: 'postfix repeatable nullable optional number',
    input: '...number?=',
    expected: {
      type: 'JsdocTypeVariadic',
      element: {
        type: 'JsdocTypeOptional',
        element: {
          type: 'JsdocTypeNullable',
          element: {
            type: 'JsdocTypeName',
            value: 'number'
          },
          meta: {
            position: 'suffix'
          }
        },
        meta: {
          position: 'suffix'
        }
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
    description: 'postfix optional non-nullable object',
    input: 'Object=!',
    expected: {
      type: 'JsdocTypeNotNullable',
      element: {
        type: 'JsdocTypeOptional',
        element: {
          type: 'JsdocTypeName',
          value: 'Object'
        },
        meta: {
          position: 'suffix'
        }
      },
      meta: {
        position: 'suffix'
      }
    },
    modes: ['jsdoc', 'closure'],
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
    description: 'postfix non-nullable optional object',
    input: 'Object!=',
    expected: {
      type: 'JsdocTypeOptional',
      element: {
        type: 'JsdocTypeNotNullable',
        element: {
          type: 'JsdocTypeName',
          value: 'Object'
        },
        meta: {
          position: 'suffix'
        }
      },
      meta: {
        position: 'suffix'
      }
    },
    modes: ['jsdoc', 'closure'],
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'differ',
      permissive: 'closure'
    }
  },
  {
    description: 'postfix repeatable non-nullable optional object',
    input: '...Object!=',
    expected: {
      type: 'JsdocTypeVariadic',
      element: {
        type: 'JsdocTypeOptional',
        element: {
          type: 'JsdocTypeNotNullable',
          element: {
            type: 'JsdocTypeName',
            value: 'Object'
          },
          meta: {
            position: 'suffix'
          }
        },
        meta: {
          position: 'suffix'
        }
      },
      meta: {
        position: 'prefix',
        squareBrackets: false
      }
    },
    modes: ['jsdoc', 'closure'],
    catharsis: {
      closure: 'closure',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'closure',
      jsdoc: 'jsdoc',
      typescript: 'differ',
      permissive: 'closure'
    }
  }
]
