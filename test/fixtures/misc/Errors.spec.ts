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

  describe('should err with bad Parameter list', () => {
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
})
