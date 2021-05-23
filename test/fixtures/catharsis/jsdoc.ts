import { Fixture } from '../Fixture'

export const jsdocFixtures: Fixture[] = [
  {
    description: 'name expression that starts with the word "function"',
    input: 'functional',
    expected: {
      type: 'JsdocTypeName',
      value: 'functional',
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
    description: 'name expression with instance scope punctuation',
    input: 'MyClass#myMember',
    expected: {
      type: 'JsdocTypeNamePath',
      left: {
        type: 'JsdocTypeName',
        value: 'MyClass',
        meta: {
          reservedWord: false
        }
      },
      right: {
        type: 'JsdocTypeName',
        value: 'myMember',
        meta: {
          reservedWord: false
        }
      },
      pathType: 'instance'
    },
    modes: ['jsdoc'],
    catharsis: {
      closure: 'differ',
      jsdoc: 'jsdoc'
    }, // NOTE: This seems to be a Catharsis error
    jtp: {
      closure: 'differ',
      jsdoc: 'jsdoc',
      typescript: 'differ',
      permissive: 'jsdoc'
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'name expression with inner scope punctuation',
    input: 'MyClass~myMember',
    expected: {
      type: 'JsdocTypeNamePath',
      left: {
        type: 'JsdocTypeName',
        value: 'MyClass',
        meta: {
          reservedWord: false
        }
      },
      right: {
        type: 'JsdocTypeName',
        value: 'myMember',
        meta: {
          reservedWord: false
        }
      },
      pathType: 'inner'
    },
    modes: ['jsdoc'],
    catharsis: {
      closure: 'differ',
      jsdoc: 'jsdoc'
    }, // NOTE: This seems to be a Catharsis error
    jtp: {
      closure: 'differ',
      jsdoc: 'jsdoc',
      typescript: 'differ',
      permissive: 'jsdoc'
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'name expression with instance and inner scope punctuation',
    input: 'MyClass#myMember#yourMember~theirMember',
    expected: {
      type: 'JsdocTypeNamePath',
      left: {
        type: 'JsdocTypeNamePath',
        left: {
          type: 'JsdocTypeNamePath',
          left: {
            type: 'JsdocTypeName',
            value: 'MyClass',
            meta: {
              reservedWord: false
            }
          },
          right: {
            type: 'JsdocTypeName',
            value: 'myMember',
            meta: {
              reservedWord: false
            }
          },
          pathType: 'instance'
        },
        right: {
          type: 'JsdocTypeName',
          value: 'yourMember',
          meta: {
            reservedWord: false
          }
        },
        pathType: 'instance'
      },
      right: {
        type: 'JsdocTypeName',
        value: 'theirMember',
        meta: {
          reservedWord: false
        }
      },
      pathType: 'inner'
    },
    modes: ['jsdoc'],
    catharsis: {
      closure: 'differ',
      jsdoc: 'jsdoc'
    }, // NOTE: This seems to be a Catharsis error
    jtp: {
      closure: 'differ',
      jsdoc: 'jsdoc',
      typescript: 'differ',
      permissive: 'jsdoc'
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'name expression for a class within a module',
    input: 'module:foo/bar/baz~Qux',
    expected: {
      type: 'JsdocTypeNamePath',
      left: {
        value: 'foo/bar/baz',
        type: 'JsdocTypeSpecialNamePath',
        specialType: 'module',
        meta: {
          quote: undefined
        }
      },
      right: {
        type: 'JsdocTypeName',
        meta: {
          reservedWord: false
        },
        value: 'Qux'
      },
      pathType: 'inner'
    },
    modes: ['jsdoc'],
    catharsis: {
      closure: 'differ',
      jsdoc: 'jsdoc'
    }, // NOTE: This seems to be a Catharsis error
    jtp: {
      closure: 'differ',
      jsdoc: 'jsdoc',
      typescript: 'fail',
      permissive: 'jsdoc'
    }
  },
  {
    description: 'name expression for a class within a module with hyphens',
    input: 'module:foo-bar/baz~Qux',
    expected: {
      type: 'JsdocTypeNamePath',
      left: {
        value: 'foo-bar/baz',
        type: 'JsdocTypeSpecialNamePath',
        specialType: 'module',
        meta: {
          quote: undefined
        }
      },
      right: {
        type: 'JsdocTypeName',
        meta: {
          reservedWord: false
        },
        value: 'Qux'
      },
      pathType: 'inner'
    },
    modes: ['jsdoc'],
    catharsis: {
      closure: 'differ',
      jsdoc: 'jsdoc'
    }, // NOTE: This seems to be a Catharsis error
    jtp: {
      closure: 'differ',
      jsdoc: 'jsdoc',
      typescript: 'fail',
      permissive: 'jsdoc'
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'name expression containing a reserved word',
    input: 'this',
    expected: {
      type: 'JsdocTypeName',
      value: 'this',
      meta: {
        reservedWord: true
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
    description: 'name expression for a symbol variation whose name is an empty string',
    input: 'MyClass()',
    expected: {
      value: 'MyClass',
      type: 'JsdocTypeSymbol'
    },
    modes: ['jsdoc'],
    catharsis: {
      closure: 'differ',
      jsdoc: 'jsdoc'
    }, // NOTE: This seems to be a Catharsis error
    jtp: {
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'fail',
      permissive: 'fail'
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'name expression for a symbol variation whose name is one numeral',
    input: 'MyClass(2)',
    expected: {
      value: 'MyClass',
      type: 'JsdocTypeSymbol',
      element: {
        type: 'JsdocTypeNumber',
        value: 2
      }
    },
    modes: ['jsdoc'],
    catharsis: {
      closure: 'differ',
      jsdoc: 'jsdoc'
    }, // NOTE: This seems to be a Catharsis error
    jtp: {
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'fail',
      permissive: 'fail'
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'name expression for a symbol variation whose name is multiple numerals',
    input: 'MyClass(23456)',
    expected: {
      value: 'MyClass',
      type: 'JsdocTypeSymbol',
      element: {
        type: 'JsdocTypeNumber',
        value: 23456
      }
    },
    modes: ['jsdoc'],
    catharsis: {
      closure: 'differ',
      jsdoc: 'jsdoc'
    }, // NOTE: This seems to be a Catharsis error
    jtp: {
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'fail',
      permissive: 'fail'
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'name expression for a symbol variation whose name is one letter',
    input: 'MyClass(a)',
    expected: {
      value: 'MyClass',
      type: 'JsdocTypeSymbol',
      element: {
        value: 'a',
        type: 'JsdocTypeName',
        meta: {
          reservedWord: false
        }
      }
    },
    modes: ['jsdoc'],
    catharsis: {
      closure: 'differ',
      jsdoc: 'jsdoc'
    }, // NOTE: This seems to be a Catharsis error
    jtp: {
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'fail',
      permissive: 'fail'
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'name expression for a symbol variation whose name is multiple letters',
    input: 'MyClass(abcde)',
    expected: {
      value: 'MyClass',
      type: 'JsdocTypeSymbol',
      element: {
        value: 'abcde',
        type: 'JsdocTypeName',
        meta: {
          reservedWord: false
        }
      }
    },
    modes: ['jsdoc'],
    catharsis: {
      closure: 'differ',
      jsdoc: 'jsdoc'
    }, // NOTE: This seems to be a Catharsis error
    jtp: {
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'fail',
      permissive: 'fail'
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'name expression enclosed in double quotes',
    input: '"foo.bar.baz"',
    expected: {
      type: 'JsdocTypeStringValue',
      value: 'foo.bar.baz',
      meta: {
        quote: 'double'
      }
    },
    modes: ['typescript', 'jsdoc'],
    catharsis: {
      closure: 'fail',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'differ',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'jsdoc'
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'name expression enclosed in single quotes',
    input: "'foo.bar.baz'",
    expected: {
      type: 'JsdocTypeStringValue',
      value: 'foo.bar.baz',
      meta: {
        quote: 'single'
      }
    },
    modes: ['typescript', 'jsdoc'],
    catharsis: {
      closure: 'fail',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'differ',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'jsdoc'
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'name expression partially enclosed in double quotes',
    input: 'foo."bar.baz".qux',
    expected: {
      left: {
        left: {
          value: 'foo',
          type: 'JsdocTypeName',
          meta: {
            reservedWord: false
          }
        },
        right: {
          type: 'JsdocTypeStringValue',
          value: 'bar.baz',
          meta: {
            quote: 'double'
          }
        },
        type: 'JsdocTypeNamePath',
        pathType: 'property'
      },
      right: {
        type: 'JsdocTypeName',
        value: 'qux',
        meta: {
          reservedWord: false
        }
      },
      type: 'JsdocTypeNamePath',
      pathType: 'property'
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
    description: 'name expression partially enclosed in single quotes',
    input: "foo.'bar.baz'.qux",
    expected: {
      left: {
        left: {
          value: 'foo',
          type: 'JsdocTypeName',
          meta: {
            reservedWord: false
          }
        },
        right: {
          type: 'JsdocTypeStringValue',
          value: 'bar.baz',
          meta: {
            quote: 'single'
          }
        },
        type: 'JsdocTypeNamePath',
        pathType: 'property'
      },
      right: {
        type: 'JsdocTypeName',
        value: 'qux',
        meta: {
          reservedWord: false
        }
      },
      type: 'JsdocTypeNamePath',
      pathType: 'property'
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
    description: 'identifier with a repeatable param that is not enclosed in brackets',
    input: 'MyClass(...foo)',
    expected: {
      value: 'MyClass',
      type: 'JsdocTypeSymbol',
      element: {
        type: 'JsdocTypeVariadic',
        element: {
          value: 'foo',
          type: 'JsdocTypeName',
          meta: {
            reservedWord: false
          }
        },
        meta: {
          squareBrackets: false,
          position: 'prefix'
        }
      }
    },
    modes: ['jsdoc'],
    catharsis: {
      closure: 'differ',
      jsdoc: 'jsdoc'
    }, // NOTE: This seems to be a Catharsis error
    jtp: {
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'fail',
      permissive: 'fail'
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'type application with no period',
    input: 'Array<string>',
    expected: {
      type: 'JsdocTypeGeneric',
      elements: [
        {
          type: 'JsdocTypeName',
          value: 'string',
          meta: {
            reservedWord: false
          }
        }
      ],
      left: {
        type: 'JsdocTypeName',
        value: 'Array',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        brackets: 'angle',
        dot: false
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
    description: 'Jsdoc Toolkit 2-style array notation for an array of strings',
    input: 'string[]',
    expected: {
      type: 'JsdocTypeGeneric',
      elements: [
        {
          type: 'JsdocTypeName',
          value: 'string',
          meta: {
            reservedWord: false
          }
        }
      ],
      left: {
        type: 'JsdocTypeName',
        value: 'Array',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        brackets: 'square',
        dot: false
      }
    },
    modes: ['typescript', 'jsdoc'],
    catharsis: {
      closure: 'fail',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'fail',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'jsdoc'
    }
  },
  {
    description: 'Jsdoc Toolkit 2-style array notation for an array of functions',
    input: 'function[]',
    expected: {
      type: 'JsdocTypeGeneric',
      elements: [
        {
          type: 'JsdocTypeFunction',
          parameters: [],
          arrow: false,
          parenthesis: false
        }
      ],
      left: {
        type: 'JsdocTypeName',
        value: 'Array',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        brackets: 'square',
        dot: false
      }
    },
    modes: ['jsdoc'],
    catharsis: {
      closure: 'fail',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'fail',
      jsdoc: 'jsdoc',
      typescript: 'differ',
      permissive: 'jsdoc'
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'Jsdoc Toolkit 2-style nested array (two levels)',
    input: 'number[][]',
    expected: {
      type: 'JsdocTypeGeneric',
      elements: [
        {
          type: 'JsdocTypeGeneric',
          elements: [
            {
              type: 'JsdocTypeName',
              value: 'number',
              meta: {
                reservedWord: false
              }
            }
          ],
          left: {
            type: 'JsdocTypeName',
            value: 'Array',
            meta: {
              reservedWord: false
            }
          },
          meta: {
            brackets: 'square',
            dot: false
          }
        }
      ],
      left: {
        type: 'JsdocTypeName',
        value: 'Array',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        brackets: 'square',
        dot: false
      }
    },
    modes: ['typescript', 'jsdoc'],
    catharsis: {
      closure: 'fail',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'fail',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'jsdoc'
    }
  },
  {
    description: 'Jsdoc Toolkit 2-style nested array (three levels)',
    input: 'number[][][]',
    expected: {
      type: 'JsdocTypeGeneric',
      elements: [
        {
          type: 'JsdocTypeGeneric',
          elements: [
            {
              type: 'JsdocTypeGeneric',
              elements: [
                {
                  type: 'JsdocTypeName',
                  value: 'number',
                  meta: {
                    reservedWord: false
                  }
                }
              ],
              left: {
                type: 'JsdocTypeName',
                value: 'Array',
                meta: {
                  reservedWord: false
                }
              },
              meta: {
                brackets: 'square',
                dot: false
              }
            }
          ],
          left: {
            type: 'JsdocTypeName',
            value: 'Array',
            meta: {
              reservedWord: false
            }
          },
          meta: {
            brackets: 'square',
            dot: false
          }
        }
      ],
      left: {
        type: 'JsdocTypeName',
        value: 'Array',
        meta: {
          reservedWord: false
        }
      },
      meta: {
        brackets: 'square',
        dot: false
      }
    },
    modes: ['typescript', 'jsdoc'],
    catharsis: {
      closure: 'fail',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'fail',
      jsdoc: 'jsdoc',
      typescript: 'typescript',
      permissive: 'jsdoc'
    }
  },
  {
    description: 'record type with a property that uses a type application as a key',
    input: '{Array.<string>: number}',
    expected: {
      type: 'JsdocTypeObject',
      elements: [
        {
          type: 'JsdocTypeKeyValue',
          left: {
            type: 'JsdocTypeGeneric',
            elements: [
              {
                type: 'JsdocTypeName',
                value: 'string',
                meta: {
                  reservedWord: false
                }
              }
            ],
            left: {
              type: 'JsdocTypeName',
              value: 'Array',
              meta: {
                reservedWord: false
              }
            },
            meta: {
              brackets: 'angle',
              dot: true
            }
          },
          right: {
            type: 'JsdocTypeName',
            value: 'number',
            meta: {
              reservedWord: false
            }
          }
        }
      ]
    },
    modes: ['jsdoc'],
    catharsis: {
      closure: 'differ',
      jsdoc: 'jsdoc'
    }, // NOTE: This seems to be a Catharsis error
    jtp: {
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'fail',
      permissive: 'fail'
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'record type with a property that uses a type union as a key',
    input: '{(number|boolean|string): number}',
    stringified: '{(number | boolean | string): number}',
    expected: {
      type: 'JsdocTypeObject',
      elements: [
        {
          type: 'JsdocTypeKeyValue',
          left: {
            type: 'JsdocTypeParenthesis',
            element: {
              type: 'JsdocTypeUnion',
              elements: [
                {
                  type: 'JsdocTypeName',
                  value: 'number',
                  meta: {
                    reservedWord: false
                  }
                },
                {
                  type: 'JsdocTypeName',
                  value: 'boolean',
                  meta: {
                    reservedWord: false
                  }
                },
                {
                  type: 'JsdocTypeName',
                  value: 'string',
                  meta: {
                    reservedWord: false
                  }
                }
              ]
            }
          },
          right: {
            type: 'JsdocTypeName',
            value: 'number',
            meta: {
              reservedWord: false
            }
          }
        }
      ]
    },
    modes: ['jsdoc'],
    catharsis: {
      closure: 'differ',
      jsdoc: 'jsdoc'
    }, // NOTE: This seems to be a Catharsis error
    jtp: {
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'fail',
      permissive: 'fail'
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'record type with a property name that starts with a literal',
    input: '{undefinedHTML: (string|undefined)}',
    stringified: '{undefinedHTML: (string | undefined)}',
    expected: {
      type: 'JsdocTypeObject',
      elements: [
        {
          type: 'JsdocTypeKeyValue',
          optional: false,
          value: 'undefinedHTML',
          meta: {
            quote: undefined
          },
          right: {
            type: 'JsdocTypeParenthesis',
            element: {
              type: 'JsdocTypeUnion',
              elements: [
                {
                  type: 'JsdocTypeName',
                  value: 'string',
                  meta: {
                    reservedWord: false
                  }
                },
                {
                  type: 'JsdocTypeUndefined'
                }
              ]
            }
          }
        }
      ]
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
    description: 'record type with a property that contains a function with no preceding space',
    input: '{foo:function()}',
    stringified: '{foo: function()}',
    expected: {
      type: 'JsdocTypeObject',
      elements: [
        {
          type: 'JsdocTypeKeyValue',
          optional: false,
          value: 'foo',
          meta: {
            quote: undefined
          },
          right: {
            type: 'JsdocTypeFunction',
            parameters: [],
            arrow: false,
            parenthesis: true
          }
        }
      ]
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
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'record type with a property that contains a function with no preceding space that returns void',
    input: '{foo:function(): void}',
    stringified: '{foo: function(): void}',
    expected: {
      type: 'JsdocTypeObject',
      elements: [
        {
          type: 'JsdocTypeKeyValue',
          optional: false,
          value: 'foo',
          meta: {
            quote: undefined
          },
          right: {
            type: 'JsdocTypeFunction',
            parameters: [],
            arrow: false,
            parenthesis: true,
            returnType: {
              type: 'JsdocTypeName',
              value: 'void',
              meta: {
                reservedWord: true
              }
            }
          }
        }
      ]
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
    description: 'function type with no trailing pathentheses',
    input: 'function',
    expected: {
      type: 'JsdocTypeFunction',
      parameters: [],
      arrow: false,
      parenthesis: false
    },
    modes: ['jsdoc'],
    catharsis: {
      closure: 'fail',
      jsdoc: 'jsdoc'
    },
    jtp: {
      closure: 'differ',
      jsdoc: 'differ',
      typescript: 'differ',
      permissive: 'differ'
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'standard function type (should still parse if JSDoc expressions are allowed)',
    input: 'function(this:my.namespace.Class, my.Class)=',
    stringified: 'function(this: my.namespace.Class, my.Class)=',
    expected: {
      type: 'JsdocTypeOptional',
      element: {
        type: 'JsdocTypeFunction',
        parameters: [
          {
            type: 'JsdocTypeKeyValue',
            optional: false,
            value: 'this',

            meta: {

              quote: undefined

            },
            right: {
              left: {
                left: {
                  value: 'my',
                  type: 'JsdocTypeName',
                  meta: {
                    reservedWord: false
                  }
                },
                right: {
                  type: 'JsdocTypeName',
                  value: 'namespace',
                  meta: {
                    reservedWord: false
                  }
                },
                type: 'JsdocTypeNamePath',
                pathType: 'property'
              },
              right: {
                type: 'JsdocTypeName',
                value: 'Class',
                meta: {
                  reservedWord: false
                }
              },
              type: 'JsdocTypeNamePath',
              pathType: 'property'
            }
          },
          {
            left: {
              value: 'my',
              type: 'JsdocTypeName',
              meta: {
                reservedWord: false
              }
            },
            right: {
              type: 'JsdocTypeName',
              value: 'Class',
              meta: {
                reservedWord: false
              }
            },
            type: 'JsdocTypeNamePath',
            pathType: 'property'
          }
        ],
        arrow: false,
        parenthesis: true
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
    } // NOTE: This seems to be a JTP error
  },
  {
    description: 'type union with no parentheses, a repeatable param, and a JSDoc-style array',
    input: '...string|string[]',
    stringified: '...string | string[]',
    expected: {
      type: 'JsdocTypeUnion',
      elements: [
        {
          type: 'JsdocTypeVariadic',
          element: {
            type: 'JsdocTypeName',
            value: 'string',
            meta: {
              reservedWord: false
            }
          },
          meta: {
            squareBrackets: false,
            position: 'prefix'
          }
        },
        {
          type: 'JsdocTypeGeneric',
          elements: [
            {
              value: 'string',
              type: 'JsdocTypeName',
              meta: {
                reservedWord: false
              }
            }
          ],
          left: {
            type: 'JsdocTypeName',
            value: 'Array',
            meta: {
              reservedWord: false
            }
          },
          meta: {
            brackets: 'square',
            dot: false
          }
        }
      ]
    },
    modes: ['jsdoc', 'typescript'],
    catharsis: {
      closure: 'differ',
      jsdoc: 'jsdoc'
    }, // NOTE: This seems to be a Catharsis error
    jtp: {
      closure: 'fail',
      jsdoc: 'differ',
      typescript: 'differ', // this seems to be a JTP error
      permissive: 'differ'
    }
  }
]
