import { Fixture } from '../Fixture'

export const nullableFixtures: Fixture[] = [
  {
    description: 'nullable number',
    input: '?number',
    expected: {
      type: 'NAME',
      name: 'number',
      nullable: true
    }
  },
  {
    description: 'postfix nullable number',
    input: 'number?',
    expected: {
      type: 'NAME',
      name: 'number',
      nullable: true
    }
  },
  {
    description: 'non-nullable object',
    input: '!Object',
    expected: {
      type: 'NAME',
      name: 'Object',
      nullable: false
    }
  },
  {
    description: 'postfix non-nullable object',
    input: 'Object!',
    expected: {
      type: 'NAME',
      name: 'Object',
      nullable: false
    }
  },
  {
    description: 'repeatable nullable number',
    input: '...?number',
    expected: {
      type: 'NAME',
      name: 'number',
      nullable: true,
      repeatable: true
    }
  },
  {
    description: 'postfix repeatable nullable number',
    input: '...number?',
    expected: {
      type: 'NAME',
      name: 'number',
      nullable: true,
      repeatable: true
    }
  },
  {
    description: 'repeatable non-nullable object',
    input: '...!Object',
    expected: {
      type: 'NAME',
      name: 'Object',
      nullable: false,
      repeatable: true
    }
  },
  {
    description: 'postfix repeatable non-nullable object',
    input: '...Object!',
    expected: {
      type: 'NAME',
      name: 'Object',
      nullable: false,
      repeatable: true
    }
  },
  {
    description: 'postfix optional nullable number',
    input: 'number=?',
    expected: {
      type: 'NAME',
      name: 'number',
      nullable: true,
      optional: true
    }
  },
  {
    description: 'postfix nullable optional number',
    input: 'number?=',
    expected: {
      type: 'NAME',
      name: 'number',
      nullable: true,
      optional: true
    }
  },
  {
    description: 'postfix repeatable nullable optional number',
    input: '...number?=',
    expected: {
      type: 'NAME',
      name: 'number',
      nullable: true,
      optional: true,
      repeatable: true
    }
  },
  {
    description: 'postfix optional non-nullable object',
    input: 'Object=!',
    expected: {
      type: 'NAME',
      name: 'Object',
      nullable: false,
      optional: true
    }
  },
  {
    description: 'postfix non-nullable optional object',
    input: 'Object!=',
    expected: {
      type: 'NAME',
      name: 'Object',
      nullable: false,
      optional: true
    }
  },
  {
    description: 'postfix repeatable non-nullable optional object',
    input: '...Object!=',
    expected: {
      type: 'NAME',
      name: 'Object',
      nullable: false,
      optional: true,
      repeatable: true
    }
  }
]
