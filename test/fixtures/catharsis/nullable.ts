import { Fixture } from '../Fixture'

export const nullableFixtures: Fixture[] = [
  {
    description: 'nullable number',
    input: '?number',
    expected: {
      type: 'NULLABLE',
      element: {
        type: 'NAME',
        value: 'number',
        meta: {
          reservedWord: false
        }
      },
      meta: {
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
    description: 'postfix nullable number',
    input: 'number?',
    expected: {
      type: 'NULLABLE',
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
    description: 'non-nullable object',
    input: '!Object',
    expected: {
      type: 'NOT_NULLABLE',
      element: {
        type: 'NAME',
        value: 'Object',
        meta: {
          reservedWord: false
        }
      },
      meta: {
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
    description: 'postfix non-nullable object',
    input: 'Object!',
    expected: {
      type: 'NOT_NULLABLE',
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
    description: 'repeatable nullable number',
    input: '...?number',
    expected: {
      type: 'VARIADIC',
      element: {
        type: 'NULLABLE',
        element: {
          type: 'NAME',
          value: 'number',
          meta: {
            reservedWord: false
          }
        },
        meta: {
          position: 'PREFIX'
        }
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
    description: 'postfix repeatable nullable number',
    input: '...number?',
    expected: {
      type: 'VARIADIC',
      element: {
        type: 'NULLABLE',
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
    description: 'repeatable non-nullable object',
    input: '...!Object',
    expected: {
      type: 'VARIADIC',
      element: {
        type: 'NOT_NULLABLE',
        element: {
          type: 'NAME',
          value: 'Object',
          meta: {
            reservedWord: false
          }
        },
        meta: {
          position: 'PREFIX'
        }
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
    description: 'postfix repeatable non-nullable object',
    input: '...Object!',
    expected: {
      type: 'VARIADIC',
      element: {
        type: 'NOT_NULLABLE',
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
    description: 'postfix optional nullable number',
    input: 'number=?',
    expected: {
      type: 'NULLABLE',
      element: {
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
      type: 'OPTIONAL',
      element: {
        type: 'NULLABLE',
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
    description: 'postfix repeatable nullable optional number',
    input: '...number?=',
    expected: {
      type: 'VARIADIC',
      element: {
        type: 'OPTIONAL',
        element: {
          type: 'NULLABLE',
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
        meta: {
          position: 'SUFFIX'
        }
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
    description: 'postfix optional non-nullable object',
    input: 'Object=!',
    expected: {
      type: 'NOT_NULLABLE',
      element: {
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
      type: 'OPTIONAL',
      element: {
        type: 'NOT_NULLABLE',
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
    description: 'postfix repeatable non-nullable optional object',
    input: '...Object!=',
    expected: {
      type: 'VARIADIC',
      element: {
        type: 'OPTIONAL',
        element: {
          type: 'NOT_NULLABLE',
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
        meta: {
          position: 'SUFFIX'
        }
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
  }
]
