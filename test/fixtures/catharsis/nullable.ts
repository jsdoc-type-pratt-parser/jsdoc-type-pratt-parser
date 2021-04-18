import { Fixture } from '../Fixture'

export const nullableFixtures: Fixture[] = [
  {
    description: 'nullable number',
    input: '?number',
    expected: {
      type: 'NULLABLE',
      element: {
        type: 'NAME',
        name: 'number',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        position: 'PREFIX'
      }
    }
  },
  {
    description: 'postfix nullable number',
    input: 'number?',
    expected: {
      type: 'NULLABLE',
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
    description: 'non-nullable object',
    input: '!Object',
    expected: {
      type: 'NOT_NULLABLE',
      element: {
        type: 'NAME',
        name: 'Object',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        position: 'PREFIX'
      }
    }
  },
  {
    description: 'postfix non-nullable object',
    input: 'Object!',
    expected: {
      type: 'NOT_NULLABLE',
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
    description: 'repeatable nullable number',
    input: '...?number',
    expected: {
      type: 'VARIADIC',
      element: {
        type: 'NULLABLE',
        element: {
          type: 'NAME',
          name: 'number',
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
          name: 'number',
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
          name: 'Object',
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
          name: 'Object',
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
          name: 'number',
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
    }
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
          name: 'number',
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
            name: 'number',
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
          name: 'Object',
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
    }
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
          name: 'Object',
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
            name: 'Object',
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
    }
  }
]
