import { Fixture } from '../Fixture'

export const eventExternalFixtures: Fixture[] = [
  {
    description: 'event',
    input: 'event:some_event',
    expected: {
      type: 'JsdocTypeSpecialNamePath',
      specialType: 'event',
      value: 'some_event',
      meta: {
        quote: undefined
      }
    },
    modes: ['jsdoc'],
    catharsis: {
      jsdoc: 'jsdoc',
      closure: 'differ'
    },
    jtp: {
      jsdoc: 'fail',
      closure: 'fail',
      typescript: 'fail',
      permissive: 'fail'
    } // this seems to be a JTP error
  },
  {
    description: 'event with quotes',
    input: 'event:\'some-event\'',
    expected: {
      type: 'JsdocTypeSpecialNamePath',
      specialType: 'event',
      value: 'some-event',
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
      jsdoc: 'fail',
      closure: 'fail',
      typescript: 'fail',
      permissive: 'fail'
    } // this seems to be a JTP error
  },
  {
    description: 'external',
    input: 'external:some-external',
    expected: {
      type: 'JsdocTypeSpecialNamePath',
      specialType: 'external',
      value: 'some-external',
      meta: {
        quote: undefined
      }
    },
    modes: ['jsdoc'],
    catharsis: {
      jsdoc: 'jsdoc',
      closure: 'differ'
    },
    jtp: {
      jsdoc: 'fail',
      closure: 'fail',
      typescript: 'fail',
      permissive: 'fail'
    } // this seems to be a JTP error
  },
  {
    description: 'event in module',
    input: 'module:some-module.event:some-event',
    expected: {
      type: 'JsdocTypeNamePath',
      left: {
        type: 'JsdocTypeSpecialNamePath',
        specialType: 'module',
        value: 'some-module',
        meta: {
          quote: undefined
        }
      },
      right: {
        type: 'JsdocTypeSpecialNamePath',
        specialType: 'event',
        value: 'some-event',
        meta: {
          quote: undefined
        }
      },
      pathType: 'property'
    },
    modes: ['jsdoc', 'closure', 'typescript'],
    catharsis: {
      jsdoc: 'jsdoc',
      closure: 'closure'
    },
    jtp: {
      jsdoc: 'fail',
      closure: 'fail',
      typescript: 'fail',
      permissive: 'fail'
    } // this seems to be a JTP error
  },
  {
    description: 'event in static property of module',
    input: 'module:some-module#some-where.event:some-event',
    expected: {
      type: 'JsdocTypeNamePath',
      left: {
        type: 'JsdocTypeNamePath',
        left: {
          type: 'JsdocTypeSpecialNamePath',
          specialType: 'module',
          value: 'some-module',
          meta: {
            quote: undefined
          }
        },
        right: {
          type: 'JsdocTypeProperty',
          value: 'some-where'
        },
        pathType: 'instance'
      },
      right: {
        type: 'JsdocTypeSpecialNamePath',
        specialType: 'event',
        value: 'some-event',
        meta: {
          quote: undefined
        }
      },
      pathType: 'property'
    },
    modes: ['jsdoc', 'closure', 'typescript'],
    catharsis: {
      jsdoc: 'jsdoc',
      closure: 'closure'
    },
    jtp: {
      jsdoc: 'fail',
      closure: 'fail',
      typescript: 'fail',
      permissive: 'fail'
    } // this seems to be a JTP error
  }
]

//
//
//
//
