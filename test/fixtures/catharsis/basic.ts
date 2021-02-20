import { Fixture } from '../Fixture'

export const basicFixtures: Fixture[] = [
  {
    description: 'boolean',
    input: 'boolean',
    expected: {
      type: 'NAME',
      name: 'boolean'
    }
  },
  {
    description: 'object',
    input: 'Window',
    expected: {
      type: 'NAME',
      name: 'Window'
    }
  },
  {
    description: 'object with properties',
    input: 'goog.ui.Menu',
    expected: {
      left: {
        name: 'goog',
        type: 'NAME'
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
        type: 'NAME'
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
        type: 'NAME'
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
        type: 'NAME'
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
        type: 'NAME'
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
      type: 'NAME',
      name: 'number',
      repeatable: true
    }
  },
  {
    description: 'optional number parameter',
    input: 'number=',
    expected: {
      type: 'NAME',
      name: 'number',
      optional: true
    }
  },
  {
    description: 'optional Object parameter',
    input: 'Object=',
    expected: {
      type: 'NAME',
      name: 'Object',
      optional: true
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
      type: 'NULL',
      repeatable: true
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
      type: 'UNDEFINED',
      repeatable: true
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
      type: 'ALL',
      repeatable: true
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
      type: 'UNKNOWN',
      repeatable: true
    }
  },
  {
    description: 'name that starts with a reserved word',
    input: 'forsooth',
    expected: {
      type: 'NAME',
      name: 'forsooth'
    }
  },
  {
    description: 'name that includes a hyphen and a numeral',
    input: 'My-1st-Class',
    expected: {
      type: 'NAME',
      name: 'My-1st-Class'
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
