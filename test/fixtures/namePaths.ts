import { Fixture } from './Fixture'

export const eventExternalFixtures: Fixture[] = [
  {
    description: 'event',
    input: 'event:some_event',
    expected: {
      type: 'SPECIAL_NAME_PATH',
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
      type: 'SPECIAL_NAME_PATH',
      specialType: 'event',
      value: 'some-event',
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
      type: 'SPECIAL_NAME_PATH',
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
      type: 'NAME_PATH',
      left: {
        type: 'SPECIAL_NAME_PATH',
        specialType: 'module',
        value: 'some-module',
        meta: {
          quote: undefined
        }
      },
      right: {
        type: 'SPECIAL_NAME_PATH',
        specialType: 'event',
        value: 'some-event',
        meta: {
          quote: undefined
        }
      },
      pathType: '.'
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
    description: 'event in static property of module',
    input: 'module:some-module#some-where.event:some-event',
    expected: {
      type: 'NAME_PATH',
      left: {
        type: 'NAME_PATH',
        left: {
          type: 'SPECIAL_NAME_PATH',
          specialType: 'module',
          value: 'some-module',
          meta: {
            quote: undefined
          }
        },
        right: {
          type: 'NAME',
          value: 'some-where',
          meta: {
            reservedWord: false
          }
        },
        pathType: '#'
      },
      right: {
        type: 'SPECIAL_NAME_PATH',
        specialType: 'event',
        value: 'some-event',
        meta: {
          quote: undefined
        }
      },
      pathType: '.'
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
  }
]

//
//
//
//
