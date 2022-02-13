import { testFixture } from '../Fixture'

describe('Error tests', () => {
  describe('should err with bad Symbols', () => {
    testFixture({
      input: 'Symbol(abc',
      errors: {
        jsdoc: 'Symbol does not end after value',
        closure: 'Symbol does not end after value'
      }
    })

    testFixture({
      input: '123(abc',
      errors: {
        closure: "Symbol expects a name on the left side. (Reacting on '(')",
        jsdoc: "Symbol expects a name on the left side. (Reacting on '(')"
      }
    })
  })

  describe('should err with bad Parameter lists', () => {
    testFixture({
      input: '...b, ...c',
      errors: {
        typescript: 'Only the last parameter may be a rest parameter'
      }
    })

    testFixture({
      input: '...b, ...\\',
      errors: {
        typescript: 'Unexpected Token \\'
      }
    })
  })

  describe('should err with bad imports', () => {
    testFixture({
      input: 'import',
      errors: {
        typescript: 'Missing parenthesis after import keyword'
      }
    })

    testFixture({
      input: 'import(123)',
      errors: {
        typescript: 'Only string values are allowed as paths for imports'
      }
    })

    testFixture({
      input: 'import("abc"',
      errors: {
        typescript: 'Missing closing parenthesis after import keyword'
      }
    })
  })

  describe('should err with bad predicates', () => {
    testFixture({
      input: '123 is',
      errors: {
        typescript: 'A typescript predicate always has to have a name on the left side.'
      }
    })
  })

  describe('should err with bad variadics', () => {
    testFixture({
      input: '...[abc',
      errors: {
        jsdoc: 'Unterminated variadic type. Missing \']\''
      }
    })

    testFixture({
      input: '...[]',
      errors: {
        jsdoc: 'Empty square brackets for variadic are not allowed.'
      }
    })
  })

  describe('should err with bad ObjectParslets', () => {
    testFixture({
      input: '{Array<string> string}',
      errors: {
        jsdoc: "Unexpected type: 'JsdocTypeGeneric'."
      }
    })
  })

  describe('should err with bad FunctionParslets', () => {
    testFixture({
      input: 'function(a: string, b: number)',
      errors: {
        jsdoc: 'only allowed named parameters are this, new but got JsdocTypeKeyValue'
      }
    })
  })
})
